const jwt = require('jsonwebtoken');
const User = require('../models/User');
const cookieOptions = () => ({ httpOnly:true, secure:process.env.COOKIE_SECURE === 'true', sameSite:'lax', maxAge:7*24*60*60*1000, path:'/' });
const issueToken = (res,userId) => res.cookie('fittrack_token',jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'}),cookieOptions());
const safeUser = (u) => ({id:u._id,name:u.name,email:u.email,goal:u.goal});
exports.register = async (req,res) => {
  const {name,email,password,goal} = req.body;
  if (!name?.trim() || !email?.trim() || !password) return res.status(400).json({message:'Name, email and password are required.'});
  if (password.length < 8) return res.status(400).json({message:'Password must be at least 8 characters.'});
  const normalized = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) return res.status(400).json({message:'Enter a valid email address.'});
  if (await User.exists({email:normalized})) return res.status(409).json({message:'An account with this email already exists.'});
  const user = await User.create({name:name.trim(),email:normalized,password,goal});
  issueToken(res,user._id); res.status(201).json({user:safeUser(user)});
};
exports.login = async (req,res) => {
  const {email,password} = req.body; if (!email || !password) return res.status(400).json({message:'Email and password are required.'});
  const user = await User.findOne({email:email.trim().toLowerCase()}).select('+password');
  if (!user || !(await user.comparePassword(password))) return res.status(401).json({message:'Invalid email or password.'});
  issueToken(res,user._id); res.json({user:safeUser(user)});
};
exports.logout = (req,res) => res.clearCookie('fittrack_token',{httpOnly:true,secure:process.env.COOKIE_SECURE==='true',sameSite:'lax',path:'/'}).json({message:'Signed out.'});
exports.me = (req,res) => res.json({user:safeUser(req.user)});

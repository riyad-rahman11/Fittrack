const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('./asyncHandler');

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.fittrack_token;
  if (!token) return res.status(401).json({ message: 'Please sign in to continue.' });
  let payload;
  try { payload = jwt.verify(token, process.env.JWT_SECRET); }
  catch { return res.status(401).json({ message: 'Session expired. Please sign in again.' }); }
  const user = await User.findById(payload.userId);
  if (!user) return res.status(401).json({ message: 'Account not found.' });
  req.user = user;
  next();
});
module.exports = protect;

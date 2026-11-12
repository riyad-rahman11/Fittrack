const router = require('express').Router();
const protect = require('../middleware/auth');
const asyncHandler = require('../middleware/asyncHandler');
const Workout = require('../models/Workout'); const Task = require('../models/Task'); const Meal = require('../models/Meal'); const Progress = require('../models/Progress');
router.use(protect);
const owner = (req) => ({_id:req.params.id,user:req.user._id});
const pick = (body, fields) => Object.fromEntries(fields.filter((key) => body[key] !== undefined).map((key) => [key, body[key]]));
// Workouts
router.get('/workouts',asyncHandler(async(req,res)=>res.json(await Workout.find({user:req.user._id}).sort({date:-1}))));
router.post('/workouts',asyncHandler(async(req,res)=>{const item=await Workout.create({...req.body,user:req.user._id});res.status(201).json(item)}));
router.patch('/workouts/:id',asyncHandler(async(req,res)=>{const item=await Workout.findOneAndUpdate(owner(req),pick(req.body,['title','type','duration','calories','date','notes','completed']),{new:true,runValidators:true});if(!item)return res.status(404).json({message:'Workout not found'});res.json(item)}));
router.delete('/workouts/:id',asyncHandler(async(req,res)=>{const item=await Workout.findOneAndDelete(owner(req));if(!item)return res.status(404).json({message:'Workout not found'});res.json({message:'Workout deleted'})}));
// Tasks
router.get('/tasks',asyncHandler(async(req,res)=>res.json(await Task.find({user:req.user._id}).sort({dueDate:1}))));
router.post('/tasks',asyncHandler(async(req,res)=>{const item=await Task.create({...req.body,user:req.user._id});res.status(201).json(item)}));
router.patch('/tasks/:id',asyncHandler(async(req,res)=>{const item=await Task.findOneAndUpdate(owner(req),pick(req.body,['title','dueDate','priority','completed']),{new:true,runValidators:true});if(!item)return res.status(404).json({message:'Task not found'});res.json(item)}));
router.delete('/tasks/:id',asyncHandler(async(req,res)=>{const item=await Task.findOneAndDelete(owner(req));if(!item)return res.status(404).json({message:'Task not found'});res.json({message:'Task deleted'})}));
// Meals
router.get('/meals',asyncHandler(async(req,res)=>res.json(await Meal.find({user:req.user._id}).sort({date:-1}))));
router.post('/meals',asyncHandler(async(req,res)=>{const item=await Meal.create({...req.body,user:req.user._id});res.status(201).json(item)}));
router.delete('/meals/:id',asyncHandler(async(req,res)=>{const item=await Meal.findOneAndDelete(owner(req));if(!item)return res.status(404).json({message:'Meal not found'});res.json({message:'Meal deleted'})}));
// Progress
router.get('/progress',asyncHandler(async(req,res)=>res.json(await Progress.find({user:req.user._id}).sort({date:1}))));
router.post('/progress',asyncHandler(async(req,res)=>{const item=await Progress.create({...req.body,user:req.user._id});res.status(201).json(item)}));
// Dashboard summary
router.get('/dashboard/summary',asyncHandler(async(req,res)=>{const user=req.user._id;const [workouts,tasks,meals,progress]=await Promise.all([Workout.find({user}),Task.find({user}),Meal.find({user,date:{$gte:new Date(new Date().setHours(0,0,0,0))}}),Progress.find({user}).sort({date:-1}).limit(1)]);res.json({workouts:workouts.length,completedWorkouts:workouts.filter(x=>x.completed).length,tasks:tasks.length,completedTasks:tasks.filter(x=>x.completed).length,calories:meals.reduce((s,x)=>s+x.calories,0),latestWeight:progress[0]?.weight??null,recentWorkouts:workouts.slice(0,5)});}));
module.exports=router;

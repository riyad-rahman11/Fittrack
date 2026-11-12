const mongoose = require('mongoose');
const schema = new mongoose.Schema({ user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}, weight:{type:Number,min:1,required:true}, bodyFat:{type:Number,min:0,max:100}, note:{type:String,default:'',maxlength:300}, date:{type:Date,default:Date.now} },{timestamps:true});
module.exports = mongoose.model('Progress',schema);

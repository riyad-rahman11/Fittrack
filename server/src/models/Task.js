const mongoose = require('mongoose');
const schema = new mongoose.Schema({ user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}, title:{type:String,required:true,trim:true,maxlength:120}, dueDate:{type:Date,default:Date.now}, priority:{type:String,enum:['Low','Medium','High'],default:'Medium'}, completed:{type:Boolean,default:false} },{timestamps:true});
module.exports = mongoose.model('Task',schema);

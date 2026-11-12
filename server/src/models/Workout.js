const mongoose = require('mongoose');
const schema = new mongoose.Schema({ user: {type: mongoose.Schema.Types.ObjectId, ref:'User', required:true}, title:{type:String,required:true,trim:true,maxlength:100}, type:{type:String,default:'Strength'}, duration:{type:Number,min:1,default:30}, calories:{type:Number,min:0,default:0}, date:{type:Date,default:Date.now}, notes:{type:String,default:'',maxlength:500}, completed:{type:Boolean,default:false} },{timestamps:true});
module.exports = mongoose.model('Workout',schema);

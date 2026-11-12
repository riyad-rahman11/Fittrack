const mongoose = require('mongoose');
const schema = new mongoose.Schema({ user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}, name:{type:String,required:true,trim:true}, mealType:{type:String,enum:['Breakfast','Lunch','Dinner','Snack'],default:'Snack'}, calories:{type:Number,min:0,default:0}, protein:{type:Number,min:0,default:0}, carbs:{type:Number,min:0,default:0}, fat:{type:Number,min:0,default:0}, date:{type:Date,default:Date.now} },{timestamps:true});
module.exports = mongoose.model('Meal',schema);

const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const todoSchema = new Schema({
    title:String,
    completed:{type:Boolean, default:false},
    category:{
    type:String,
    enum:['fitness','personal','finance','work']
    },
    createdAt:{ type:Date, default:Date.now } 
})

const User = new Schema({
    email:{type:String,unique:true},
    password:{type:String, required:true, unique:true},
    name:String,
    todos:[todoSchema]
})

const UserModel=mongoose.model("people",User)
module.exports=UserModel;
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const todoSchema = new Schema({
    title:string,
    completed:{type:Boolean, Default:false},
    category:{
    type:string,
    enum:['fitness','personal','finance','work']
    },
    createdAt:{type:string,Default:Date.now}
})

const user=new Schema({
    email:string,
    password:string,
    todos:[todoSchema]
})

const userModel=mongoose.model.user("people",user)
module.exports({
    userModel:userModel
})
const express=require('express');
const app = express();
const JWT_key='goggle-summer-of-code';
const JWT=require('jsonwebtoken');
const UserModel = require('./db');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
mongoose.connect("mongodb+srv://sai:4P5SvNyU1p14DNVc@cluster0.3vp3tpw.mongodb.net/")

app.use(express.json());

app.post('/signup',async function (req, res){
    const email=req.body.email;
    const password=req.body.password;
    const name =req.body.name;

      try{ 
    const hashedPassword =await bcrypt.hash(password,5);
    if(hashedPassword){
    await UserModel.create({
    email:email,
    password:hashedPassword,
    name:name
    });
    res.json({
        message:"user successful signed-up"})
} }
  catch(err){
   res.json({
    message:"err got catch at the signup end point",
    hel:err.message
   })
}

})



app.post('/signin',async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    const name =req.body.name;
try{
    const user=await UserModel.findOne({
        email:email
    })
    const comPassword=await bcrypt.compare(password,user.password);
    if(user && comPassword){
    const token= JWT.sign({ id:user._id.toString()
    },JWT_key);
    res.json({
        token:token
    })
    }
}

catch(err){
    res.json({
        message:err.message
    })
}


})
app.post('/todo', auth , async function(req , res){
const title=req.body.title;
const category=req.body.category;
const userId = req.userId;

try{ 
    const user = await UserModel.findOne({
        _id:userId })
        if(user){
        user.todos.push({
            title:title,
            category:category,
            completed:true
        })
        await user.save(); 
        res.json({
        message:'your todo is added'
        })
           }
        }
    catch(err){
        res.json({
            message:err.message
        })
    }
    })



app.get('/todos',auth,async function (req,res){
    const category=req.body.category;
    const userId=req.userId;
    try{

    const user =await UserModel.findOne({
        _id:userId
    })
   const cat = await user.todos.filter(hello => hello.category === category);
    res.json({
        todo: cat })
}
    catch(err){
    res.json({
    message:err.message
    })
}
})



async function auth(req,res,next){
    const token=req.headers.token;
    try{
    const decode = await JWT.verify(token,JWT_key);
    if(decode){
    req.userId=decode.id;
    next()
 }}
    catch(err){
    res.json({
    message:err.message})
    }
}

app.listen('3007');



const express=require('express');
const app = express();
const JWT_key='goggle-summer-of-code';
const JWT=require('jsonwebtoken');
const UserModel = require('./db');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const path = require('path');
const cors=require('cors');


app.use(cors());
mongoose.connect("mongodb+srv://sai:4P5SvNyU1p14DNVc@cluster0.3vp3tpw.mongodb.net/")

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','loginpage.html'));
});

// Static assets like css/js/images/html
app.use(express.static(path.join(__dirname, 'public')));


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
    const token= await JWT.sign({ id:user._id.toString()
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



app.post('/todos',auth,async function (req,res){
    const category=req.body.category;
    const userId=req.userId;
    try{

    const user =await UserModel.findOne({
        _id:userId
    })
   const todo = user.todos.filter(hello => hello.category === category);
    res.json({
        todo:todo})
}
    catch(err){
    res.json({
    message:err.message
    })
}
})


app.post('/deleteTodo', auth , async function(req, res){
    const userId = req.userId;
    const todoId=req.body.todoNum;
    try{
    const user=await UserModel.findOne({
        _id:userId
    })
    if(user){
        user.todos= await user.todos.filter(todo => todo._id.toString()!==todoId.toString());
        if(user.todos){
            await user.save();
            res.json({
                message:"Todo successfully-Deleted" })
           }
        }
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
    const decode = JWT.verify(token,JWT_key);
    if(decode){
    req.userId=decode.id;
    next()
 }}
    catch(err){
    res.json({
    message:err.message})
    }
}
app.listen(3006, () => 
console.log('Server running on http://localhost:3006'));

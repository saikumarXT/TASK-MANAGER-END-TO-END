const express=require('express');
const app = express();
const JWT_key='goggle-summer-of-code';
const JWT=require('jsonwebtoken');


app.use(express.json());

app.post('/signup',(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const name =req.body.name;
    
})
const express=require("express")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const {UserModel}=require("../Model/users.model");



const userRoute=express.Router()

userRoute.use(express.json())

userRoute.post("/register",async(req,res)=>{
    const {name,email,gender,password}=req.body
    
    try{
        bcrypt.hash(password,5,async function(err,hash){
            if(err){
                console.log(err)
            }else{
                const user=new UserModel({name,email,gender,password:hash})
                await user.save()
                console.log(user)
                res.send("Registered")
            }
        })
    }catch(err){
        res.send("Error in Registrating")
        console.log(err)
    }
})

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password, function(err,result){
                if(result){
                    const token=jwt.sign({userID:user[0]._id},"masai")
                    res.send({"msg":"Login Success","token":token})

                }else{
                    res.send("Wrong Crendentials")
                }
            })
        }else{
            res.send("Wrong Crendentials")
        }
    }catch(err){
        res.send("something went wrong")
        console.log(err)
    }
})

module.exports={
    userRoute
}

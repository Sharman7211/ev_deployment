const express= require("express")
const userRouter= express.Router()

const {UserModel}= require("../models/user.model")

const jwt= require("jsonwebtoken")
const bcrypt= require('bcrypt')

// registration

userRouter.post("/register",async(req,res)=>{
    const{name,email,gender,password,age,city,is_married}=req.body
    try{
        bcrypt.hash(password,5, async(err, hash)=> {
        const user= new UserModel({name,email,gender,password:hash,age,city,is_married})
        await user.save()
        res.status(200).send({"msg":"Registration has been done"})
        });
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

// login

userRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body
    try{
       const user= await UserModel.findOne({email})
       if(user){
        bcrypt.compare(password, user.password,(err, result)=> {
            if(result){
                res.status(200).send({"msg":"Login has been done","token":jwt.sign({"userID":user._id})})
            }else{
                res.status(400).send({"msg":"Wrong Credentailas"})
            }
        });
       }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports={
    userRouter
}

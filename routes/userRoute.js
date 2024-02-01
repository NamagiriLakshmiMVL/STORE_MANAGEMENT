const express = require("express")
const userModel = require("../model/userModel")
const router = express.Router()

router.post("/register",async(req,res)=>{
    try{
        const newUser =new userModel({...req.body,verified:true})
        await newUser.save()
        res.send("User Added Successfully")
    }catch(err){
        res.send(err)
    }
})

router.get("/login",async(req,res)=>{
    try{
        const user = await userModel.findOne({userId:req.body.userId,password:req.body.password,verified:true})
        user?res.send(user):res.send("Login failed")
    }
    catch(err){
        res.send(err)
    }
})



module.exports = router
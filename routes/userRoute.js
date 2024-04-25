const express = require("express");
const userModel = require("../model/userModel");
const router = express.Router();
const genPassword = require("../helper.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


router.post("/register", async (req, res) => {
  try {
    const { password, email, name, mobile } = req.body;
    const isUserExists = await userModel.findOne({ email: email });
    if (isUserExists) {
      res.send({message:"Email Already Exists",token:token});
      return;
    }
    const hashedPassword = await genPassword(password);
    let newUser = new userModel({
      password: hashedPassword,
      email,
      name,
      mobile,
    });
    await newUser.save();
    const token = jwt.sign({email:email},process.env.SECRET_KEY)
    res.send({message:"User Added Successfully",token:token});
  } catch (err) {
    res.send({message:err});
  }
});

router.post("/login", async (req, res) => {
  try {
    const { password } = req.body;
    const newLogin = await userModel.findOne({ email: req.body.email });
    if (newLogin) {
      const storedDbPassword = newLogin.password;
      const isPasswordMatch = await bcrypt.compare(password, storedDbPassword);
      if (!isPasswordMatch) {
        res.send({message:"Invalid Credentials",token:token});
        return;
      }
      const token = jwt.sign({id:newLogin._id},process.env.SECRET_KEY)

      res.send({message:"Login Success",token:token});
    } else {
      res.send({message:"Invalid Credentials"});
      return;
    }
  } catch (err) {
    res.send({message:"Invalid Credentials"});
  }
});

module.exports = router;

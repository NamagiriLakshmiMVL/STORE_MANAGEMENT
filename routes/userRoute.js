const express = require("express");
const userModel = require("../model/userModel");
const router = express.Router();
const genPassword = require("../helper.js");
const bcrypt = require("bcryptjs");
router.post("/register", async (req, res) => {
  try {
    const { password, email, name, mobile } = req.body;
    const isUserExists = await userModel.findOne({ email: email });
    if (isUserExists) {
      res.send("Email Already Exists");
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
    res.send("User Added Successfully");
  } catch (err) {
    res.send(err);
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
        res.send("Invalid Credentials");
        return;
      }

      res.send("Login Success");
    } else {
      res.send("Invalid Credentials");
      return;
    }
  } catch (err) {
    res.send("Invalid Credentials");
  }
});

module.exports = router;

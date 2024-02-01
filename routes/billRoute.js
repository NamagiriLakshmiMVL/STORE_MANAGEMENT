const express = require("express")
const billModel = require("../model/billModel")
const router = express.Router()

router.post("/charge-bill",async (req,res)=>{
    try{
        const newBill = new billModel(req.body)
        await newBill.save()
        res.send("Added Success Fully")
    }catch(err){
        res.status(400).json(err)
    }
})

router.get("/get-bill",async(req,res)=>{
    try{
        const bills = await billModel.find()
        res.send(bills)

    }
    catch(err){
        res.status(400).json(err)

    }
})

module.exports = router
const express = require("express")
const itemModel = require("../model/itemsModel")
const router = express.Router()
const auth = require("../middleware/auth")

router.post("/add-items",auth, async(req, res) => {
    try {
        const newItem = new itemModel(req.body)
        await newItem.save()
        res.send("Item Added SuccessFully")

    }
    catch (err) {
        res.status(400).json(err)
    }
})

router.post("/get-items",auth, async(req, res) => {
    try {
        const items = await itemModel.find({ name: { $regex: req.body.data } })
        res.send(items)
       
    }
    catch (err) {
        res.status(400).json(err)
    }
})

router.post("/delete-items",auth, async (req, res) => {
    try {
        const deleted = await itemModel.findOneAndDelete({ _id: req.body.itemId })
        deleted ? res.send("Deleted Successfully") : res.status(400).send({ message: "Item Not Found" })
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post("/edit-items",auth, async (req, res) => {
    try {
        const edited = await itemModel.findOneAndUpdate({ _id: req.body.itemId }, req.body)
        res.send("Edited Successfully")
    }
    catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router
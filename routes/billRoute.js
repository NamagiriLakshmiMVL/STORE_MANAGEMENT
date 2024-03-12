const express = require("express");
const billModel = require("../model/billModel");
const router = express.Router();

router.post("/charge-bill", async (req, res) => {
  try {
    const newBill = new billModel(req.body);
    await newBill.save();
    res.send("Added SuccessFully");
  } catch (err) {
    res.send(err);
  }
});

router.post("/get-bill", async (req, res) => {
  try {
    const bills = await billModel.find({
      billId: req.body.id,
    });
    res.send(bills);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

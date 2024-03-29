const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const userRoute = require("./routes/userRoute")
const itemRoute = require("./routes/itemsRoute")
const billRoute = require("./routes/billRoute")
const mongoose = require("mongoose")
const app = express()
const PORT = process.env.PORT

app.get("/", (req, res) => {
    res.send("Hello")
})
app.use(express.json())
app.use(cors())
app.use("/users", userRoute)
app.use("/items", itemRoute)
app.use("/bills", billRoute)



mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Mongoose is connected")
        app.listen(PORT, () => console.log("Server Started on the Port", PORT))
    })
    .catch((err)=>{
        console.log("Error",err)
    } 
    )


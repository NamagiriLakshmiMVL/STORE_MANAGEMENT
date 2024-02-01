const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        userId: { type: Number, required: true },
        password: { type: String, required: true },
        verified: { type: Boolean, required: true },
        role: { type: String, required: true, default: "user", enum: ["admin", "user"] }
    }
)

const userModel = mongoose.model("users",userSchema)

module.exports = userModel
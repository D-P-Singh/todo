const mongoose = require("mongoose")

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is menedetory"]
    },
    otp: {
        type: String,
        required: [true, "otp is menedetory"]
    },
    createAt: {
        type: Date,
        default: Date.now,
        expires: 150
    }
})

module.exports = mongoose.model("otp", otpSchema)
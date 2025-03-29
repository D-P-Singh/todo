const { default: mongoose } = require("mongoose");

const userInfoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "users"
    },
    ipAddress: {
        type: String,
        required: true
    },
    os: {
        type: String,
        required: true
    },
    browser: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model("userInfo", userInfoSchema)
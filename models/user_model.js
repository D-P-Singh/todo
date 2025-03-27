const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "name is manedatory"] },
    email: { type: String, required: [true, "email is manedatory"] },
    password: { type: String, required: [true, "password is manedatory"] },
    isVerified: { type: Boolean, default: false },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    todosId: [{
        type: mongoose.Schema.ObjectId,
        ref: "todos"
    }]
})
module.exports = mongoose.model("users", userSchema) 
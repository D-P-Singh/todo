const express = require("express")
const { createUsers, loginUsers, updatePassword,sendOtp, otpVerification } = require("../controllers/user_controller")
const { createTodo } = require("../controllers/todo_controller")
const auth = require("../middleware/authrization")
const router = express.Router()

router.post("/signup", createUsers);
router.post("/login", loginUsers);

router.put("/updatepasssword", auth.auth, updatePassword);
router.post("/sendotp",sendOtp)
router.post("/otpverification", otpVerification)
module.exports = router;



const users = require("../models/user_model")
const bcrypt = require("bcrypt")
const { response } = require("express")
const jwt = require("jsonwebtoken")
const emailSender = require("../Email/emailSender")
const otp_model = require("../models/otp_model")
exports.createUsers = async (req, res) => {
    const userData = await req.body
    //  console.log("user",userData);
    try {
        const exitUser = await users.findOne({ email: userData.email })
        if (exitUser) {
            res.status(400).json({
                success: false,
                message: "user already exits"
            })
            return
        }
        const hasPassword = await bcrypt.hash(userData.password, 10)
        userData.password = hasPassword

        const response = await users.create(userData)
     //   console.log(response);
        res.status(200).json({
            success: true,
            data: response,
            message: "user add success"
        })
    }
    catch (err) {
        console.log("err", err.Error)
        return res.json({       
            success: false,
            data: err
        })
    }
}
exports.loginUsers = async (req, res) => {
    const userData = req.body
    try {
        const exitsUser = await users.findOne({ email: userData.email })
        //console.log("role",userData)
        if (!exitsUser) {
            res.status(400).json({
                success: false,
                message: "user not exits"
            })
            return
        }
        // 2.password check
        const matched = bcrypt.compareSync(userData.password, exitsUser.password);
        if (!matched) {
            return res.status(500).json({
                success: false,
                message: "password not matched"
            })

        }

        const payload = {
            email: exitsUser.email,
            id: exitsUser._id,
            role: exitsUser.role
        }
        let token = jwt.sign(payload, "dev", { expiresIn: "2h" })
        // user.token = token
        exitsUser.password = undefined
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.cookie("authToken", token, options).status(200).json({
            success: true,
            token,
            user: exitsUser,
            massage: "user login successfully"
        })
    }
    catch (err) {
        console.log("err", err)
    }
}
exports.updateUser = async (req, res) => {
    const userData = req.body;
    const email = req.user.email;
    try {

    } catch (error) {

    }
}

exports.updatePassword = async (req, res) => {
    const userData = req.body;
    const email = req.user.email;
    /*  console.log("userdata", userData); */
    try {
        const exitsUser = await users.findOne({ email: email })
        /*   console.log("exituser", exitsUser); */
        if (!exitsUser) {
            return res.status(400).json({
                message: "email  is wrong"
            })
        }
        try {
            const matched = bcrypt.compareSync(userData.password, exitsUser.password)
            /*  console.log("match pass", matched); */
            if (!matched) {
                return res.status(400).json({
                    sucees: false,
                    message: "Password does not matched"
                });
            }
            const hashPassword = await bcrypt.hash(userData.newPassword, 10)
            /*    console.log("hashp", hashPassword); */
            userData.newPassword = hashPassword
            const updateResponse = await users.findOneAndUpdate({ email: email }, { password: userData.newPassword }, { new: true })
            // console.log("updaeRes", updateResponse);      
            return res.json({
                data: updateResponse,
                success: true,
                message: "password  update"
            })

        } catch (error) {
            console.log("err", error);
            return res.json(500).json({
                message: "",
                response: error
            })
        }
    } catch (error) {
        console.log("error", error);
        return res.json(500).json({
            message: "",
            response: error
        })
    }
}
exports.sendOtp = async (req, res) => {
    const { email } = req.body
    const exitsUser = await users.findOne({ email: email })
    console.log("role", exitsUser)
    if (!exitsUser) {
        return res.json({
            success: false,
            message: "user not exits"
        })

    }
    // console.log("otp", email);
    const otp = Math.floor(1000 + Math.random() * 9000);
    // console.log("otp", otp);
    try {
        const from = "devpratap123015@gmail.com";
        const to = email;
        const subject = "Reset Password";
        const html = `<h1> Your reset otp is ${otp} </h1> <br> Please do not share`
        const eamilResponse = await emailSender(from, to, subject, html)
        if (eamilResponse) {
            //  console.log("emailres", eamilResponse);
            const otpse = await otp_model.create({ email: email, otp: otp })
            console.log("otp", otpse);
            return res.status(200).json({
                success: true,
                message: `otp send to email ${email}`
            })
        }
        return res.json({
            success: false,
            message: "Email sent failed"
        })

    } catch (error) {
        console.log("err", error);
    }

}
exports.otpVerification = async (req, res) => {
    
    //console.log("veri", req.body);
const { email, otp, password, cPassword } = await req.body
    if (password != cPassword) {
        return res.json({
            success: false,
            message: "password not matched"
        })
    }
    const exitsUser = await users.findOne({ email: email })
    if (!exitsUser) {
        return res.json({
            success: false,
            message: "user not exits"
        })

    }
    const otpVerify = await otp_model.findOne({ email: email, otp: otp })
    console.log(otpVerify);
    if (!otpVerify) {
        return res.json({
            success: false,
            message: "envild otp"
        })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const updateResponse = await users.findOneAndUpdate({ email: email }, { password: hashPassword }, { new: true })
    // console.log("updaeRes", updateResponse);
    const deleteOtp = otp_model.deleteOne({ email: email, otp: otp })
    console.log("deleteOtp", deleteOtp);

    return res.json({
        //  data: updateResponse,
        success: true,
        message: "password  change"
    })
}
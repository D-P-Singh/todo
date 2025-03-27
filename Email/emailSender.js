const nodemailer = require('nodemailer');
require("dotenv").config()
const emailSender = async(from, to, subject, html) => {
    try {
        /* connection faild on par  */
        let transporter;
        try {
             transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_ID,
                    pass: process.env.GMAIL_PASS
                }
            })
        } catch (error) {
            console.log("gmai coonection failed", error);
            return
        }
        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: html,
        }
        let info = await transporter.sendMail(mailOptions);
        return info
    } catch (error) {
       // console.log("email send failed", error);
       // return error
    }
}
module.exports =  emailSender
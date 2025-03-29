const users = require("../models/user_model")
const userInfo_model = require("../models/userInfo_model");
exports.allData = async (req, res) => {
    const response = await userInfo_model.find();
    const data = await userInfo_model.find()
    response.data = data
    res.json({
        data: response,
        success: true,
        message: "all user data"
    })
}
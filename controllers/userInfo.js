const userInfo_model = require("../models/userInfo_model");

exports.userInfo = async (req, res) => {
    userId = req.user.id
    const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const browser = req.useragent.browser;
    const os = req.useragent.os;
    const platform = req.useragent.platform;
    const version = req.useragent.version;
    //  console.log("ip", IpAddress, "browser", browser, "os", os, "platform", platform, "version", version);
    //  console.log(req.useragent);
    const userInfo =  await userInfo_model.find({userId:userId})
    
    const response = await userInfo_model.create({userId,
        ipAddress, browser, os, platform, version
    })

    res.json({
        data: response,
        success: true
    })
}
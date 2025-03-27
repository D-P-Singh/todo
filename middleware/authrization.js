const jwt = require("jsonwebtoken")
exports.auth = (req, res, next) => {
    const token = req.headers['authorization']
//    console.log("auth", req);
    try {
        if (!token) {
            return res.status(401).json({
                success: false,
                Message: "please login here"
            })
        }
        try {
            const decode = jwt.verify(token, "dev")
          //   console.log("decode", decode)
            req.user = decode
        } catch (error) {
            return res.status(401).json({
                success: false,
                Message: "token is invalid"
            })
        }
    }
    catch (err) {
        console.log("auth error", err)
    }
    next()
}
exports.admin = (req, res, next) => {
    console.log("admin", req.user)
   // const token = req.cookies.authToken
    try {
        if (req.user.role !== "admin") {
            return res.status(401).json({
                success: false,
                Message: "This is protected route for admin"
            })
        }
    }
    catch (err) {
        console.log("admin", err)
        return res.status(500).json({
            success: false,
            Message: "user role is not maching"
        })
    }
    next()
}
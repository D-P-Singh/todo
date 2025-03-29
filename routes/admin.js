const express = require("express");
const auth = require("../middleware/authrization");
const {allData} = require("../controllers/admin");
const adminRouter = express.Router()

adminRouter.get("/alldata",auth.auth,auth.admin,allData )

module.exports = adminRouter;
const express = require("express")
const router = require("./routes/user")
const dbConnect = require("./config/database")
const todoRouter = require("./routes/todo")
const cokkieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config()
const app = express()
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "DELETE", "GET"],
  //  headers: ['Content-Type', 'Authrization']
}))
app.use(express.json())
app.use(cokkieParser())
app.use("/api", router)
app.use("/api", todoRouter)






dbConnect()

app.listen(process.env.PORT, () => {
    console.log(`server start this port ${process.env.PORT}`)
})
const mongoose = require('mongoose')
require("dotenv").config()
const db_url = process.env.DB_URL
const dbConnect = () => {
    mongoose.connect(db_url,{

    }).then(() => {
        console.log("database connect")
    })
        .catch((error) => {
            console.log("error in connection")
            console.log(error.message)
            process.exit(1)
        })
}

module.exports = dbConnect;
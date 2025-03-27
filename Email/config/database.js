const mongoose = require('mongoose')
const db_url = "mongodb://localhost:27017/todo"
const dbConnect = () => {
    mongoose.connect(db_url, {
    }).then(() => {
        console.log("database connect")
    })
        .catch((error) => {
            console.log("error in connection")
            console.log(error.message)
            process.exit(1)
        })
}
module.exports = dbConnect
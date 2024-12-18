const express = require("express");
const env = require("dotenv")
const authRoute = require("./routes/auth.route")
const connectDB = require("./lib/db")

env.config();
const PORT = process.env.PORT

const app = express();

// convert request to json that we can extract res
app.use(express.json())

app.use('/api/auth' , authRoute)

app.listen(PORT  ,()=> {
    console.log('server is running'+ ' ' +PORT)
    //call connection to DB
    connectDB()
})
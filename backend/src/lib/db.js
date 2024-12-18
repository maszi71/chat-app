const moongose = require("mongoose");

// connection to DB
 const connectDB = async ()=> {
 try {
    const conn = await moongose.connect(process.env.MONGODB_URI);
    console.log(`mongodb connected ${conn.connection.host}`)
 } catch (error) {
    console.log(`mongodb connection error ${error}` )
 }
}

module.exports = connectDB
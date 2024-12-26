const express = require("express");
const env = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./routes/auth.route");
const messageRoute = require("./routes/message.route");

const connectDB = require("./lib/db");

env.config();
const PORT = process.env.PORT;

const app = express();

// convert request to json that we can extract res
app.use(express.json());
// parse cookie
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

app.listen(PORT, () => {
  console.log("server is running" + " " + PORT);
  //call connection to DB
  connectDB();
});

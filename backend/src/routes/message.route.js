const express = require("express");
const { getAllUsers , getMessages , sendMessage } = require("../controllers/message.controller");
const protectRoute = require("../middlewares/auth.middleware");


const route = express.Router();

route.get("/users" , protectRoute ,getAllUsers)
route.get("/:id" , protectRoute , getMessages)
route.post("/send/:id" , protectRoute , sendMessage)



module.exports = route; 
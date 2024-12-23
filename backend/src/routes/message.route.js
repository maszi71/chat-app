const express = require("express");
const { getAllUsers , getMessages } = require("../middlewares/message.middleware");
const protectRoute = require("../middlewares/auth.middleware");


const route = express.Router();

route.get("/users" , protectRoute ,getAllUsers)
route.get("/:id" , protectRoute , getMessages)



module.exports = route; 
const express = require("express");
const { signup, login, logout , updateProfile , checkAuth } = require("../controllers/auth.controller");
const protectRoute = require("../middlewares/auth.middleware");

const route = express.Router();

route.post("/signup", signup);

route.post("/login", login);

route.post("/logout", logout);

route.put("/update-profile" , protectRoute , updateProfile)

route.get("/check-auth" , checkAuth)

module.exports = route;

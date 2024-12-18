const express = require("express");
const {signup} = require("../controllers/auth.controller")


const route = express.Router();

route.post('/signup' , signup);

route.post('/login' , (req , res)=> {
    res.send('messsage')
});

route.post('/logout' , (req , res)=> {
    res.send('messsage')
});

module.exports = route;
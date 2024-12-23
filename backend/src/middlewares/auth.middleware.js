const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protectRoute = async (req , res , next)=> {
    try {
    const token = req.cookies.jwt;
    if(!token) return res.status(401).json({message : 'Unauthorized - No Token Provided'})
    const decodeToken = jwt.verify(token , process.env.JWT_TOKEN)
    if(!decodeToken) return res.status(401).json({message : 'Unauthorized - Invalid Provided'})
    
    // return user except password field
    const user = await User.findById(decodeToken.userId).select("-password")
    if(!user) return res.status(404).json({message : 'User Not Found'})
    req.user = user
    next()

    } catch (error) {
        console.log("Error in auth middleware", error.message);
        res.status(500).json({
          message: "Internal Server Error",
        });
    }
}

module.exports = protectRoute
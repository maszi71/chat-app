const jwt = require("jsonwebtoken");
const generateJWTtoken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // convert 7d to miliseconds,
    httpOnly: true, // prevents XSS attack cross-site scripting attacking
    sameSite: "strict", //CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
};

module.exports = generateJWTtoken
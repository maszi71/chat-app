const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateJWTtoken = require("../lib/utils");

//best practice put inside of try , catch
const signup = async (req, res) => {
  const { email, fullName, password, profilePic } = req.body;
  try {
    //validation password
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be atleat 6 characters" });

    const user = await User.findOne({ email });

    //validation email
    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      profilePic,
      password: hashedPassword,
    });

    if (newUser) {
      // generate JWT
      generateJWTtoken(newUser._id, res);

      //Saves this document by inserting a new document into the database(add new user)
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const login = (req, res) => {
  res.send("messsage");
};

const logout = (req, res) => {
  res.send("messsage");
};

module.exports = {
  signup,
  login,
  logout,
};

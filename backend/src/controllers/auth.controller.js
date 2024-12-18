const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateJWTtoken = require("../lib/utils");

//best practice put inside of try , catch
const signup = async (req, res) => {
  const { email, fullName, password, profilePic } = req.body;
  try {
    //validation all fields
    if (!email || !fullName || !password)
      return res.status(400).json({ message: "All fields are required" });
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

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //validation all fields
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });
    const user = await User.findOne({ email });
    // validation for finding user
    if (!user) return res.status(400).json({ message: "Invalid Credential" });
    const isValidPassword = await bcrypt.compare(user.password, password);
    // is password correncts
    if (!isValidPassword)
      return res.status(400).json({ message: "Invalid Credential" });
    // generate token and set as cookie
    generateJWTtoken(user._id, res);
    res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  signup,
  login,
  logout,
};

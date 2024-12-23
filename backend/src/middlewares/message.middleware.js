const Message = require("../models/message.model");
const User = require("../models/user.model");

const getAllUsers = async (req, res) => {
  try {
    const user = req.user;
    // return all users except logged
    const filteredUser = await User.find({ _id: { $ne: user._id } }).select(
      "-password"
    );
    return res.status(200).json(filteredUser);
  } catch (error) {
    console.log("Error in getAllUsers controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, recieverId: userToChatId },
        { senderId: userToChatId, recieverId: myId },
      ],
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = { getAllUsers , getMessages };

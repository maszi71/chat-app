const Message = require("../models/message.model");
const User = require("../models/user.model");
const cloudinary = require("../lib/cloudinary");
const {getReceiverSocketId , io} = require("../lib/socket");


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

const sendMessage = async (req, res)=> {
  try {
    const { id: recieverId } = req.params;
    const senderId = req.user._id;
    const {text , image} = req.body;
    let imageUrl;
    if(image) {
      const uploadedResponse = await cloudinary.uploader.upload(image)
      imageUrl = uploadedResponse.secure_url
    }
    const newMessage = new Message({
      text,
      recieverId,
      senderId,
      image: imageUrl
    })

    await newMessage.save()

  // real time message
  const receiverSocketId = getReceiverSocketId(recieverId)
  // if receiver is online , broadcast the message with event "newMessage"
  if(receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage" , newMessage);
  }
  
  
    return res.status(201).json(newMessage)

  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = { getAllUsers , getMessages , sendMessage };

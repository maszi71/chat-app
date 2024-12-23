const moongose = require('mongoose')

const messageSchema = new moongose.Schema(
    {
        senderId: {
            type: moongose.Schema.Types.ObjectId,
            ref: "User",
            required : true,
        },
        recieverId : {
            type: moongose.Schema.Types.ObjectId,
            ref: "User",
            required : true,
        },
        text : {
            type : String,
        },
        profilePic : {
            type : String,
        },
    },
    {timestamps : true}
)

const Message = moongose.model('Message' , messageSchema)

module.exports = Message 
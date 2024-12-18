const moongose = require('mongoose')

const userSchema = new moongose.Schema(
    {
        email: {
            type: String,
            required : true,
            unique : true
        },
        fullName : {
            type: String,
            required : true
        },
        password : {
            type : String,
            required : true,
            minlength : 6
        },
        profilePic : {
            type : String,
            default : ""
        },
    },
    {timestamps : true}
)

//ToDo : added userName , birthDay , bio
//{timestamps : true} for creating created_At and updated_At

const User = moongose.model('User' , userSchema)

module.exports = User
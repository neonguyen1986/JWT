const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
    },
    admin: {
        type: Boolean,
        default: false,//every user login by default is not admin
    }
}, { timestamps: true }//when was the model created
)

module.exports = mongoose.model("User", userSchema)//model name
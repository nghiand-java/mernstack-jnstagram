const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        pic: {
            type: String,
            default: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Noimage.svg/1200px-Noimage.svg.png"
        },
        resetToken: String,
        expireToken: Date,
        followers: [{
            type: ObjectId,
            ref: "User"
        }],
        following: [{
            type: ObjectId,
            ref: "User"
        }]
    },
    {timestamps: true})


mongoose.model("User", userSchema);
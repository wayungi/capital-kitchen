const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
       type: String,
       required: [true, "Username is required"],
       unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    contact : {
        type: String,
        required: [true, "Mobile number is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    roles: { 
        User: {
            type: Number, 
            default: 2001
        },
        Admin: Number, 
        Editor: Number
    },

    refreshToken: String
        
})

module.exports = mongoose.model('User', userSchema)


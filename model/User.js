const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
       type: String,
       required: true
    },
    password: {
        type: String,
        required: true
    },
    contact : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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


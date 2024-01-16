import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
       type: String,
       required: true
    },
    password: {
        type: string,
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
});

module.exports = mongoose.model('User', userSchema)


/* 
    Just like in react, the file name is capitalized

    first argument to monggoose.model is Capitalized and is not pluralised - convetion

    the collection created will then be 'employees'. NOTE: the lowercase and plural
    
    
    
*/

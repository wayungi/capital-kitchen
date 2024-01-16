const mongoose = require('mongoose') 
const { Schema } = mongoose;

const menuSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    restaurantId: {
        type: String,
        required: true
    },

    restaurantName: {
        type:String,
        required: true
    },

    path: String,

    desc: String

});

module.exports = mongoose.model("Menu", menuSchema);
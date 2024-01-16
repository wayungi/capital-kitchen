const mongoose = require('mongoose') 
const { Schema } = mongoose;

const menuSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: String,
  status: {
    type: String,
    deafault: "down",
  },
});

module.exports = mongoose.model("Menu", menuSchema);
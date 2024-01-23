const mongoose = require('mongoose') 
const { Schema } = mongoose;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  location: {
    type: String,
    required: [true, "Location is required"]
  },
  path: {
    type: String,
    default: "https://picsum.photos/200"
  },
  active: {
    type: Boolean,
    default: false,
  },
  contact: String
});

module.exports = mongoose.model("Restaurant", restaurantSchema);

/* 
    Just like in react, the file name is capitalized

    first argument to monggoose.model is Capitalized and is not pluralised - convetion

    the collection created will then be 'employees'. NOTE: the lowercase and plural
    
    
    
*/

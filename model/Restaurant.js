const mongoose = require('mongoose') 
const { Schema } = mongoose;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    default: "https://picsum.photos/200"
  },
  active: {
    type: Boolean,
    deafault: false,
  },
  contact: String
});

module.exports = mongoose.model("Restaurant", restaurantSchema);

/* 
    Just like in react, the file name is capitalized

    first argument to monggoose.model is Capitalized and is not pluralised - convetion

    the collection created will then be 'employees'. NOTE: the lowercase and plural
    
    
    
*/

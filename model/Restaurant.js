import mongoose from 'mongoose';
const { Schema } = mongoose;

const restaurantSchema = new Schema({
    name: string,
    location: string,
    status: string
});

module.exports = mongoose.model('Restaurant', restaurantSchema)


/* 
    Just like in react, the file name is capitalized

    first argument to monggoose.model is Capitalized and is not pluralised - convetion

    the collection created will then be 'employees'. NOTE: the lowercase and plural
    
    
    
*/

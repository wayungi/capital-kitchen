const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
       await mongoose.connect(process.env.DATABASE_URI);
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }catch(err) {
        console.log(err)
    }
}

module.exports =  dbConnect


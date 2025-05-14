const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
}

module.exports = connectDB;
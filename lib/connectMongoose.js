const mongoose = require('mongoose'); 

mongoose.set('strictQuery',false);

mongoose.connection.on('error',err=>{
    console.log('Connection error',err);
})

mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB in', mongoose.connection.name)
})

mongoose.connect("mongodb://127.0.0.1:27017/spacejump")

module.exports = mongoose.connection; 
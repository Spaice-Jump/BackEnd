const mongoose = require('mongoose');


//create esquema
const userSchema = mongoose.Schema({
    user: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
  });


//Create model
const User = mongoose.model("User", userSchema);

//export model
module.exports = User;
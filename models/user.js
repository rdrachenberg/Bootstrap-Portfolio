const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: false },
  address: { type: String, required: false },
  email: { type: String, required: false },
  phone: { type: String, required: false },
  message: { type: String, required: false }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
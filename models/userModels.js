const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
    trim: true,
    maxLength: [40, "name must have less and equal than 40 character"],
    minLength: [2, "name must have more and equal than 2 character"],
  },
  email: {
    type: String,
    required: [true, "Provide us your Email"],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid Email"],
  },
  photo: String,

  password: {
    type: String,
    required: [true, "Please provide your password"],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
  },
});

const User = mongoose.model("Users", userSchema);

module.exports = User;

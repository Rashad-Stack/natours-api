const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
  role: {
    type: String,
    enum: ["user", "guide", "lead-guid", "admin"],
    default: "user",
  },
  photo: String,

  password: {
    type: String,
    required: [true, "Please provide your password"],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only work on create and save method
      validator: function (el) {
        return el === this.password;
      },
      message: "Password are not same!",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  resetTokenExpires: Date,
});

userSchema.pre("save", async function (next) {
  // Only run this function when password was actually modified;
  if (!this.isModified("password")) return next();

  //   Hash the password with coast of 12
  this.password = await bcrypt.hash(this.password, 12);

  //   cleared the password confirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (this.isDirectModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const tokenCreatedAt = new Date(JWTTimestamp * 1000);
    // true means user changed password after the token generate.
    return tokenCreatedAt < this.passwordChangedAt;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.generateRandomResetToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  this.resetTokenExpires = Date.now() + 10 * 60 * 1000;

  console.log(
    "🚀 ~ file: userModels.js:83 ~ ",
    { token },
    this.passwordResetToken
  );

  return token;
};

const User = mongoose.model("Users", userSchema);

module.exports = User;

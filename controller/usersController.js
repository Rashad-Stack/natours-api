const User = require("../models/userModels");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
});
exports.createUser = (req, res) => {
  res.status(500).json({
    status: "fail",
    message: "This route does not define yet",
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: "fail",
    message: "This route does not define yet",
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "fail",
    message: "This route does not define yet",
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "fail",
    message: "This route does not define yet",
  });
};

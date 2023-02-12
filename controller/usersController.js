const User = require("../models/userModels");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const filterObj = (obj, ...allowedFiled) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFiled.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

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

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create Error is user Post password Data\
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This Route is not for updating password. Please use /update-password.",
        400
      )
    );
  }

  // 2) Filtered out unwanted fields that aew not allowed to update
  const filteredBody = filterObj(req.body, "name", "email");

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

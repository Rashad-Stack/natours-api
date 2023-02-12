const express = require("express");
const usersController = require("../controller/usersController");
const authController = require("../controller/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.patch("/reset-password/:token", authController.resetPassword);
router.patch(
  "/update-password",
  authController.protect,
  authController.updatePassword
);
router.patch("/update-me", authController.protect, usersController.updateMe);
router.delete(
  "/delete-user",
  authController.protect,
  usersController.deleteUser
);

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createUser);

module.exports = router;

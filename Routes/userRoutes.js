const express = require("express");
const usersController = require("../controller/usersController");
const authController = require("../controller/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.patch("/reset-password/:token", authController.resetPassword);

// Belows are protect router
router.use(authController.protect);

router.patch("/update-password", authController.updatePassword);
router.get("/me", usersController.getMe, usersController.getUser);
router.patch(
  "/update-me",
  usersController.uploadPhoto,
  usersController.updateMe
);
router.delete("/delete-account", usersController.deleteMe);

//  Belows are protected by admin
router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createUser);

router
  .route("/:id")
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;

const express = require("express");
const usersController = require("../controller/usersController");
const authController = require("../controller/authController");

const router = express.Router();

router.post("/signup", authController.signup);

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

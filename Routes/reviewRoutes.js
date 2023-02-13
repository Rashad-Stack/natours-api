const express = require("express");
const authController = require("../controller/authController");
const reviewsController = require("../controller/reviewsController");

const router = express.Router();

router
  .route("/")
  .get(reviewsController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo("user"),
    reviewsController.createReview
  );

module.exports = router;

const express = require("express");
const authController = require("../controller/authController");
const reviewsController = require("../controller/reviewsController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(reviewsController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo("user"),
    reviewsController.setTourUserIds,
    reviewsController.createReview
  );

router
  .route("/:id")
  .get(reviewsController.getReview)
  .patch(reviewsController.updateReview)
  .delete(authController.protect, reviewsController.deleteReview);

module.exports = router;

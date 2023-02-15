const express = require("express");
const authController = require("../controller/authController");
const reviewsController = require("../controller/reviewsController");

const router = express.Router({ mergeParams: true });

// Bellows are protected router
router.use(authController.protect);

router
  .route("/")
  .get(reviewsController.getAllReviews)
  .post(
    authController.restrictTo("user"),
    reviewsController.setTourUserIds,
    reviewsController.createReview
  );

router
  .route("/:id")
  .get(reviewsController.getReview)
  .patch(
    authController.restrictTo("user", "admin"),
    reviewsController.updateReview
  )
  .delete(
    authController.restrictTo("user", "admin"),
    reviewsController.deleteReview
  );

module.exports = router;

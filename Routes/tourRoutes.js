const express = require("express");
const toursController = require("../controller/toursController");
const authController = require("../controller/authController");
const reviewRoutes = require("./reviewRoutes");

const router = express.Router();

router.use("/:tourId/review", reviewRoutes);

router
  .route("/top-5-cheap")
  .get(toursController.aliasTopTour, toursController.getAllTours);

router.route("/tour-stats").get(toursController.getTourStats);
router
  .route("/monthly-plans/:year")
  .get(
    authController.restrictTo("admin", "lead-guide", "guide"),
    toursController.monthlyPlan
  );
router
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(toursController.getToursWithin);
router.route("/distances/:latlng/unit/:unit").get(toursController.getDistances);

router
  .route("/")
  .get(toursController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    toursController.createTour
  );

router
  .route("/:id")
  .get(toursController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    toursController.uploadImages,
    toursController.resizeImageTour,
    toursController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    toursController.deleteTour
  );

module.exports = router;

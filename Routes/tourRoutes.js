const express = require("express");
const toursController = require("../controller/toursController");
const authController = require("../controller/authController");

const router = express.Router();

router
  .route("/top-5-cheap")
  .get(toursController.aliasTopTour, toursController.getAllTours);

router.route("/tour-stats").get(toursController.getTourStats);
router.route("/monthly-plans/:year").get(toursController.monthlyPlan);

router
  .route("/")
  .get(authController.protect, toursController.getAllTours)
  .post(toursController.createTour);
router
  .route("/:id")
  .get(toursController.getTour)
  .patch(toursController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    toursController.deleteTour
  );
module.exports = router;

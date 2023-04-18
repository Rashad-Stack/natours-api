const express = require("express");
const authController = require("../controller/authController");
const bookingsRoutes = require("../controller/bookingControllers");

const router = express.Router();

router.get(
  "/checkout-session/:tourId",
  authController.protect,
  bookingsRoutes.getCheckoutSession
);

module.exports = router;

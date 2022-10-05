const express = require("express");

const {
  deleteTour,
  getAllTour,
  getTour,
  updateTour,
  createTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require("../controller/tourController");

const Router = express.Router();
// Router.param("id", checkedId);

Router.route("/top-5-cheap").get(aliasTopTours, getAllTour);

Router.route("/tours-stats").get(getTourStats);

Router.route("/monthly-plans/:year").get(getMonthlyPlan);

Router.route("/").get(getAllTour).post(createTour);
Router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);
module.exports = Router;

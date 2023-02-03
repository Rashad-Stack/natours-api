const express = require("express");
const morgan = require("morgan");
const toursRoutes = require("./routes/tourRoutes");
const userRoutes = require("./routes/userRoutes");

// Middle wares
const app = express();
app.use(morgan("dev"));
app.use(express.json());

// routes middleware
app.use("/api/v1/tours", toursRoutes);
app.use("/api/v1/users", userRoutes);

module.exports = app;

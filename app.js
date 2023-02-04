const express = require("express");
const morgan = require("morgan");
const toursRoutes = require("./routes/tourRoutes");
const userRoutes = require("./routes/userRoutes");

// Middle wares
const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes middleware
app.use("/api/v1/tours", toursRoutes);
app.use("/api/v1/users", userRoutes);

module.exports = app;

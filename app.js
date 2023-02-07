const express = require("express");
const morgan = require("morgan");
const toursRoutes = require("./routes/tourRoutes");
const userRoutes = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorControllers");

// Middle wares
const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
});

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes middleware
app.use("/api/v1/tours", toursRoutes);
app.use("/api/v1/users", userRoutes);

app.all("*", (req, res, next) => {
  next(
    new AppError(
      `Can't Find this URL (${req.originalUrl}) on this server!`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;

const express = require("express");
const morgan = require("morgan");
const toursRoutes = require("./routes/tourRoutes");
const userRoutes = require("./routes/userRoutes");

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
  // res.status(404).json({
  //   status: "Failed",
  //   message: `Can't Find this URL (${req.originalUrl}) on this server!`,
  // });
  // next();

  const err = new Error(
    `Can't Find this URL (${req.originalUrl}) on this server!`
  );
  err.statusCode = 404;
  err.status = "Failed";
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "Error",
    message: err.message,
  });
});

module.exports = app;

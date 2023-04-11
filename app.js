const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");

const toursRoutes = require("./routes/tourRoutes");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const viewRoutes = require("./routes/viewRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorControllers");

// Global Middle wares
const app = express();
app.set("view engine", "pug");
const viewPath = path.join(__dirname, "views");
app.set("views", viewPath);

// serving static file
app.use(express.static(`${__dirname}/public`));
// Set secure HTTP headers
app.use(helmet());

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit request from same api
const limit = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP. please try again in an hour!",
});

//  Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//  Data sanitization against XSS
app.use(xss());

// Prevent parameter Pollution/duplication
app.use(
  hpp({
    whitelist: [
      "duration",
      "maxGroupSize",
      "ratingsAverage",
      "ratingQuantity",
      "price",
      "startDates",
      "durationWeeks",
      "difficulty",
    ],
  })
);

//  Test Middleware
app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

// routes middleware
app.use("/", viewRoutes);
app.use("/api", limit);
app.use("/api/v1/tours", toursRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/reviews", reviewRoutes);

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

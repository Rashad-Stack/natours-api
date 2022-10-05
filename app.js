const express = require("express");
const morgan = require("morgan");

const app = express();
const tourRouter = require("./Routes/tourRoutes");
const userRouter = require("./Routes/userRoutes");

// 1) Middleware
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;

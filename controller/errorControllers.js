const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "Error",
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational,Trusted Error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      status: err.status || "Error",
      message: err.message,
    });

    // Programing or other unknown error: don't leak error details
  } else {
    // 1) Log Error
    console.error("Error", err);

    // 2) Send Generic Message
    res.status(500).json({
      status: "error",
      message: "Something went very Wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    if (err.name === "CastError") error = handleCastErrorDB(error);

    sendErrorProd(error, res);
  }
};

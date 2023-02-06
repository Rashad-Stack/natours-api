const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "A tour must have duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have max group size"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have difficulty level"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A tour must have price"],
  },
  discountPrice: Number,
  summery: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have cover image"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
});
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;

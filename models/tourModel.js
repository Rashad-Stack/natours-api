const mongoose = require("mongoose");

const toursSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A Tour Must Have a Name"],
      unique: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, "A Tour Must Have a Duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A Tour Must Have a Group Size"],
    },
    difficulty: {
      type: String,
      required: [true, "A Tour Must Have a Difficulty"],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A Tour Must Have Price"],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
    },
    description: { type: String, trim: true },
    imageCover: {
      type: String,
      required: [true, "A Tour Must Have a Cover Image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: new Date(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

toursSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

const Tour = mongoose.model("Tour", toursSchema);

module.exports = Tour;

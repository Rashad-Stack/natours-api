const mongoose = require("mongoose");
const slugify = require("slugify");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      trim: true,
    },
    slug: String,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

// Document middleware runs before .save() and .create() methods, but will not trigger when call updateMany() method.
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre("save", function (next) {
  console.log("Document will save");
  next();
});

tourSchema.post("save", function (doc, next) {
  console.log(doc);
  next();
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;

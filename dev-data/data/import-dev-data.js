const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("../../models/tourModels");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE_URL.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.set("strictQuery", true);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected successfully"));

//   Reading Json File from local
const jsonData = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf8")
);

//  Import data in to Database
const importData = async () => {
  try {
    await Tour.create(jsonData);
    console.log("Data successfully imported");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete data from Database
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data successfully Deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

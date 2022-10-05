const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("../../models/tourModel");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connection established"));

//   Reading Json File from local
const jsonData = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf8"));

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

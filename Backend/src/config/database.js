require("dotenv").config();
const mongoose = require("mongoose");

async function connectToDb() {
  await mongoose
    .connect(process.env.URL)
    .then(() => console.log("MongoDb Connected"));
}

module.exports = connectToDb;

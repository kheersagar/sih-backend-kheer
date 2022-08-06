const mongoose = require("mongoose");
require("dotenv").config();
const mongoDbConnection = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("DB CONNECTED");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { mongoDbConnection };

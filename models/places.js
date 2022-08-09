var mongoose = require("mongoose");

const monumentSchema = mongoose.Schema({
  id: Number,
  name: String,
  stateUT: String,
  description: String,
  time: String,
  fee: String,
  price: Number,
});

module.exports = mongoose.model("Monument", monumentSchema);

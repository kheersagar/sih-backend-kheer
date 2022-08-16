var mongoose = require("mongoose");
const ticketedUsersSchema = mongoose.Schema({
  userType: String,
  gender: String,
  name: String,
  age: String,
  nationality: String,
  idType: String,
  idNumber: String,
});
var ticketSchema = new mongoose.Schema({
  monumentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Monument",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ticketedUsers: [ticketedUsersSchema],
  qr: {
    type: String,
  },
  price: {
    type: Number,
  },
  cprice: {
    type: Number,
  },
  fprice: {
    type: Number,
  },
  creatAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("ticket", ticketSchema);

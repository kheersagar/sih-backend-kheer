var mongoose = require("mongoose");

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
  ticketedUsers: [
    {
      name: String,
      age: String,
      aadhar: String,
    },
  ],
  qr: {
    type: String,
  },
  price: {
    type: Number,
  },
  creatAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("ticket", ticketSchema);

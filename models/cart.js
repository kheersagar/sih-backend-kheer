const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
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
  creatAt: {
    type: Date,
    default: () => Date.now(),
  },
});
cartSchema.index({ monumentId: 1, userId: 1 }, { unique: true }); // multicolumn unique values

module.exports = mongoose.model("Cart", cartSchema);

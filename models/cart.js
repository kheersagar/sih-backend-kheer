const mongoose = require("mongoose");

const ticketedUsersSchema = mongoose.Schema({
  userType: String,
  gender: String,
  name: String,
  age: String,
  nationality: String,
  idType: String,
  idNumber: String,
});

const cartSchema = new mongoose.Schema({
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
cartSchema.index({ monumentId: 1, userId: 1 }, { unique: true }); // multicolumn unique values

module.exports = mongoose.model("Cart", cartSchema);

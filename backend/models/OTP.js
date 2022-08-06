const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
  otp: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    index: { expires: 60*60*60 },
  },
});

const OTP = mongoose.model("OTP", OTPSchema);
module.exports = OTP;

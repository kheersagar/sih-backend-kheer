const OTP = require("../models/OTP");
const newOTP = require("otp-generators");
const { EmailTransporter } = require("../EmailTransporter");
const user = require("../models/user");
const OtpController = async (user) => {
  try {
    const otp = Number(
      newOTP.generate(4, {
        alphabets: false,
        upperCase: false,
        specialChar: false,
      })
    );
    console.log(otp, typeof otp);
    const res = await OTP.create({
      otp: otp,
      userId: user._id,
    });
    console.log(res);
    return EmailTransporter(user, res.otp);
  } catch (err) {
    console.log(err);
  }
};

const verifyOtp = async (req, res) => {
  const { otp, userId } = req.body;
  console.log(req.body);
  try {
    const result = await OTP.find({ userId: userId, otp: Number(otp) });
    console.log(result);
    if (result.length === 0) {
      res.status(401).send("Incorrect OTP");
      return;
    }
    await user.findByIdAndUpdate(userId, { registrationConfirmed: true });
    res.send("User Verified");
  } catch (err) {
    console.log(err);
    res.status(401).send(err.message);
  }
};

const resendOtp = async (req, res) => {
  const { userId } = req.body;
  try {
    const result = await OTP.findOne({ userId });
    const resultUser = await user.findOne({ _id: userId });
    console.log(result);
    if (!result) {
      res.status(500).send("User Not Found");
      return;
    }
    return EmailTransporter(resultUser, result.otp);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err);
  }
};
module.exports = { OtpController, verifyOtp, resendOtp };

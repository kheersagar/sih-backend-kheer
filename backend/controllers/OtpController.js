const OTP = require("../models/OTP");
const newOTP = require("otp-generators");
const { EmailTransporter } = require("../EmailTransporter");
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

module.exports = { OtpController };

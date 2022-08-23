const template = require("./emailTemplate");
const transporter = require("./email");
const { constant } = require("lodash");

const EmailTransporter = (user, otp) => {
  // const temp = template(user.email, otp);

  var mailOptions = {
    from: "rahhar848@gmail.com",
    to: user.email,
    subject: "Sending Email using Node.js",
    text: "That was easy!",
    html: `(
      <div>
        <h1>Hello ${user}! Welcome You</h1>{" "}
        <h2>Your OTP is ${otp} valid only for 10mins</h2>
      </div>
    )`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    console.log("called");
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      return true;
    }
  });
};

module.exports = { EmailTransporter };

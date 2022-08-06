const template = require("./emailTemplate");
const transporter = require("./email");
const { constant } = require("lodash");

const EmailTransporter = (user, otp) => {
  const temp = template(user.email, otp);

  var mailOptions = {
    from: "rahhar848@gmail.com",
    to: user.email,
    subject: "Sending Email using Node.js",
    text: "That was easy!",
    html: `${temp}`,
    // attachments: [{
    //     filename: 'image-1.png',
    //     path: __dirname+'/uploads/images/image-1.png',
    //     cid: 'image-1.png' //same cid value as in the html img src
    //   },
    //   {
    //     filename: 'image-2.png',
    //     path: __dirname+'/uploads/images/image-2.png',
    //     cid: 'image-2.png' //same cid value as in the html img src
    //   },
    //   {
    //     filename: 'image-3.png',
    //     path: __dirname+'/uploads/images/image-3.png',
    //     cid: 'image-3.png' //same cid value as in the html img src
    //   },
    //   {
    //     filename: 'image-4.png',
    //     path: __dirname+'/uploads/images/image-4.png',
    //     cid: 'image-4.png' //same cid value as in the html img src
    //   },
    //   {
    //     filename: 'image-5.png',
    //     path: __dirname+'/uploads/images/image-5.png',
    //     cid: 'image-5.png' //same cid value as in the html img src
    //   },
    //   {
    //     filename: 'image-6.png',
    //     path: __dirname+'/uploads/images/image-6.png',
    //     cid: 'image-6.png' //same cid value as in the html img src
    //   },
    //   {
    //     filename: 'image-7.png',
    //     path: __dirname+'/uploads/images/image-7.png',
    //     cid: 'image-7.png' //same cid value as in the html img src
    //   }
    // ]
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

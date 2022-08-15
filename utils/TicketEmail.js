const template = require("../Templates/TicketTemplates");
const transporter = require("../email");
const path = require("path");

const TicketEmail = (user, otp) => {
  const temp = template();
  console.log(path.join(__dirname, "..", "/public/imagess/download.png"));
  var mailOptions = {
    from: "rahhar848@gmail.com",
    to: "santparja@gmail.com",
    subject: "Your E-Ticket",
    text: "Have a Good Day!!",
    html: `${temp}`,
    attachments: [
      {
        filename: "image-1.png",
        path: path.join(__dirname, "..", "/public/imagess/download.png"),
        cid: "image-1.png", //same cid value as in the html img src
      },
      {
        filename: "image-2.png",
        path: path.join(__dirname, "..", "/public/imagess/download.jpg"),
        cid: "image-2.png", //same cid value as in the html img src
      },
      {
        filename: "image-3.png",
        path: path.join(__dirname, "..", "/public/imagess/temp-qr.png"),
        cid: "image-3.png", //same cid value as in the html img src
      },
      {
        filename: "SIH221.JPG",
        path: path.join(__dirname, "..", "/SIH221.JPG"),
      },
      // {
      //   filename: 'image-5.png',
      //   path: __dirname+'/uploads/images/image-5.png',
      //   cid: 'image-5.png' //same cid value as in the html img src
      // },
      // {
      //   filename: 'image-6.png',
      //   path: __dirname+'/uploads/images/image-6.png',
      //   cid: 'image-6.png' //same cid value as in the html img src
      // },
      // {
      //   filename: 'image-7.png',
      //   path: __dirname+'/uploads/images/image-7.png',
      //   cid: 'image-7.png' //same cid value as in the html img src
      // }
    ],
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

module.exports = { TicketEmail };

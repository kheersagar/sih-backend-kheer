const transporter = require("../email");
const path = require("path");

const TicketEmail = (email, filePath) => {
  console.log(path.join(__dirname, "..", "/public/download.png"));
  var mailOptions = {
    from: "rahhar848@gmail.com",
    to: email,
    subject: "Your E-Ticket",
    text: "Have a Good Day!!",
    html: `<div>Please Download Your Ticket</div>`,
    attachments: [
      // {
      //   filename: "image-1.png",
      //   path: path.join(__dirname, "..", "/public/download.png"),
      //   cid: "image-1.png", //same cid value as in the html img src
      // },
      // {
      //   filename: "image-2.png",
      //   path: path.join(__dirname, "..", "/public/download.jpg"),
      //   cid: "image-2.png", //same cid value as in the html img src
      // },
      // {
      //   filename: "image-3.png",
      //   path: path.join(__dirname, "..", "/public/temp-qr.png"),
      //   cid: "image-3.png", //same cid value as in the html img src
      // },
      {
        filename: "ticket.pdf",
        path: path.join(__dirname, "..", "/ticket.pdf"),
      },
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

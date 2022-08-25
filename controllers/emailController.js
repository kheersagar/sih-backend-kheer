const { TicketEmail } = require("../utils/TicketEmail");
var fs = require("fs");
var pdf = require("html-pdf");
const ticketTemplate = require("../Templates/template");
const temp = require("../Templates/temparary");
var options = { format: "Letter" };

const emailController = async (data) => {
  var html = ticketTemplate(data);
  // const html = temp(data);
  try {
    const abc = await new Promise((resolve, reject) => {
      pdf.create(html, options).toFile("./ticket.pdf", function (err, res) {
        if (err) {
          console.log(err);
          reject(err);
        }
        console.log(res); // { filename: '/app/businesscard.pdf' }
        resolve(res);
      });
    });
    if (abc) {
      TicketEmail(data.userId.email);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { emailController };

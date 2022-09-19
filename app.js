const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const express = require("express");
const QRCode = require("easyqrcodejs-nodejs");
const fs = require("fs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
let pdf = require("html-pdf");
const app = express();
const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payement");
const ticket = require("./models/ticket");
const placesRoutes = require("./routes/places");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const { mongoDbConnection } = require("./MongooseConnection");
const user = require("./models/user");
const { generateQrCode } = require("./utils/generateQrCode");
const { TicketEmail } = require("./utils/TicketEmail");
const userCart = require("./routes/cart");
const { emailController } = require("./controllers/emailController");
const temp = require("./Templates/temparary");
const transporter = require("./email");
const ejs = require("ejs");
// generate pdf
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public", "imagess")));
//db connection
mongoDbConnection();
//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

//my routes
app.use("/api", authRoutes);
app.use("/places", placesRoutes);
app.use("/payment", paymentRoutes);
app.use("/user", userRoutes);
app.use("/api", userCart);
app.use("/admin", adminRoutes);

app.get("/topState/:state", async (req, res) => {
  const { state } = req.params;
  const mp = new Map();
  try {
    const result = await ticket.find({}).populate("monumentId");
    result.map((resultItem, index) => {
      [resultItem.monumentId].map((item) => {
        if (item.stateUT.toLowerCase() === state.toLowerCase()) {
          mp[item.name] += 1;
        }
      });
    });
    const sortable = Object.fromEntries(
      Object.entries(mp).sort(([, a], [, b]) => b - a)
    );
    const labels = Object.keys(sortable);
    const data = Object.values(sortable);
    res.send(labels[0]);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
});
app.get("/", (req, res) => {
  res.send("hello");
});
app.get("/generate-qr", (req, res) => {
  try {
    const value = `{
      key1: value1,
      key2: value2,
      key2: value2,
      key2: value2,   ,
   }`;
    const background = fs.readFileSync("./assets/monuments/test.jpg");
    var options = {
      text: value,
      width: 360,
      height: 360,
      dotScale: 0.4,
      backgroundImage: background,
      backgroundImageAlpha: 1,
      autoColor: true,
      correctLevel: QRCode.CorrectLevel.H,
      colorDark: "#000000",
      colorLight: "#ffffff",
      dotScaleTiming_H: 0.1,
      dotScaleTiming_V: 0.1,
      quality: 1,
    };
    var qrcode = new QRCode(options);
    qrcode.saveImage({
      path: "./SIH221.JPG", // save path
    });
    qrcode.toDataURL().then((data) => {
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
  res.send("create successfully");
});
app.get("/q", async (req, res) => {
  let result;
  try {
    result = await generateQrCode();
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/email", (req, res) => {
  const temphtml = temp();
  var mailOptions = {
    from: "rahhar848@gmail.com",
    to: "santparja@gmail.com",
    subject: "Your E-Ticket",
    text: "Have a Good Day!!",
    html: temphtml,
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
  res.send("hello");
});

//qr-scanner
app.get("/generateReport", (req, res) => {
  ejs.renderFile(path.join(__dirname, "views", "pdf-html.ejs"), (err, data) => {
    if (err) {
      res.send(err);
    } else {
      let options = {
        height: "11.25in",
        width: "8.5in",
        header: {
          height: "20mm",
        },
        footer: {
          height: "20mm",
        },
      };
      pdf.create(data, options).toFile("report.pdf", function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send("File created successfully");
        }
      });
    }
  });
});
//port
const port = process.env.PORT || 8000;
//starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

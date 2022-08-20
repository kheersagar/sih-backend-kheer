const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const express = require("express");
const QRCode = require("easyqrcodejs-nodejs");
const fs = require("fs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payement");
const ticket = require("./models/ticket");
const placesRoutes = require("./routes/places");
const userRoutes = require("./routes/user");
const { mongoDbConnection } = require("./MongooseConnection");
const user = require("./models/user");
const { generateQrCode } = require("./utils/generateQrCode");
const { TicketEmail } = require("./utils/TicketEmail");
const userCart = require("./routes/cart");

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

app.get("/", (req, res) => {
  res.send("hello");
});
app.get("/generate-qr", (req, res) => {
  const value = `{
    key1: value1,
    key2: value2,
    key2: value2,
    key2: value2,   ,
 }`;
  try {
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
      path: "./Qr-code/users/qr.png", // save path
    });
    qrcode.toDataURL().then((data) => {
      // console.log(data);
      // to add qr code to user details
      user.findByIdAndUpdate(
        "62ede2c3db94e51d3c623ebf",
        {
          $push: {
            purchases: {
              qr: data,
            },
          },
        },
        (err, result) => {
          if (err) console.log(err);
          else console.log(result);
        }
      );
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
  TicketEmail();
  res.send("hello");
});

//qr-scanner

//port
const port = process.env.PORT || 8000;
//starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

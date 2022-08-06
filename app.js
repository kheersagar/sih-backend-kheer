const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const ticket = require("./models/ticket");
const { mongoDbConnection } = require("./MongooseConnection");

// generate pdf
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

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

app.get("/user-ticket/:id", (req, res) => {
  const { id } = req.params;
  try {
    ticket.findOne({ _id: id }, (err, results) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        console.log(results);
        res.send(results);
      }
    });
  } catch (err) {
    res.status(400).send("some error occured");
  }
});
app.get("/",(req,res)=>{
  res.send("hello");
})


//port
const port = 8000;
//starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});


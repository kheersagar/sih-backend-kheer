const mongoose = require("mongoose");
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const ticket = require("./models/ticket");



// generate pdf
app.use(expressLayouts);
app.set('view engine', 'ejs');

  app.use(express.static( path.join(__dirname,'public')));



//db connection
mongoose
  .connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });
//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//my routes
app.use("/api", authRoutes);

//port
    const port = 8000;

    app.get("/user-ticket/:id",(req,res)=>{
      const {id} = req.params;
      try{
        ticket.findOne({_id:id},(err,results)=>{
            if(err){
                res.send(err);
                console.log(err);
            }else{
                console.log(results)
                res.send(results)
            }
        });
    
    }catch(err){
        res.status(400).send('some error occured')
    }
    })
    
//starting a server
    app.listen(port, ()=>{
        console.log(`app is running at ${port}`);
    });




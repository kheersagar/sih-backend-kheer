var express = require("express");
var router = express.Router();
const {signout, signup, signin} = require("../controllers/auth");
const {getAllTickets} = require("../controllers/ticket");
const {ticket} =require("../controllers/ticket")
const {stripe,stripes} = require("../controllers/stripe");

const {homeview} =require("../controllers/homeController");



router.post("/signup", signup);

router.post("/signin", signin);
router.post("/ticket", ticket);
router.get("/allTickets",getAllTickets)

router.get("/signout", signout);

router.get("/stripe",stripe );
router.post("/payment",stripes);
router.get("/homeview", homeview);



module.exports =router;
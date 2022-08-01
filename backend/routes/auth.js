var express = require("express");
var router = express.Router();
const {signout, signup, signin} = require("../controllers/auth");
const {getAllTickets} = require("../controllers/ticket");
const {ticket} =require("../controllers/ticket")


router.post("/signup", signup);

router.post("/signin", signin);
router.post("/ticket", ticket);
router.get("/allTickets",getAllTickets)

router.get("/signout", signout);


module.exports =router;
var express = require("express");
var router = express.Router();
const {signout, signup, signin, issignin } = require("../controllers/auth");
const {getAllTickets} = require("../controllers/ticket");
const {check } = require('express-validator');
const {ticket} =require("../controllers/ticket")
const {stripe,stripes} = require("../controllers/stripe");

const {homeview} =require("../controllers/homeController");
const { isLength } = require("lodash");



router.post("/signup", [
    check("name", "name should be atleast 3 charactor").isLength({min: 3}),
    check("email", "email is required").isEmail(),
    check("password", "password should be atleast 8 charactor").isLength({min:8})],

signup);

router.post("/signin", signin);
router.post("/ticket", ticket);
router.get("/allTickets",getAllTickets)

router.get("/signout", signout);
router.get("/testroute",issignin, (req,res)=>{
res.send("A protected route");
} )

router.get("/stripe",stripe );
router.post("/payment",stripes);
router.get("/homeview", homeview);



module.exports =router;
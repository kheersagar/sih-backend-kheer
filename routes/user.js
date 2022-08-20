const { getUserTicket } = require("../controllers/user");
const {getAllUsers}= require("../controllers/cart")

const router = require("express").Router();

router.get("/getTicket/:id", getUserTicket);

router.get("/users", getAllUsers)

module.exports = router;

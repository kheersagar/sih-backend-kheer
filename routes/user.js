const { getUserTicket } = require("../controllers/user");

const router = require("express").Router();

router.get("/getTicket/:id", getUserTicket);

module.exports = router;

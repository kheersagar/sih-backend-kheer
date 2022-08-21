const {
  getUserTicket,
  getUserProfile,
  updateProfile,
} = require("../controllers/user");
const { getAllUsers } = require("../controllers/cart");

const router = require("express").Router();

router.get("/getTicket/:id", getUserTicket);

router.get("/users", getAllUsers);
router.post("/updateProfile", updateProfile);
router.get("/getProfile/:id", getUserProfile);

module.exports = router;

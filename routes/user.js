const {
  getUserTicket,
  getUserProfile,
  updateProfile,
} = require("../controllers/user");
const { getAllUsers } = require("../controllers/cart");
const { verifyOtp, resendOtp } = require("../controllers/OtpController");

const router = require("express").Router();

router.get("/getTicket/:id", getUserTicket);

router.get("/users", getAllUsers);
router.post("/updateProfile", updateProfile);
router.get("/getProfile/:id", getUserProfile);
router.post("/verifyOtp", verifyOtp);
router.post("/resendOtp", resendOtp);

module.exports = router;

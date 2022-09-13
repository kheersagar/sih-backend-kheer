const {
  getUserTicket,
  getUserProfile,
  updateProfile,
  LoginAdmin,
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
router.post("/admin/login", LoginAdmin);

module.exports = router;

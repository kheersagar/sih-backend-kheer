const router = require("express").Router();
const {
  getRazorpayKey,
  createOrder,
  payOrder,
} = require("../controllers/paymentController");

router.get("/get-razorpay-key", getRazorpayKey);
router.post("/create-order", createOrder);
router.post("/pay-order", payOrder);

module.exports = router;

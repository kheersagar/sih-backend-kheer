const Razorpay = require("razorpay");
const cart = require("../models/cart");
const ticket = require("../models/ticket");
const path = require("path");
const { generateQrCode } = require("../utils/generateQrCode");
const { emailController } = require("./emailController");

const getRazorpayKey = (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY });
};

const createOrder = async (req, res) => {
  const { amount, cartItems } = req.body;
  cartItems.some((item) => {
    if (!item.date) {
      res.status(500).send("Date Not Found");
      return;
    }
  });
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });
    const options = {
      amount: amount,
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send("Some error occured");
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const payOrder = async (req, res) => {
  try {
    const {
      amount,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      cartItems,
    } = req.body;
    //
    try {
      const result = await Promise.all(
        cartItems.map(async (item) => {
          // console.log(item, "before");
          let imagePath = item.monumentId.img;
          item.monumentId = item.monumentId._id;
          // console.log(item, "after");
          delete item._id;
          const newTicket = await ticket.create(item);
          const qr = await generateQrCode(
            `https://qr-monument.vercel.app/getTicketDetails/${newTicket._id}`,
            path.join("public", imagePath)
          );
          const temp = await ticket.updateMany(
            { _id: newTicket._id },
            { qr: qr.toString() }
          );
          await cart.findOneAndDelete({ userId: item.userId });
          const bookedTicket = await ticket
            .findById(newTicket._id)
            .populate("monumentId");
          emailController(bookedTicket);
        })
      );
      //
      res.send({
        msg: "Payment was successfull",
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = { getRazorpayKey, createOrder, payOrder };

const cart = require("../models/cart");
const Monument = require("../models/places");

const findPlaces = async (req, res) => {
  try {
    const result = await Monument.find({});
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const addToCart = async (req, res) => {
  const { monumentId, userId } = req.body;
  try {
    const result = await cart.create({
      monumentId,
      userId,
    });
    res.send("Successfully Added To Cart");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await cart.find({ userId }).populate("monumentId");
    res.send(result);
    console.log(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};
module.exports = { findPlaces, addToCart, getCart };

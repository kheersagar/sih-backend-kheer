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
    const { price } = await Monument.findById(monumentId);
    const result = await cart.create({
      monumentId,
      userId,
      price,
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
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

const deleteItem = async (req, res) => {
  const { cartId } = req.body;
  try {
    const result = await cart.findByIdAndDelete(cartId);
    res.send("Deleted Successfully");
  } catch (err) {
    console.log(err.message);
    res.status(400).send("some error occured");
  }
};

const addUserToCart = async (req, res) => {
  const data = req.body;
  console.log(req.body);
  try {
    const result = await cart.updateMany(
      { userId: data.userId },
      { $push: { ticketedUsers: data } }
    );
    res.send("Updated Successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
module.exports = { findPlaces, addToCart, getCart, deleteItem, addUserToCart };

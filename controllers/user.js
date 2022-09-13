const { verify } = require("jsonwebtoken");
const ticket = require("../models/ticket");
const user = require("../models/user");

const getUserTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ticket.find({ userId: id }).populate("monumentId");
    res.send(result);
  } catch (err) {
    res.status(500).send("some error occured");
  }
};

const getUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await user.findById(id);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const updateProfile = async (req, res) => {
  try {
    const result = await user.findByIdAndUpdate(req.body.id, req.body);
    res.send("Updated Successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const LoginAdmin = async (req, res) => {
  const { email, userType, password } = req.body;
  try {
    const result = await user.create({
      email,
      role: userType,
      password,
      name: email,
      confirmpassword: password,
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = { getUserTicket, getUserProfile, updateProfile, LoginAdmin };

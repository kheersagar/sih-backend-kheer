const ticket = require("../models/ticket");

const getUserTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ticket.find({ userId: id }).populate("monumentId");
    res.send(result);
  } catch (err) {
    res.status(500).send("some error occured");
  }
};

module.exports = { getUserTicket };

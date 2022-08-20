const ticket = require("../models/ticket");
const User = require("../models/user");
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

exports.getAllUsers = (req , res)=>{
  User.find().exec((err, users)=>{
    if(err || !users){
      return res.status(400).json({
        error: "no user found"
      })
    }
    res.json(users);
  })
}
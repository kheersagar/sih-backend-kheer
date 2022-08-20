const Cart = require("../models/cart");
const User = require("../models/user");


exports.getUserById = (req,res,next,id) =>{
    Cart.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "no user was found in db"
            })
        }
        req.profile = user;
        next();
    });
}
exports.getCart = (req, res)=>{
    return res.json(req.profile)
}

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


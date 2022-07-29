const User = require("../models/user");
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');


exports.signup = (req, res)=>{
    const user = new User(req.body)
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err: "not able to save user in DB"
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id

        });
    }) 
}


exports.signin = (req,res)=>{
    const{email, password} = req.body;

    User.findOne({email}, (err, user)=>{
        if(err || !user){
          return res.status(400).json({
                error: "USer email does not exists"
            })
        }
        if(!user.autheticate(password)){
             return  res.status(401).json({
                error: "email and password do not match"
             })
        }
        //create token 
        const token = jwt.sign({_id: user._id}, "shhhh")
        // put token in cookie
        res.cookie("token", token, {expire: new Date()+ 9999});
    
        // send response to frontend 
        const {_id , name, email,} = user;
        return res.json({token , user:{_id, name, email}});


    } )

}


exports.signout = (req, res)=>{
    res.clearCookie("token");
    res.json({
     message: "User signout successfully"
    });

    
};


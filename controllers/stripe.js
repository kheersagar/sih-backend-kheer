const cors= require("cors")
const express = require("express")

  // add a stripe key
  const stripe = require("stripe")("sk_test_51LSItVSAgNM3L4fVvzjctXc2QW5ZVLI8yl0G57D5vF01qR2f9lr4BNuDJfnmCcddgkZ4mgAahv3KNpnWNKFHsFO80098Mhp3LJ");
 
  const uuid =require("uuid/v4");
  const app = express();

  //middleware
  app.use(express.json())
  app.use(cors())


  

  exports.stripe=(req,res)=>{
    res.send("stripes works")
  }
  exports.stripes=(req,res)=>{
    const {product,token}=req.body;
    console.log("product",product);
    console.log("Price", product.price);
    const idempontencyKey =uuid()

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer =>{
        stripe.charges.create({
            amount: product.price*100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of  product.name`,
            shipping: {
                name: token.card.name,
                address :{
                    country : token.card.address_country
                }
            }
        }, {idempontencyKey})
    })
    .then(result=>res.status(200).json(result))
    .catch(err=> console.log(err))

  }
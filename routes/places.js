const router = require("express").Router();
const {
  findPlaces,
  addToCart,
  getCart,
  deleteItem,
  addUserToCart,
  nearPlaces,
} = require("../controllers/placesController");

router.get("/", findPlaces);
router.post("/addToCart", addToCart);
router.get("/getCart/:userId", getCart);
router.post("/deleteCartItem", deleteItem);
router.post("/addUserToCart", addUserToCart);
router.post("/nearPlaces", nearPlaces);
module.exports = router;

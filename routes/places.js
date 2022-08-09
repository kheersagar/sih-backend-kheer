const router = require("express").Router();
const {
  findPlaces,
  addToCart,
  getCart,
} = require("../controllers/placesController");

router.get("/", findPlaces);
router.post("/addToCart", addToCart);
router.get("/getCart/:userId", getCart);

module.exports = router;

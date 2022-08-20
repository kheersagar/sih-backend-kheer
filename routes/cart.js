const express = require("express")
const router = express.Router()

const {issignin,isAuthenticated} = require("../controllers/auth")
const {getUserById, getCart} = require("../controllers/cart")

router.param("cartId",getUserById)

router.get("/cart/:cartId", issignin,isAuthenticated ,getCart )

module.exports = router;
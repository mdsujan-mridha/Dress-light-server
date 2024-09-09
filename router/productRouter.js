
const express = require("express");
const { createNewProduct } = require("../controller/productController");

const router = express.Router();


// post new product 
router.route("/product/new").post(createNewProduct);




module.exports = router;


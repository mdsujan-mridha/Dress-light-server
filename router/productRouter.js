
const express = require("express");
const { createNewProduct, getAllProducts, getProductDetails } = require("../controller/productController");

const router = express.Router();


// post new product 
router.route("/product/new").post(createNewProduct);
// get all product by user 
router.route("/products").get(getAllProducts);
//get product details 
router.route("/product/:id").get(getProductDetails);





module.exports = router;


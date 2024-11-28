
const express = require("express");
const { createNewProduct, getAllProducts, getProductDetails, getAllProductsAdmin, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReview } = require("../controller/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();


// post new product 
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createNewProduct);
// get all product by user 
router.route("/products").get(getAllProducts);
//get product details 
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser, createProductReview);


// admin product 
router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"), getAllProductsAdmin);
router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
// product review 
router.route("/reviews").get(getProductReviews)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview);
module.exports = router;




const express = require("express");
const { newOrder, getSingleOrder, getAllOrders, myOrders, deleteOrder, updateOrder } = require("../controller/orderController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
// get logged user orders 
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
// get order details 
router.route("/order/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleOrder);
// get all orders by admin 
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
// delete order
router.route("/admin/order/:id")
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder);





module.exports = router;
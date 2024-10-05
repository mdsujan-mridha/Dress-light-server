
const express = require("express");
const {
    createUser,
    login,
    logout,
    getUserDetails,
    updatePassword,
    updateProfile,
    resetPassword,
    forgotPassword,
    getAllUsers,
    getUser,
    updateUserRole,
    deleteUser
} = require("../controller/userController");
const { singleUpload } = require("../middleware/multer");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/user/register").post(singleUpload, createUser);
router.route("/user/login").post(login);
router.route("/user/logout").get(logout);
router.route("/user/me").get(isAuthenticatedUser,getUserDetails);
router.route("/user/update/password").put(updatePassword);
router.route("/user/update/profile").put(singleUpload,updateProfile);
router.route("/user/reset/password/:token").put(resetPassword);
router.route("/user/password/forgot").post(forgotPassword);
router.route("/user/admin/users").get(getAllUsers);
router.route("/admin/user/:id")
    .get(getUser)
    .put(updateUserRole)
    .delete(deleteUser);


module.exports = router;
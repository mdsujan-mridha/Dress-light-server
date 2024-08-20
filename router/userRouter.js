
const express = require("express");
const { createUser, login } = require("../controller/userController");
const { singleUpload } = require("../middleware/multer");

const router = express.Router();

router.route("/user/register").post(singleUpload,createUser);
router.route("/user/login").post(login);

module.exports = router;
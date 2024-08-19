
const express = require("express");
const { createUser, login } = require("../controller/userController");

const router = express.Router();

router.route("/user/register").post(createUser);
router.route("/user/login").post(login);

module.exports = router;
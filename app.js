
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error");

app.use(express.json());

dotenv.config({path:"./config/config.env"});

// import all router 
// user router 
const user = require("./router/userRouter");
app.use("/api/v1", user);


// custom middleware
app.use(errorMiddleware)

module.exports = app;
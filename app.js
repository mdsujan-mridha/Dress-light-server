
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const options = {
    origin: "http://localhost:5173",
    credentials: true,
    optionSuccessStatus: 200,

}

// middleware 

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
dotenv.config({ path: "./config/config.env" });

// import all router 
// user router 
const user = require("./router/userRouter");
// product router 
const product = require("./router/productRouter");
// order router
const order = require("./router/orderRouter");
app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", order)


// custom middleware
app.use(errorMiddleware)

module.exports = app;
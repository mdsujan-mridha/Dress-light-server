
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
app.use(express.json({ limit: "50mb" })); // Ensure JSON body size limit is set
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" })); // Add limit to JSON parsing
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

dotenv.config({ path: "./config/config.env" });

// import all router 
// user router 
const user = require("./router/userRouter");
// product router 
const product = require("./router/productRouter");
// order router
const order = require("./router/orderRouter");
// payment router
const payment = require("./router/paymentRouer");
app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", order);
app.use("/api/v1", payment);


// custom middleware
app.use(errorMiddleware)

module.exports = app;

const app = require("./app");
const database = require("./config/dbConnect");
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;
// const cloudinary = require("cloudinary");
const cloudinaryModule = require("cloudinary");
const { v2: cloudinary } = cloudinaryModule;

// handle uncaught Exception 
process.on("uncaughtException", err => {

    console.log(`Err : ${err.message}`);

    console.log(` Shutting down the server due to uncaught Exception `);

    process.exit(1);
});

// config 
dotenv.config({ path: "./config/config.env" });
// database connection 
database();

// cloudinary config 
// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET
// })
// cloudinary config 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});
// cloudinaryModule.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET
// })

app.get("/", async (req, res) => {
    res.send("Hello Admin server is working ")
})

const server = app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
})

// UnHandle Promise Rejection 
process.on("unhandledRejection", err => {

    console.log(`Err : ${err.message}`);

    console.log(` Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });

});
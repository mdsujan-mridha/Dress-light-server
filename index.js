
const app = require("./app");
const database = require("./config/dbConnect");
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;
// handle uncaught Exception 
process.on("uncaughtException", err => {

    console.log(`Err : ${err.message}`);

    console.log(` Shutting down the server due to uncaught Exception `);

    process.exit(1);
});

// config 
dotenv.config({path:"./config/config.env"});
// database connection 
database();

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
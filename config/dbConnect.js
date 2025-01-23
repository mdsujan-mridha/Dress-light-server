
const mongoose = require("mongoose");

const database = (module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,

    }
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.xmvci.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Database Connected ✅✅")

    } catch (error) {
        console.log(error)
        console.log("Database not connect ❌❌")
    }
});

module.exports = database;
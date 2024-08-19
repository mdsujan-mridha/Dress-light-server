
const mongoose = require("mongoose");

const database = (module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,

    }
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(`mongodb+srv://nextbdsite3:X7OEAiyHkXgVosah@cluster0.0w9io.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Database Connected ✅✅")

    } catch (error) {
        console.log(error)
        console.log("Database not connect ❌❌")
    }
});

module.exports = database;
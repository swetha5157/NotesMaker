const mongoose = require("mongoose");
const dbconnecturl = process.env.NOTES_MONGODB_URL;

mongoose.connect(dbconnecturl).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

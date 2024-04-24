const express = require("express");
require("./db/mongoose.js");
const cors = require("cors");
const userRoutes = require("./routes/user-routes");
const noteRoutes = require("./routes/note-router");
const app = express();

app.use(cors());
app.use(express.json());


// Set up CORS headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
        return;
    }
    next();
});
app.use(userRoutes);
app.use(noteRoutes);
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Backend runs at ${port}`);
});

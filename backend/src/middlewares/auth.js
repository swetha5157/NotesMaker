const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.NOTES_JWT_SECRET);

        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token
        });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        
        // Call next to pass control to the next middleware or route handler
        next();
    } catch (e) {
        res.status(401).send({ Error: "Unauthenticated" });
    }
};

module.exports = auth;

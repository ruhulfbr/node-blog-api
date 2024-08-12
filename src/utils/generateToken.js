const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const generateToken = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1h",
    });

    return token;
};

module.exports = generateToken;

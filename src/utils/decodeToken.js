const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const decodeToken = (token) => {
    const decode = jwt.verify(token, JWT_SECRET);

    return decode;
};

module.exports = decodeToken;

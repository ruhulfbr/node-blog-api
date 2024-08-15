const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const validateTokenId = async (req, res, next) => {
    const token = req.headers.authorization;
    const { id } = req.params;

    const payload = jwt.verify(token, JWT_SECRET);

    if (parseInt(id, 10) !== payload.id) {
        return res.status(401).json({ message: "Unauthorized user" });
    }

    next();
};

module.exports = validateTokenId;

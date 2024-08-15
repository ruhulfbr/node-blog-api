const { validationResult } = require("express-validator");
const jsonResponse = require("../responses/JsonResponse");

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return jsonResponse.validationError(res, errors.array());
    }
    next();
};

module.exports = validateRequest;

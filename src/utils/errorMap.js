const errorMap = {
    NOT_FOUND: 404,
    REQUIRED_FIELD: 400,
    INVALIDE_FIELD: 400,
    ALREADY_EXISTS: 409,
    UNAUTHORIZED: 401,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
    errorMap,
    mapError,
};

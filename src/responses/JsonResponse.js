const { ServiceResultType } = require("../enums");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

const handle = (res, result) => {
    if (result.type == ServiceResultType.DATA) {
        return data(res, result.data);
    }

    return error(res, result.error);
};

const data = (res, data) => {
    const response = {
        status: "success",
        data: data,
    };

    return res.status(StatusCodes.OK).json(response);
};

const error = (res, error) => {
    const response = {
        status: "error",
        errors: [
            {
                code: error.code,
                detail: error.message,
                title: getReasonPhrase(error.code),
            },
        ],
    };

    return res.status(error.code).json(response);
};

const validationError = (res, errors) => {
    errors = errors.map((err) => {
        return {
            code: StatusCodes.UNPROCESSABLE_ENTITY,
            detail: err.msg,
            title: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
        };
    });

    const response = {
        status: "error",
        errors: errors,
    };

    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(response);
};

module.exports = {
    handle,
    data,
    error,
    validationError,
};

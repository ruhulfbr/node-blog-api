const HttpStatus = require("http-status-codes");

const {ServiceResultType: ResultType} = require("./../enums");

class ServiceResult {
    constructor() {
        this.type = ResultType.DATA;
        this.data = null;
        this.error = null;
    }

    // Set the result type
    setType(type) {
        this.type = type;
    }

    // Set the data and optionally the result type
    setData(data, type = ResultType.DATA) {
        this.type = type;
        this.data = data;
    }

    // Set the result type to DELETE and clear data
    setDeleted() {
        this.type = ResultType.DELETE;
        this.data = null;
    }

    // Set the error with a message and an optional code
    setError(message, code = HttpStatus.BAD_REQUEST) {
        this.type = ResultType.ERROR;
        this.error = {
            code: code,
            message: message,
        };
    }
}

module.exports = new ServiceResult();

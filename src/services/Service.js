const winston = require("winston");
const ServiceResult = require("./ServiceResult");

// Create a logger instance
const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
    ],
});

class Service {
    constructor() {
        this.result = new ServiceResult();
    }

    keepLog(type, message, exception = null) {
        const context = exception ? { exception } : {};

        switch (type.toLowerCase()) {
            case "debug":
                logger.debug(message, context);
                break;
            case "info":
                logger.info(message, context);
                break;
            case "warning":
                logger.warn(message, context);
                break;
            case "error":
            default:
                logger.error(message, context);
                break;
        }
    }
}

module.exports = Service;

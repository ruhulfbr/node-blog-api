const winston = require("winston");

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
        }),
    ],
});

// eslint-disable-next-line complexity
const keepLog = (level, message, exception = null) => {
    const context = exception ? { exception } : {};

    switch (level.toLowerCase()) {
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
};

module.exports = {
    keepLog,
};

const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console()
    ]
});

const logMiddleware = (req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
};

module.exports = logMiddleware;
const config = require("../../configs/index");
const { logger } = require("../../loaders/logger");


// Function to format stack trace
const formatStackTrace = (stack) => {
    if (!stack) return null;

    // Split the stack into lines and format it
    const stackLines = stack.split('\n').map(line => line.trim());
    return stackLines.map((line, index) => {
        // You can customize this further based on your needs
        return `${index + 1}: ${line}`;
    }).join('\n');
};

const errorHandler = (err, req, res, next) => {
    // Default to a 500 status if not provided
    const statusCode = err.statusCode || err.status || 500;
    const message = err?.response?.data?.message || err?.message || 'Internal Server Error';

    // logger.error(Error: ${message}, Status Code: ${statusCode}, Stack: ${err.stack});
    logger.error(`${err.message}`, {
        stack: err.stack,
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString(),
    });

    // Send detailed error response in development mode
    if (config.env === 'development') {
        return res.status(statusCode).json({
            status: 'error',
            message,
            stack: formatStackTrace(err.stack),
        });
    }

    // if error is unauthorized, return 401
    if (err.message === 'Unauthorized') {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized',
        });
    }

    // Send a cleaner error response in production
    res.status(statusCode).json({
        status: 'error',
        message,
    });
};


module.exports = errorHandler;
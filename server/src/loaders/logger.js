const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize, errors, json } = format;
const config = require('../configs/index');
const path = require('path');
const fs = require('fs');
const DailyRotateFile = require('winston-daily-rotate-file');
const logDirectory = path.join(__dirname, config.logDir || '../../logs');
const moment = require('moment-timezone');

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

// Define a custom timestamp format with timezone
const timeZone = config.logTimezone; // Change this to your desired time zone 

const timestampWithTimeZone = format((info) => {
    info.timestamp = moment().tz(timeZone).format('YYYY-MM-DD HH:mm:ss');
    return info;
});

// Define the custom format for logging
const generalFormat = printf(({ timestamp, level, message, ...metadata }) => {
    const msg = metadata && Object.keys(metadata).length ?
        `${message} ${JSON.stringify(metadata)
        }` :
        message;
    return `${timestamp} [${level}]: ${msg}`;
});

const errorFormat = printf(({ timestamp, level, message, stack, ...metadata }) => {
    // let log = ${timestamp} [${level}]: ${message};
    let msg = metadata && Object.keys(metadata).length ?
        `${timestamp} [${level}]: ${message} ${JSON.stringify(metadata)
        }` :
        message;
    if (stack) msg += `\nStack trace: ${stack}`; // Append stack trace for errors
    return msg;
});

// Create a Winston logger
const logger = createLogger({
    level: config.logLevel, // Set default logging level
    format: combine(
        timestampWithTimeZone(), // Adds a timestamp
        json(),
        errors({ stack: true }), // Capture stack trace for error logging
    ),
    transports: [
        new DailyRotateFile({
            filename: path.join(logDirectory, 'error-%DATE%.log'),
            datePattern: 'YYYY-MM-DD', // Rotate daily
            zippedArchive: true, // Compress old logs
            maxSize: '20m', // Maximum log file size 
            maxFiles: '14d', // Keep logs for 14 days
            level: 'error', // Only error logs
            format: combine(
                timestamp(),
                errors({ stack: true }), // Capture stack trace for file logging
                json(),
                errorFormat
            ),
        }),
        new DailyRotateFile({
            filename: path.join(logDirectory, 'all-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            format: combine(
                timestamp(),
                json(),
                generalFormat
            ),
        }),
    ],
});

if (config.env !== "production") {
    logger.add(
        new transports.Console({
            format: combine(
                colorize({ all: true }),
                timestampWithTimeZone(),
                json(),
                generalFormat
            ),
        })
    );
}


// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error("Unhandled Rejection at: ", promise, { stack: reason.stack || reason });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception thrown', { stack: error.stack });
    process.exit(1); // Optionally, exit the process
});

module.exports = { logger };
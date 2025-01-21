const config = require("../configs/index");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const errorHandler = require("../api/middlewares/errorHandler.js");
const apiRouter = require("../api/routes/index.js");
const { logger } = require("./logger.js");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

module.exports = (app) => {
    // Security Middleware
    app.use(helmet());

    // Enable CORS
    const corsOptions = {
        origin: true, // Allow all origins
        credentials: true, //  for cokkies and autorization headers etc
    };
    app.use(cors(corsOptions));

    // Enable 'trust proxy' to ensure rate limiter can access the correct client IP
    app.set('trust proxy', '127.0.0.1');  // Specify the IP address of the proxy server if you are behind a proxy server like nginx or api gateway

    // Rate Limiting Middleware
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
        message: "Too many requests from this IP, please try again later.",
    });
    app.use(limiter); // Apply rate limiting to all requests    

    // Middleware Configuration
    app.use(express.json()); // parsing body of incoming requests
    app.use(express.urlencoded({ extended: true })); // parsing url encoded data
    // app.use(express.static(path.join(__dirname, "public")));

    // Log all requests
    app.use((req, res, next) => {
        const startTime = Date.now();
        const reqId = Math.floor(Math.random() * 1000000);
        req.reqId = reqId;

        logger.info(`Request: ${req.reqId} ${req.method} ${req.url}`, {
            headers: { authorization: req.headers.authorization },
            query: req.query,
            body: req.body, // Be cautious about logging sensitive information
            timestamp: new Date().toISOString() // Timestamp
        });
        res.on('finish', () => {
            const duration = Date.now() - startTime;
            // Log warnings for client errors (4xx)
            if (res.statusCode >= 400 && res.statusCode < 500) {
                logger.warn(`Response: ${req.reqId} Client error occurred. ${req.method} ${req.originalUrl} ${res.statusCode} ${res.statusCode}. `, {
                    url: req.url,
                    method: req.method,
                    duration: `${duration}ms`,
                    statusCode: res.statusCode,
                    timestamp: new Date().toISOString()
                });
            } else if (res.statusCode >= 500) {
                // Log errors for server errors (5xx)
                logger.error(`Response: ${req.reqId} Server error occurred. ${req.method} ${req.originalUrl} ${res.statusCode} ${res.statusCode}. `, {
                    url: req.url,
                    method: req.method,
                    duration: `${duration}ms`,
                    statusCode: res.statusCode,
                    timestamp: new Date().toISOString()
                });
            } else {
                // Log info for successful responses (2xx)
                logger.info(`Response: ${req.reqId} ${req.method} ${req.originalUrl} ${res.statusCode}`, {
                    url: req.url,
                    method: req.method,
                    duration: `${duration}ms`,
                    statusCode: res.statusCode,
                    timestamp: new Date().toISOString()
                });
            }
        });
        next();
    });

    // swagger docs 
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'API Documentation',
                version: '1.0.0',
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
            security: [
                {
                    bearerAuth: [],
                },
            ],
            servers: [
                {
                    url: `${config.host}`, // Adjust the base URL based on your project structure
                    description: 'Base URL',
                },
            ],
        },
        apis: ['./src/loaders/swagger.js'], // Adjust the path based on your project structure
    };

    const swaggerSpec = swaggerJsdoc(options);

    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    //API Routes
    app.use(`/${config.apiPrefix}`, apiRouter);


    // Error Handler (should be last middleware)
    app.use(errorHandler);
};
const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (process.env.NODE_ENV === "production") {
    const env = `.env.production`;
    const envFilePath = path.join(__dirname, env);
    const envFile = dotenv.config({ path: envFilePath });
    if (envFile.error) {
        throw new Error(`Failed to load.env file for ${process.env.NODE_ENV} environment: ${envFile.error}`);
    }
} else {
    const env = `../../.env.${process.env.NODE_ENV}`;
    const envFilePath = path.join(__dirname, env);
    const envFile = dotenv.config({ path: envFilePath });
    if (envFile.error) {
        throw new Error(`Failed to load.env file for ${process.env.NODE_ENV} environment: ${envFile.error}`);
    }
}

// Define a schema for validating environment variables
const envSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid("development", "production").required(),
    HOSTNAME: Joi.string().hostname().default("localhost"),
    PORT: Joi.number().default(3000),
    API_VERSIONS: Joi.string()
        .default("v1")
        .custom((value) => {
            const versionsArray = value.split(",").map(v => v.trim());
            return versionsArray;
        }),
    LOG_LEVEL: Joi.string().valid("error", "warn", "info", "http", "verbose", "debug", "silly").default("info"),
    LOG_DIR: Joi.string().default("../../logs"),
    LOG_TIMEZONE: Joi.string().default("Asia/Kolkata"),
    HOST: Joi.string().required(),
})
    .unknown()
    .required();

const { error, value: envVars } = envSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message} `);
}

module.exports = {
    env: envVars.NODE_ENV,
    hostname: envVars.HOSTNAME,
    port: envVars.PORT,
    apiPrefix: envVars.API_PREFIX,
    apiVersions: envVars.API_VERSIONS, // List of available API versions
    logLevel: envVars.LOG_LEVEL,
    isDevelopment: envVars.NODE_ENV === "development",
    isProduction: envVars.NODE_ENV === "production",
    logDir: envVars.LOG_DIR,
    logTimezone: envVars.LOG_TIMEZONE,
    host: envVars.HOST,
};
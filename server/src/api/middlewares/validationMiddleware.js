const validationSchemas = require("../schemas/validationSchemas.js");

const validationMiddleware = (schemaKey) => {
    return (req, res, next) => {
        const data = req.method === "GET" ? req.query : req.body;
        const schema = validationSchemas[schemaKey];
        if (!schema) {
            let err = new Error(`Validation schema for "${schemaKey}" not found`);
            err.status = 500;
            next(err);
        }
        const { error } = schema.validate(data);
        if (error) {
            let errorMessages = error.details.map(err => err.message.replace(/"/g, ''));
            let err = new Error(errorMessages.join(", "));
            err.status = 400;
            next(err);
        }
        next();
    };
};

module.exports = validationMiddleware;
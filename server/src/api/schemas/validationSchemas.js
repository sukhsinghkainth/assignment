const { createSchema } = require("../../utils/schemaGenerator.js");

const userValidationSchemas = {
    searchStudent: createSchema([
        { name: 'search', validations: { type: 'string', required: true, pattern: /^[A-Za-z\s]+$/ }, message: "Search Must be a Character" },
        { name: 'limit', validations: { type: 'number' } },
        { name: 'offset', validations: { type: 'number' } },
    ]),
    getStudent: createSchema([
        { name: 'rollNumber', validations: { type: 'number', required: true } },
    ]),
};

module.exports = userValidationSchemas;
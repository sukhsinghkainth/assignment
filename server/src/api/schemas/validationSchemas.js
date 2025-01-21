const { createSchema } = require("../../utils/schemaGenerator.js");

const userValidationSchemas = {
    searchStudent: createSchema([
        { name: 'search', validations: { type: 'string', required: true } },
        //  more fields here
    ]),
    //  more schemas here
};

module.exports = userValidationSchemas;
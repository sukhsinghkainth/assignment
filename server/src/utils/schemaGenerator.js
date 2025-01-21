const Joi = require("joi");

const createSchema = (fields) => {
    const schema = {};

    fields.forEach((field) => {
        const { name, validations, conditional, message } = field;
        // Initialize with Joi type
        schema[name] = Joi[validations.type](...validations.args || []);

        // Add additional validations
        if (validations.required) {
            schema[name] = schema[name].required();
        }
        if (validations.optional) {
            schema[name] = schema[name].optional();
        }
        if (validations.min) {
            schema[name] = schema[name].min(validations.min);
        }
        if (validations.max) {
            schema[name] = schema[name].max(validations.max);
        }
        if (validations.email) {
            schema[name] = schema[name].email();
        }
        if (validations.pattern) {
            // regex pattern
            schema[name] = schema[name].pattern(validations.pattern).messages({ 'string.pattern.base': message });
        }
        if (validations.custom) {
            schema[name] = schema[name].custom(validations.custom);
        }

        if (conditional) {
            const { field: conditionField, is, then, otherwise } = conditional;
            schema[name] = schema[name].when(conditionField, {
                is: is,
                then: Joi[then](),
                otherwise: Joi[otherwise](),
            });
        }
    });

    return Joi.object(schema);
};

module.exports = {
    createSchema,
};
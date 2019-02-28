const Joi = require('joi')

module.exports = {
    createValidationAdmin: request => {
        const createSchema = {
            name: Joi.string().max(500).required(),
            email: Joi.string().required(),
            password: Joi.string().max(300).required(),
            birthdate: Joi.date().required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidationAdmin: request => {
        const updateSchema = {
            name: Joi.string().max(500),
            email: Joi.string(),
            password: Joi.string().max(300),
            birthdate: Joi.date()
        }

        return Joi.validate(request, updateSchema)
    }, 
}
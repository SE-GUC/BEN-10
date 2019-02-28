const Joi = require('joi')

module.exports = {
    createValidationOrientationInvitation: request => {
        const createSchema = {
            sentto: Joi.string().max(500).required(),
            description: Joi.string().required(),
            sentBy: Joi.number().max(500).required(),
            sentAt: Joi.date().required(),
        }

        return Joi.validate(request, createSchema)
    },

    updateValidationOrientationInvitation: request => {
        const updateSchema = {
            sentto: Joi.string().max(500),
            description: Joi.string(),
            sentBy: Joi.number().max(500),
            sentAt: Joi.date(),
        }

        return Joi.validate(request, updateSchema)
    }, 
}
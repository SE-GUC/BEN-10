const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    createValidationOrientationInvitation: request => {
        const createSchema = {
            description: Joi.string().required(),
            sentAt: Joi.date().required(),
            sentToId: Joi.objectId().required(),
            sentById: Joi.objectId().required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidationOrientationInvitation: request => {
        const updateSchema = {
            description: Joi.string(),
            sentAt: Joi.date(),
            sentToId: Joi.objectId(),
            sentById: Joi.objectId()
        }

        return Joi.validate(request, updateSchema)
    }, 
}
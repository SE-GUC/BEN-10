const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    createValidationOrientationInvitation: request => {
        const createSchema = {
            sentto: Joi.string().max(500).required(),
            description: Joi.string().required(),
            sentBy: Joi.string().max(500).required(),
            sentAt: Joi.date().required(),
            senttoID: Joi.objectId().required(),
            sentByID: Joi.objectId().required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidationOrientationInvitation: request => {
        const updateSchema = {
            sentto: Joi.string().max(500),
            description: Joi.string(),
            sentBy: Joi.string().max(500),
            sentAt: Joi.date(),
            senttoID: Joi.objectId(),
            sentByID: Joi.objectId()
        }

        return Joi.validate(request, updateSchema)
    }, 
}
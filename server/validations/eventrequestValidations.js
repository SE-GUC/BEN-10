const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    createValidationEventRequest: request => {
        const createSchema = {
            description: Joi.string().required(),
            eventType: Joi.string().max(300).required(),
            eventLocation: Joi.string().required(),
            eventDate: Joi.date().required(),
            isAccepted: Joi.boolean(),
            requestorId: Joi.objectId().required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidationEventRequest: request => {
        const updateSchema = {
            description: Joi.string(),
            eventType: Joi.string().max(300),
            eventLocation: Joi.string(),
            eventDate: Joi.date(),
            isAccepted: Joi.boolean()
        }

        return Joi.validate(request, updateSchema)
    }, 
}
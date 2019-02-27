const Joi = require('joi')

module.exports = {
    createValidationEventRequest: request => {
        const createSchema = {
            requestedBy: Joi.string().max(500).required(),
            description: Joi.string().required(),
            eventType: Joi.string().max(300).required(),
            eventLocation: Joi.string().required(),
            eventDate: Joi.date().required(),
            isAccepted: Joi.boolean()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidationEventRequest: request => {
        const updateSchema = {
            requestedBy: Joi.string().max(500),
            description: Joi.string(),
            eventType: Joi.string().max(300),
            eventLocation: Joi.string(),
            eventDate: Joi.date(),
            isAccepted: Joi.boolean()
        }

        return Joi.validate(request, updateSchema)
    }, 
}
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);


module.exports = {
    createValidationEvent: Eventrequest => {
        const createSchema = {
            requestorId: Joi.objectId().required(),
            eventType: Joi.string().max(300).required(),
            eventLocation: Joi.string().required(),
            description: Joi.string().required(),
            registPrice:Joi.number().required(),
            remainingPlace:Joi.number().required(),
            topics:Joi.array().items(Joi.string()).required(),
            speaker:Joi.string().required(),
            registStartDate:  Joi.date().required(),
            registExpiryDate:Joi.date().required(),
            requestId: Joi.objectId().required(),
            eventDate: Joi.date().required(),
            bookedMembers:Joi.array().items(Joi.objectId()),
            formLink: Joi.string()
        
        }

        return Joi.validate(Eventrequest, createSchema)
    },

    updateValidationEvent: Eventrequest => {
        const updateSchema = {
            requestorId: Joi.objectId(),
            eventType: Joi.string().max(300),
            eventLocation: Joi.string(),
            description: Joi.string(),
            registPrice:Joi.number(),
            remainingPlace:Joi.number(),
            topics:Joi.array().items(Joi.string()),
            speaker:Joi.string(),
            registStartDate:  Joi.date(),
            registExpiryDate:Joi.date(),
            requestId: Joi.objectId(),
            eventDate: Joi.date(),
            bookedMembers:Joi.array().items(Joi.objectId()),
            formLink: Joi.string()
        }

        return Joi.validate(Eventrequest, updateSchema)
    }, 
}
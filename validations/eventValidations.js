const Joi = require('joi')

module.exports = {
    createValidationEvent: Eventrequest => {
        const createSchema = {
            requestedBy: Joi.string().max(500).required(),
            description: Joi.string().required(),
            eventType: Joi.string().max(300).required(),
            eventLocation: Joi.string().required(),
            eventDate: Joi.date().required(),
            registPrice:Joi.number().required(),
            remainingPlace:Joi.number().required(),
            topics:Joi.array().items(Joi.string()).required(),
            speaker:Joi.string().required(),
            feedback:Joi.array().items(Joi.string()).required(),
            regist_start_date:  Joi.date().required(),
            regist_expiry_date:Joi.date().required()    
        
        }

        return Joi.validate(Eventrequest, createSchema)
    },

    updateValidationEvent: Eventrequest => {
        const updateSchema = {
            requestedBy: Joi.string().max(500),
            description: Joi.string(),
            eventType: Joi.string().max(300),
            eventLocation: Joi.string(),
            eventDate: Joi.date(),
            registPrice:Joi.number(),
            remainingPlace:Joi.number(),
            topics:Joi.array().items(Joi.string()),
            speaker:Joi.string(),
            feedback:Joi.array().items(Joi.string()),
            regist_start_date:  Joi.date(),
            regist_expiry_date:Joi.date() 
        }

        return Joi.validate(Eventrequest, updateSchema)
    }, 
}
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    createValidationNotification: request => {
        const createSchema = {
            description: Joi.string().required(),
            notifiedPerson: Joi.objectId().required(),
            date: Joi.date().required(),
            seen: Joi.boolean().required(),
            sentById:Joi.objectId().required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidationNotification: request => {  
        const updateSchema = {
            
            seen: Joi.boolean().required()  
        }

        return Joi.validate(request, updateSchema)
    }, 
}
const Joi = require('joi')

module.exports = {
    createValidationNotification: request => {
        const createSchema = {
            description: Joi.string().required(),
            NotifiedPerson: Joi.string().max(300).required(),
            date: Joi.date().required(),
            seen: Joi.boolean().required()
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
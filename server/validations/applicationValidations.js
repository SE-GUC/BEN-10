const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    createValidation: request => {
        const createSchema = {
            applicantId: Joi.objectId().required(),
            applyingDate: Joi.date(),
            projectId:Joi.objectId()
        }

        return Joi.validate(request, createSchema)
    },


    
}
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    createValidationApplication: request => {
        const createSchema = {
            applicantId: Joi.objectId().required(),
            applyingDate: Joi.date(),
            projectId:Joi.objectId()
        }

        return Joi.validate(request, createSchema)
    },
    updateValidationApplication: request => {
        const updateSchema = {
            applicantId: Joi.objectId(),
            applyingDate: Joi.date(),
            projectId:Joi.objectId()
        }

        return Joi.validate(request, updateSchema)
    }


    
}
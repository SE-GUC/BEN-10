const Joi = require('joi')

module.exports = {
    createValidationPartner: request => {
        const createSchema = {
            name: Joi.string().min(3).max(100).required(),
            age: Joi.number().max(100).required(),
            gender: Joi.string().max(10).required(),
            email: Joi.string().max(60).required(),
            experienceLevel: Joi.string().required(),
            phoneNumber: Joi.number().required(),
            events: Joi.array().items(Joi.objectId()),
            projects: Joi.array().items(Joi.objectId()),
            partners: Joi.array().items(Joi.objectId())
        }

        return Joi.validate(request, createSchema)
    },

    updateValidationPartner: request => {
        const updateSchema = {
            name: Joi.string().min(3).max(100),
            age: Joi.number().max(100),
            gender: Joi.string().max(10),
            email: Joi.string().max(60),
            experienceLevel: Joi.string(),
            phoneNumber: Joi.number(),
            events: Joi.array().items(Joi.objectId()),
            projects: Joi.array().items(Joi.objectId()),
            partners: Joi.array().items(Joi.objectId())
        }

        return Joi.validate(request, updateSchema)
    }, 
}
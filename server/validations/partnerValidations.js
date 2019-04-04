const Joi = require('joi')

module.exports = {
    createValidationPartnerInfo: request => {
        const createSchema = {
            name: Joi.string().min(3).max(100).required(),
            age: Joi.number().max(100).required(),
            gender: Joi.string().max(10).required(),
            e_mail: Joi.string().max(60).required(),
            experience_level: Joi.string().required(),
            phone_number: Joi.number().required(),
            events: Joi.array().items(Joi.objectId()),
            projects: Joi.array().items(Joi.objectId()),
            partners: Joi.array().items(Joi.objectId())
        }

        return Joi.validate(request, createSchema)
    },

    updateValidationPartnerInfo: request => {
        const updateSchema = {
            name: Joi.string().min(3).max(100),
            age: Joi.number().max(100),
            gender: Joi.string().max(10),
            e_mail: Joi.string().max(60),
            experience_level: Joi.string(),
            phone_number: Joi.number(),
            events: Joi.array().items(Joi.objectId()),
            projects: Joi.array().items(Joi.objectId()),
            partners: Joi.array().items(Joi.objectId())
        }

        return Joi.validate(request, updateSchema)
    }, 
}
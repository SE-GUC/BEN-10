
const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            applicantName: Joi.string().required(),
            gender: Joi.string().max(100).required(),
            age: Joi.number().max(200).required(),
            email: Joi.string().max(3000).required(),
            mobile: Joi.number().max(100000000000).required(),
            applyingDate: Joi.date().required(),
            skills: Joi.string().max(500).required(),
            yearsOfExp: Joi.number().max(100).required(),
            hasJob: Joi.boolean().required(),
            activeTasks: Joi.number().max(100)
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            applicantName: Joi.string(),
            gender: Joi.string().max(100),
            age: Joi.number().max(200),
            email: Joi.string().max(3000),
            mobile: Joi.number().max(100000000000),
            applyingDate: Joi.date(),
            skills: Joi.string().max(500),
            yearsOfExp: Joi.number().max(100),
            hasJob: Joi.boolean(),
            activeTasks: Joi.number().max(100)
        }

        return Joi.validate(request, updateSchema)
    }, 
}
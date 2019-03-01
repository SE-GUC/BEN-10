const Joi = require('joi')


module.exports = {
    createValidationconsultancyagency: request => {
        const createSchema = {
            name: Joi.string().max(50).required(),
            about: Joi.string().min(30),
            telephoneNumber: Joi.number().max(12).required(),
            email: Joi.string().email().required(),
            location: Joi.string().min(10).max(50).required(),
            yearsOfExperience: Joi.number().required(),
            rating: Joi.number().positive().max(5),
            reports: Joi.array().items(joi.string()),

        }

        return Joi.validate(request, createSchema)
    },

    updateValidationconsultancyagency: request => {
        const updateSchema = {
            telephoneNumber: Joi.number().max(12),
            location: Joi.string().min(10).max(50),
            reports: Joi.array().items(joi.string()),
            yearsOfExperience: Joi.number(),
            rating: Joi.number().positive().max(5),
            email: Joi.string().email(),
            about: Joi.string().min(30),
        }

        return Joi.validate(request, updateSchema)
    }, 
}


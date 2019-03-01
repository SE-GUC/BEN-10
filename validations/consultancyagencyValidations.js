const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);


module.exports = {
    createValidationconsultancyagency: request => {
        const createSchema = {
            name: Joi.string().max(50).required(),
            about: Joi.string().min(30),
            telephoneNumber: Joi.string().max(12).required(),
            email: Joi.string().email().required(),
            location: Joi.string().min(10).max(50).required(),
            yearsOfExperience: Joi.number().required(),
            rating: Joi.number().positive().max(5),
            reports: Joi.array().items(Joi.string()),
            partners: Joi.array().items(Joi.objectId()),
            events: Joi.array().items(Joi.objectId())



        }

        return Joi.validate(request, createSchema)
    },

    updateValidationconsultancyagency: request => {
        const updateSchema = {
            name: Joi.string().max(50),
            telephoneNumber: Joi.number().max(12),
            location: Joi.string().min(10).max(50),
            reports: Joi.array().items(Joi.string()),
            yearsOfExperience: Joi.number(),
            rating: Joi.number().positive().max(5),
            email: Joi.string().email(),
            about: Joi.string().min(30),
            partners: Joi.array().items(Joi.objectId()),
            events: Joi.array().items(Joi.objectId())

        }

        return Joi.validate(request, updateSchema)
    }, 
}


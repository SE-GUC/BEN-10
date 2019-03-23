const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    createValidation: request => {
        const createSchema = {
            description: Joi.string().required(),
            company: Joi.string().max(100).required(),
            category: Joi.string().max(3000).required(),
            want_consultancy: Joi.boolean().required(),
            consultancy: Joi.string().min(3).max(100),
            posted_date: Joi.date().required(),
            assigned_member: Joi.string().max(500),
            life_cycle: Joi.string().max(100).required(),
            estimated_effort: Joi.string().max(50),
            estimated_time: Joi.string().max(50),
            experience_level_needed: Joi.string().max(100),
            required_skills_set: Joi.array().items(Joi.string()),
            final_draft: Joi.string(),
            companyID: Joi.objectId(),
            consultancyID: Joi.objectId(),
            memberID: Joi.objectId(),
            applyingCA : Joi.array().items(Joi.objectId())


        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            description: Joi.string(),
            company: Joi.string().max(100),
            category: Joi.string().max(3000),
            want_consultancy: Joi.boolean(),
            consultancy: Joi.string().min(3).max(100),
            posted_date: Joi.date(),
            assigned_member: Joi.string().max(500),
            life_cycle: Joi.string().max(100),
            estimated_effort: Joi.string().max(50),
            estimated_time: Joi.string().max(50),
            experience_level_needed: Joi.string().max(100),
            final_draft: Joi.string(),
            required_skills_set: Joi.array().items(Joi.string()),
            memberID: Joi.objectId(),
            consultancyID: Joi.objectId(),
            applyingCA : Joi.array().items(Joi.objectId())

        }

        return Joi.validate(request, updateSchema)
    }, 
}
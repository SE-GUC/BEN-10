const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    createValidation: request => {
        const createSchema = {
            description: Joi.string().required(),
            company: Joi.string().max(100).required(),
            category: Joi.string().max(3000).required(),
            wantConsultancy: Joi.boolean().required(),
            consultancy: Joi.string().min(3).max(100),
            postedDate: Joi.date().required(),
            assignedMember: Joi.string().max(500),
            lifeCycle: Joi.string().max(100).required(),
            estimatedEffort: Joi.string().max(50),
            estimatedTime: Joi.string().max(50),
            experienceLevelNeeded: Joi.string().max(100),
            requiredSkillsSet: Joi.array().items(Joi.string()),
            finalDraft: Joi.string(),
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
            wantConsultancy: Joi.boolean(),
            consultancy: Joi.string().min(3).max(100),
            postedDate: Joi.date(),
            assignedMember: Joi.string().max(500),
            lifeCycle: Joi.string().max(100),
            estimatedEffort: Joi.string().max(50),
            estimatedTime: Joi.string().max(50),
            experienceLevelNeeded: Joi.string().max(100),
            finalDraft: Joi.string(),
            requiredSkillsSet: Joi.array().items(Joi.string()),
            memberID: Joi.objectId(),
            consultancyID: Joi.objectId(),
            applyingCA : Joi.array().items(Joi.objectId()),
            submittedProjectLink:Joi.string()

        }

        return Joi.validate(request, updateSchema)
    }, 
}
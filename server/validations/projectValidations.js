const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    createValidation: request => {
        const createSchema = {
            description:Joi.string().required(),
            companyId:Joi.objectId(),
            category:Joi.string().required(),
            wantConsultancy:Joi.boolean().required(),
            consultancyId:Joi.objectId(),
            postedDate:Joi.date(),
            memberID:Joi.objectId(),
            lifeCycle: Joi.string().valid('Waiting for consultancy Agency',
                'Negotiation', 
                'Final Draft' , 
                'Approved' , 
                'Canceled',
                'Posted' ,
                'In Progress',
                'Final Review' , 
                'Finished'),
            estimatedEffort:Joi.string().valid("Easy",
                "Normal",
                "Hard",
                "Extreme"),
            estimatedTime:Joi.string(),
            experienceLevelNeeded:Joi.string().valid( 'Fundamental Awareness',
                'Novice',
                'Intermediate',
                'Advanced',
                'Expert' ),
            requiredSkillsSet:Joi.array().items(Joi.string()),
            finalDraft:Joi.string(),
            applyingCA: Joi.array().items(Joi.objectId()),
            submittedProjectLink:Joi.string(),

        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            description:Joi.string(),
            companyId:Joi.objectId(),
            category:Joi.string(),
            wantConsultancy:Joi.boolean(),
            consultancyId:Joi.objectId(),
            postedDate:Joi.date(),
            memberID:Joi.objectId(),
            lifeCycle: Joi.string().valid('Waiting for consultancy Agency',
                'Negotiation', 
                'Final Draft' , 
                'Approved' , 
                'Canceled',
                'Posted' ,
                'In Progress',
                'Final Review' , 
                'Finished'),
            estimatedEffort:Joi.string().valid('Easy',
                'Normal',
                'Hard',
                'Extreme',),
            estimatedTime:Joi.string(),
            experienceLevelNeeded:Joi.string().valid( 'Fundamental Awareness',
                'Novice',
                'Intermediate',
                'Advanced',
                'Expert' ),
            requiredSkillsSet:Joi.array().items(Joi.string()),
            finalDraft:Joi.string(),
            applyingCA: Joi.array().items(Joi.objectId()),
            submittedProjectLink:Joi.string(),

        }

        return Joi.validate(request, updateSchema)
    }, 
}
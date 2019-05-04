const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);


module.exports = {
    createValidationconsultancyagency: request => {
        const createSchema = {
            name:Joi.string().required(),
            about:Joi.string().required(),
            telephoneNumber:Joi.string().required().regex(/^[0][1-9]\d{9}$|^[1-9]\d{9}$/),
            email:Joi.string().required().regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
            password: Joi.string().min(5).max(50).required().regex(/^(?=.*\d).{4,20}$/),
            location:Joi.string().required(),
            yearsOfExperience:Joi.number().required(),
            rating:Joi.number().positive().max(5),
            reports:Joi.array().items(Joi.string()),
            partners: Joi.array().items(Joi.objectId()),
            projects: Joi.array().items(Joi.objectId()),
            events:Joi.array().items(Joi.objectId())



        }

        return Joi.validate(request, createSchema)
    },

    updateValidationconsultancyagency: request => {
        const updateSchema = {
            name:Joi.string(),
            about:Joi.string(),
            telephoneNumber:Joi.string().regex(/^[0][1-9]\d{9}$|^[1-9]\d{9}$/),
            email:Joi.string().max(100).regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
            password: Joi.string().min(5).max(50).regex(/^(?=.*\d).{4,20}$/),
            location:Joi.string(),
            yearsOfExperience:Joi.number(),
            rating: Joi.number().positive().max(5),
            reports: Joi.array().items(Joi.string()),
            partners: Joi.array().items(Joi.objectId()),
            events: Joi.array().items(Joi.objectId()),
            projects:Joi.array().items(Joi.objectId())




        }

        return Joi.validate(request, updateSchema)
    }, 
}


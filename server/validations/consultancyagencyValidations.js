const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);


module.exports = {
    createValidationconsultancyagency: request => {
        const createSchema = {
            name:Joi.string().required(),
            about:Joi.string().required(),
            telephoneNumber:Joi.string().required().regex(/^[0][1-9]\d{9}$|^[1-9]\d{9}$/),
            email:Joi.string().max(100).required().regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
            password: Joi.string().min(8).max(50).required().regex(/^(?=.*\d).{4,20}$/),
            location:Joi.string().required(),
            yearsOfExperience:Joi.number().required(),
            reports:Joi.array().items(Joi.string())
            // name: Joi.string().max(50).required(),
            // about: Joi.string().min(30),
            // telephoneNumber: Joi.string().max(12).required(),
            // email: Joi.string().email().required(),
            // location: Joi.string().max(50).required(),
            // yearsOfExperience: Joi.number().required(),
            // rating: Joi.number().positive().max(5),
            // reports: Joi.array().items(Joi.string()),
            // partners: Joi.array().items(Joi.objectId()),
            // events: Joi.array().items(Joi.objectId())



        }

        return Joi.validate(request, createSchema)
    },

    updateValidationconsultancyagency: request => {
        const updateSchema = {
            // name: Joi.string().max(50),
            // telephoneNumber: Joi.string().max(12),
            // location: Joi.string().min(10).max(50),
            // reports: Joi.array().items(Joi.string()),
            // yearsOfExperience: Joi.number(),
            // rating: Joi.number().positive().max(5),
            // email: Joi.string().email(),
            // about: Joi.string().min(30),
            // partners: Joi.array().items(Joi.objectId()),
            // events: Joi.array().items(Joi.objectId())
            name:Joi.string(),
            about:Joi.string(),
            telephoneNumber:Joi.string().regex(/^[0][1-9]\d{9}$|^[1-9]\d{9}$/),
            email:Joi.string().max(100).regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
            password: Joi.string().min(8).max(50).regex(/^(?=.*\d).{4,20}$/),
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


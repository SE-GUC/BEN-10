const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    createValidation: request => {
        const createSchema = {
            //persinal info
            fname: Joi.string().required(),
            mname: Joi.string().required(),
            lname: Joi.string().required(),
            SSN: Joi.number().required(),
            birthdate: Joi.date().required(),
            Gender: Joi.boolean().required(),
            Nationality: Joi.string().min(3).max(100).required().regex(/^([^0-9]*)$/),
            Marital_status: Joi.string().required(),
            Military_status: Joi.string().required(),
            Driving_license: Joi.string().required(),
            //location info
            Country: Joi.string().max(100).required().regex(/^([^0-9]*)$/),
            City: Joi.string().max(50).required().regex(/^([^0-9]*)$/),
            Area: Joi.string().max(50),
            PostalCode: Joi.number().max(200),
            //
            email: Joi.string().max(100).required().regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
            password: Joi.string().min(8).max(50).required().regex(/^(?=.*\d).{4,20}$/),
            Mobile_number:Joi.string().required(),
            Alternative_Mobile_number:Joi.string(),
            events: Joi.array().items(Joi.objectId()),
            projects: Joi.array().items(Joi.objectId()),
            skill_set:Joi.array().items(Joi.string())
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            //persinal info
            fname: Joi.string(),
            mname: Joi.string(),
            lname: Joi.string(),
            SSN:Joi.string(),
            birthdate: Joi.date().max(100).raw(),
            Gender: Joi.boolean(),
            Nationality: Joi.string().min(3).max(100).regex(/^([^0-9]*)$/),
            Marital_status: Joi.string(),
            Military_status: Joi.string(),
            Driving_license: Joi.boolean(),
            //location info
            Country: Joi.string().max(100).regex(/^([^0-9]*)$/),
            City: Joi.string().max(50).regex(/^([^0-9]*)$/),
            Area: Joi.string().max(50),
            PostalCode:Joi.number().max(200),
            //

            email: Joi.string().max(100).regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
            password: Joi.string().min(8).max(50).regex(/^(?=.*\d).{4,20}$/),
            Mobile_number:Joi.string(),
            Alternative_Mobile_number:Joi.string(),
            events: Joi.array().items(Joi.objectId()),
            projects: Joi.array().items(Joi.objectId()),
            skill_set: Joi.array().items(Joi.string())

        }

        return Joi.validate(request, updateSchema)
    }, 
}
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    createValidationMember: request => {
        const createSchema = {
            //persinal info
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            SSN: Joi.number().required(),
            birthDate: Joi.date().required(),
            gender: Joi.boolean().required(),
            nationality: Joi.string().min(3).max(100).required().regex(/^([^0-9]*)$/),
            maritalStatus: Joi.string().required(),
            drivingLicense: Joi.boolean().required(),
            //location info
            country: Joi.string().max(100).required().regex(/^([^0-9]*)$/),
            city: Joi.string().max(50).required().regex(/^([^0-9]*)$/),
            area: Joi.string().max(50),
            postalCode: Joi.number().max(200),
            //
            email: Joi.string().max(100).required().regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
            password: Joi.string().min(8).max(50).required().regex(/^(?=.*\d).{4,20}$/),
            mobileNumber:Joi.string().required(),
            alternativeMobileNumber:Joi.string(),
            events: Joi.array().items(Joi.objectId()),
            projects: Joi.array().items(Joi.objectId()),
            skillSet:Joi.array().items(Joi.string())
        }

        return Joi.validate(request, createSchema)
    },

    updateValidationMember: request => {
        const updateSchema = {
            //persinal info
            firstName: Joi.string(),
            lastName: Joi.string(),
            SSN:Joi.string(),
            birthDate: Joi.date(),
            gender: Joi.boolean(),
            nationality: Joi.string().min(3).max(100).regex(/^([^0-9]*)$/),
            maritalStatus: Joi.string(),
            drivingLicense: Joi.boolean(),
            //location info
            country: Joi.string().max(100).regex(/^([^0-9]*)$/),
            city: Joi.string().max(50).regex(/^([^0-9]*)$/),
            area: Joi.string().max(50),
            postalCode:Joi.number().max(200),
            //

            email: Joi.string().max(100).regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
            password: Joi.string().min(8).max(50).regex(/^(?=.*\d).{4,20}$/),
            mobileNumber:Joi.string(),
            alternativeMobileNumber:Joi.string(),
            events: Joi.array().items(Joi.objectId()),
            projects: Joi.array().items(Joi.objectId()),
            skillSet:Joi.array().items(Joi.string())



        }

        return Joi.validate(request, updateSchema)
    }, 
}
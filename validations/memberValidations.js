const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    createValidation: request => {
        const createSchema = {
            //persinal info
            firstName: Joi.string().required(),
            middleName: Joi.string().required(),
            lastName: Joi.string().required(),
            SSN: Joi.number().required(),
            birthDate: Joi.date().required(),
            Gender: Joi.boolean().required(),
            Nationality: Joi.string().min(3).max(100).required().regex(/^([^0-9]*)$/),
            maritalStatus: Joi.string().required(),
            militaryStatus: Joi.string().required(),
            drivingLicense: Joi.string().required(),
            //location info
            Country: Joi.string().max(100).required().regex(/^([^0-9]*)$/),
            City: Joi.string().max(50).required().regex(/^([^0-9]*)$/),
            Area: Joi.string().max(50),
            postalCode: Joi.number().max(200),
            //
            email: Joi.string().max(100).required().regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
            password: Joi.string().min(8).max(50).required().regex(/^(?=.*\d).{4,20}$/),
            mobileNumber:Joi.string().required(),
            alternativeMobileNumber:Joi.string(),
            events: Joi.array().items(Joi.objectId()),
            projects: Joi.array().items(Joi.objectId()),
            skillsSet:Joi.array().items(Joi.string())
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            //persinal info
            firstName: Joi.string(),
            middleName: Joi.string(),
            lastName: Joi.string(),
            SSN:Joi.string(),
            birthDate: Joi.date().max(100).raw(),
            Gender: Joi.boolean(),
            Nationality: Joi.string().min(3).max(100).regex(/^([^0-9]*)$/),
            maritalStatus: Joi.string(),
            militaryStatus: Joi.string(),
            drivingLicense: Joi.boolean(),
            //location info
            Country: Joi.string().max(100).regex(/^([^0-9]*)$/),
            City: Joi.string().max(50).regex(/^([^0-9]*)$/),
            Area: Joi.string().max(50),
            postalCode:Joi.number().max(200),
            //

            email: Joi.string().max(100).regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
            password: Joi.string().min(8).max(50).regex(/^(?=.*\d).{4,20}$/),
            mobileNumber:Joi.string(),
            alternativeMobileNumber:Joi.string(),
            events: Joi.array().items(Joi.objectId()),
            projects: Joi.array().items(Joi.objectId()),
            skillsSet:Joi.array().items(Joi.string())



        }

        return Joi.validate(request, updateSchema)
    }, 
}
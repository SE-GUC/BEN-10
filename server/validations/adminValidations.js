const Joi = require('joi')

module.exports = {
    createValidationAdmin: request => {
        const createSchema = {
            name: Joi.string().max(500).required(),
            gender: Joi.string().required(),
            nationality: Joi.string().max(300).required(),
            maritalStatus: Joi.string().max(300).required(),
            militaryStatus: Joi.string().max(300).required(),
            drivingLicense: Joi.string().max(300).required(),
            country: Joi.string().max(300).required(),
            city: Joi.string().max(300).required(),
            area: Joi.string().max(300).required(),
            postalCode: Joi.string().max(300).required(),
            mobileNumber: Joi.string().max(300).required(),
            email: Joi.string().required(),
            password: Joi.string().max(300).required(),
            birthdate: Joi.date().required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidationAdmin: request => {
        const updateSchema = {
            name: Joi.string().max(500),
            gender: Joi.string(),
            nationality: Joi.string().max(300),
            maritalStatus: Joi.string().max(300),
            militaryStatus: Joi.string().max(300),
            drivingLicense: Joi.string().max(3000),
            country: Joi.string().max(300),
            city: Joi.string().max(300),
            area: Joi.string().max(300),
            postalCode: Joi.string().max(3000),
            mobileNumber: Joi.string().max(3000),
            email: Joi.string(),
            password: Joi.string().max(300),
            birthdate: Joi.date()
        }

        return Joi.validate(request, updateSchema)
    }, 
}
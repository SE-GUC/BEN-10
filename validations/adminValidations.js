const Joi = require('joi')

module.exports = {
    createValidationAdmin: request => {
        const createSchema = {
            name: Joi.string().max(500).required(),
            gender: Joi.boolean.required(),
            nationality: Joi.string.max(300).required(),
            maritalStatus: Joi.string.max(300).required(),
            militaryStatus: Joi.string.max(300).required(),
            drivingLicense: Joi.number.max(300),
            country: Joi.string.max(300).required(),
            city: Joi.string.max(300).required(),
            area: Joi.string.max(300).required(),
            postalCode: Joi.number.max(300).required(),
            mobileNumber: Joi.number.max(300).required(),
            email: Joi.string().required(),
            password: Joi.string().max(300).required(),
            birthdate: Joi.date().required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidationAdmin: request => {
        const updateSchema = {
            name: Joi.string().max(500),
            gender: Joi.boolean,
            nationality: Joi.string.max(300),
            maritalStatus: Joi.string.max(300),
            militaryStatus: Joi.string.max(300),
            drivingLicense: Joi.number.max(300),
            country: Joi.string.max(300),
            city: Joi.string.max(300),
            area: Joi.string.max(300),
            postalCode: Joi.number.max(300),
            mobileNumber: Joi.number.max(300),
            email: Joi.string(),
            password: Joi.string().max(300),
            birthdate: Joi.date()
        }

        return Joi.validate(request, updateSchema)
    }, 
}
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const ConsultancyAgencySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    telephoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    yearsOfExperience: {
        type: Number, 
        required: true
    },
    rating: {
        type: Number,
        required: false
    }
    
})

module.exports = ConsultancyAgency = mongoose.model('Consultancy Agency', ConsultancyAgencySchema)


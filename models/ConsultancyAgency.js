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
        required: false
    },
    telephoneNumber: {
        type: String,
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
    },
    reports: {
        type: Array,
        required: false
    },
    partners: {
        type: [{ type: Schema.Types.ObjectId, ref: "PartnerInfo" }]
    },
    events: {
        type: [{ type: Schema.Types.ObjectId, ref: "Event" }]
    }
    
})

module.exports = ConsultancyAgency = mongoose.model('Consultancy Agency', ConsultancyAgencySchema)


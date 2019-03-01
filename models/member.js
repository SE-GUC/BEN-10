const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const memberSchema = new Schema({
    //personal info
    fname: {
        type: String,
        required: true
    },
    mname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    SSN : {
        type : String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    Gender: {
        type: Boolean,
        required: true
    },
    Nationality: {
        type: String, 
        required: true
    },
    Marital_status: {
        type: String, 
        required: true
    },
    Military_status: {
        type: String, 
        required: true
    },
    Driving_license: {
        type: String, 
        required: true
    }, 
    // location info
    Country: {
        type: String, 
        required: true
    },
    City: {
        type: String, 
        required: true
    },
    Area: {
        type: String, 
        required: false
    },
    PostalCode: {
        type: Number, 
        required: false
    },
    // email info
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    // contact info
    Mobile_number: {
        type: String, 
        required: true
    },
    Alternative_Mobile_number: {
        type: String, 
        required: false
    }
})

module.exports = member = mongoose.model('member', memberSchema)
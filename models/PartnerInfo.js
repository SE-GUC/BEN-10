const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const PartnerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    e_mail: {
        type: String,
        required: true
    },
    experience_level: {
        type: String,
        required: true  
    },
    phone_number: {
        type: Number,
        required: true  
    }
})

module.exports = PartnerInfo = mongoose.model('partners', PartnerSchema)
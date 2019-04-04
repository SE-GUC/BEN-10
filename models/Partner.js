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
    email: {
        type: String,
        required: true
    },
    experienceLevel: {
        type: String,
        required: true  
    },
    phoneNumber: {
        type: String,
        required: true  
    },
    events: {
        type: [{ type: Schema.Types.ObjectId, ref: "Event" }]
    },
    projects: {
        type: [{ type: Schema.Types.ObjectId, ref: "Project" }]
    },
    partners: {
        type: [{ type: Schema.Types.ObjectId, ref: "Partner" }]
    }
})

module.exports = Partner = mongoose.model('partners', PartnerSchema)
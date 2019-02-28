const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const AdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: Boolean,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
        required: true
    },
    militaryStatus: {
        type: String,
        required: true
    },
    drivingLicense: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    postalCode: {
        type: Number,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    password: {
        type: String, 
        required: true
    }
})

module.exports = Admin = mongoose.model('admins', AdminSchema)
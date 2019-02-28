const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const AdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birthdate: {
        type: date,
        required: true
    },
    password: {
        type: String, 
        required: true
    }
})

module.exports = Admin = mongoose.model('admins', AdminSchema)
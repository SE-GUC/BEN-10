const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const OrientationInvitationSchema = new Schema({
    sentto: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sentBy: {
        type: String,
        required: true
    },
    sentAt: {
        type: Date,
        required: true
    }
})
module.exports = OrientationInvitation = mongoose.model('orientation invitation', OrientationInvitationSchema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const OrientationInvitationSchema = new Schema({
    sentToID: {
        type: Schema.Types.ObjectId,ref:"Member",
        required: true
    },
    sentTo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sentByID: {
        type: Schema.Types.ObjectId,ref:"Partner",
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
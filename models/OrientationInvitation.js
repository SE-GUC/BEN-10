const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const OrientationInvitationSchema = new Schema({
    sentToId: {
        type: Schema.Types.ObjectId,ref:"Member",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sentById: {
        type: Schema.Types.ObjectId,ref:"Partner",
        required: true
    },
    sentAt: {
        type: Date,
        required: true
    }
})
module.exports = OrientationInvitation = mongoose.model('orientation invitation', OrientationInvitationSchema)
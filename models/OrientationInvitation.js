const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const OrientationInvitationSchema = new Schema({
    senttoID: {
        type: Schema.Types.ObjectId,ref:"member",
        required: true
    },
    sentto: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sentByID: {
        type: Schema.Types.ObjectId,ref:"PartnerInfo",
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
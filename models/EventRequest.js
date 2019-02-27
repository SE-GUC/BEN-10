const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const EventRequestSchema = new Schema({
    requestedBy: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        required: true
    },
    eventLocation: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date, 
        required: true
    },
    isAccepted: {
        type: Boolean,
        required: false
    }
})

module.exports = EventRequest = mongoose.model('event request', EventRequestSchema)
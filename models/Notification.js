const mongoose = require('mongoose')
const Schema = mongoose.Schema
const eventme  = require('EventRequest.js')
// Create the schema
const NotificationSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    NotifiedPerson: {
        type: String,
        required: true
    },
    date: {
        type: Date, 
        required: true
    },
    seen: {
        type: Boolean,
        required: true
    }
})
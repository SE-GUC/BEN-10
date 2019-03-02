const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const eventme  = require('EventRequest.js')
// Create the schema
const NotificationSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    Notified_member:{
        type:Schema.Types.ObjectId,ref:'member',
        required:true
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
module.exports = Notification = mongoose.model('notification', NotificationSchema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const NotificationSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    notifiedPerson:{
        type:Schema.Types.ObjectId,ref:'Member',
        required:true
    },
    date: {
        type: Date, 
        required: true
    },
    seen: {
        type: Boolean,
        required: true,
        default:false
    },
    sentById:{
        type: Schema.Types.ObjectId,
        required: true
    },

})
module.exports = Notification = mongoose.model('notification', NotificationSchema)

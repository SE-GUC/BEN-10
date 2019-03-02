const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Create the schema
const NotificationSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    NotifiedPerson:{
        type:Schema.Types.ObjectId,ref:'member',
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
    }

})
module.exports = Notification = mongoose.model('notification', NotificationSchema)

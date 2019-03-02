const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema={

    requestorId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    requestedBy:{
        type:String,
        required:true
    },
    eventType:{
        type:String,
        required:true
    },
    eventLocation:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    registPrice:{
        type: Number,
        required:true
    },
    remainingPlace:{
        type: Number,
        required:true
    },
    topics:{
        type:[String],
        required:true
    },
    speaker:{
        type:String,
        required:true
    },feedback:{
        type:[String],
        required:true
    },regist_start_date:{
        type: Date,
        required:true
    },regist_expiry_date:{
        type:Date,
        required:true
    },
    request_id:[{
        type:Schema.Types.ObjectId,ref:'EventRequest',
        required:false
    }],
    eventDate:{
        type:Date,
        required:true
    }
    


}



module.exports = Event = mongoose.model('event', EventSchema)

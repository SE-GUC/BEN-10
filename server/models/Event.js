const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema={

    requestorId: {
        type: Schema.Types.ObjectId,
        required: true
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
    },
    registStartDate:{
        type: Date,
        required:true
    },
    registExpiryDate:{
        type:Date,
        required:true
    },
    requestId:{
        type:Schema.Types.ObjectId,ref:'EventRequest',
        required:false
    },
    eventDate:{
        type:Date,
        required:true
    },
    bookedMembers: {
        type: [{ type: Schema.Types.ObjectId, ref: "Member" }]
    },
    formLink:{
        type:String,
        required:false
    }
    


}



module.exports = Event = mongoose.model('event', EventSchema)

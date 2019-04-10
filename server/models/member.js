const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const memberSchema = new Schema({
    //personal info
    fName: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    SSN : {
        type : String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    gender: {
        type: Boolean,
        required: true
    },
    nationality: {
        type: String, 
        required: true
    },
    maritalStatus: {
        type: String, 
        required: true
    },
    militaryStatus: {
        type: String, 
        required: true
    },
    drivingLicense: {
        type: String, 
        required: true
    },
    // location info
    country: {
        type: String, 
        required: true
    },
    city: {
        type: String, 
        required: true
    },
    area: {
        type: String, 
        required: false
    },
    postalCode: {
        type: Number, 
        required: false
    },
    // email info
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    // contact info
    mobileNumber: {
        type: String, 
        required: true
    },
    Alternative_Mobile_number: {
        type: String, 
        required: false
    },
    events: {
        type: [{ type: Schema.Types.ObjectId, ref: "Event" }]
    },
    projects: {
        type: [{ type: Schema.Types.ObjectId, ref: "Project" }]
    },
    skill_set:{
        type: [{ type: Schema.Types.String}],
        required:false,
        default:[]

    }
})

module.exports = member = mongoose.model('member', memberSchema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const MemberSchema = new Schema({
    //personal info
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    lastName: {
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
    Gender: {
        type: Boolean,
        required: true
    },
    Nationality: {
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
    Country: {
        type: String, 
        required: true
    },
    City: {
        type: String, 
        required: true
    },
    Area: {
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
    alternativeMobileNumber: {
        type: String, 
        required: false
    },
    events: {
        type: [{ type: Schema.Types.ObjectId, ref: "Event" }]
    },
    projects: {
        type: [{ type: Schema.Types.ObjectId, ref: "Project" }]
    },
    skillsSet:{
        type: [{ type: Schema.Types.String}],
        required:false,
        default:[]

    }
})

module.exports = Member = mongoose.model('Member', MemberSchema)
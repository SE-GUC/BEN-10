const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const memberSchema = new Schema({
    //personal info
<<<<<<< HEAD
    fName: {
        type: String,
        required: true
    },
    lname: {
=======
    firstName: {
        type: String,
        required: true
    },
    lastName: {
>>>>>>> efdfbe05cb35aafe30cd2720518e66b284815122
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
<<<<<<< HEAD
        type: String, 
        required: true
    },
    drivingLicense: {
        type: String, 
=======
        type: String,
        required: true
    },
    drivingLicense: {
        type: String,
>>>>>>> efdfbe05cb35aafe30cd2720518e66b284815122
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
    alternativeMobileNumber: {
        type: String, 
        required: false
    },
    events: {
        type: [{ type: Schema.Types.ObjectId, ref: "Event" }],
        default:[]
    },
    projects: {
        type: [{ type: Schema.Types.ObjectId, ref: "Project" }],
        default:[]
    },
    skill_set:{
        type: [{ type: Schema.Types.String}],
        required:false,
        default:[]

    }
})

module.exports = member = mongoose.model('member', memberSchema)
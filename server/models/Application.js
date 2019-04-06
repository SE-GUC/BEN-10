const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const ApplicationSchema = new Schema({
    applicantId: {
        type: Schema.Types.ObjectId,ref:"member",
        required: false
    },
    applicantName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile:{
        type:Number,
        required:true
    },
    applyingDate: {
        type: Date,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    yearsOfExp:{
        type: Number,
        required: true
    },
    hasJob:{
        type: Boolean,
        required: true
    },
    activeTasks:{
        type: Number,
        required:false
    },
    projectId: {
        type: Schema.Types.ObjectId,ref:"projects",
        required: false
    }
})

module.exports = Application = mongoose.model('applications', ApplicationSchema)
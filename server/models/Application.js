const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const ApplicationSchema = new Schema({
    applicantId: {
        type: Schema.Types.ObjectId,ref:"Member",
        required: false
    },
    applyingDate: {
        type: Date,
        required: true
    },
    projectId: {
        type: Schema.Types.ObjectId,ref:"Project",
        required: false
    }
})

module.exports = Application = mongoose.model('applications', ApplicationSchema)
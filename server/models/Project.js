const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const ProjectSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    companyId: {
        type: Schema.Types.ObjectId,ref: "Partner",
        required:false
    },
    category: {
        type: String,
        required: true
    },
    wantConsultancy: {
        type: Boolean,
        required: true
    },
    consultancyId: {
        type: Schema.Types.ObjectId,ref: "ConsultancyAgency",
        required:false
    },
    postedDate: {
        type: Date,
        required: true
    },
    memberId: {
        type: Schema.Types.ObjectId,ref: "Member",
        required:false
    },
    lifeCycle:{
        type: String,
        required: false
    },
    estimatedEffort: {
        type: String,
        required: true
    },
    estimatedTime: {
        type: String,
        required: true  
    },
    experienceLevelNeeded: {
        type: String,
        required: true  
    },
    requiredSkillsSet: {
        type: [{ type: Schema.Types.String }],
        required: true ,
        default:[]
    },
    finalDraft: {
        type: String,
        required: false
    },
    applyingCA :{
        type: [{ type: Schema.Types.ObjectId, ref: "ConsultancyAgency" }],
        required: false,
        default:[]

    },
    submittedProjectLink:{
        type:String,
        required:false
    }
})

module.exports = Project = mongoose.model('projects', ProjectSchema)

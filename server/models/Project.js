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
        required:true
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
        required: false
    },
    memberID: {
        type: Schema.Types.ObjectId,ref: "Member",
        required:false
    },
    lifeCycle:{
        type: String,
        required: false
    },
    estimatedEffort: {
        type: String,
        required: false
    },
    estimatedTime: {
        type: String,
        required: false  
    },
    experienceLevelNeeded: {
        type: String,
        required: false  
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

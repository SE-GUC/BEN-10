const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const ProjectSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    companyID: {
        type: Schema.Types.ObjectId,ref: "Partner",
        required:false
    },
    category: {
        type: String,
        required: true
    },
    want_consultancy: {
        type: Boolean,
        required: true
    },
    consultancy: {
        type: String,
        required: false
    },
    consultancyID: {
        type: Schema.Types.ObjectId,ref: "ConsultancyAgency",
        required:false
    },
    posted_date: {
        type: Date,
        required: true
    },
    assigned_member: {
        type: String,
        required: false
    },
    memberID: {
        type: Schema.Types.ObjectId,ref: "Member",
        required:false
    },
    life_cycle:{
        type: String,
        required: true
    },
    estimated_effort: {
        type: String,
        required: false
    },
    estimated_time: {
        type: String,
        required: false  
    },
    experience_level_needed: {
        type: String,
        required: false  
    },
    required_skills_set: {
        type: [{ type: Schema.Types.String }],
        required: true ,
        default:[]
    },
    final_draft: {
        type: String,
        required: false
    },
    applyingCA :{
        type: [{ type: Schema.Types.ObjectId, ref: "ConsultancyAgency" }],
        required: false,
        default:[]

    },
    submitted_project_link:{
        type:String,
        required:false
    }
})

module.exports = Project = mongoose.model('projects', ProjectSchema)

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
    posted_date: {
        type: Date,
        required: true
    },
    assigned_member: {
        type: String,
        required: false
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
        type: String,
        required: false  
    },
    final_draft: {
        type: String,
        required: false
    }
})

module.exports = Project = mongoose.model('projects', ProjectSchema)
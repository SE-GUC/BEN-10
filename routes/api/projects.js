const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Book = require('../../models/Project')
const validator = require('../../validations/projectValidations')

router.get('/', async (req,res) => {
    const projects = await Project.find()
    res.json({data: projects})
})


// Create a project
router.post('/', async (req,res) => {
   try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newProject = await Project.create(req.body)
    res.json({msg:'Project was created successfully', data: newProject})
   }
   catch(error) {
       // We will be handling the error later
       console.log(error)
   }  
})

// Update a project
router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const project = await Project.findOne({id})
     if(!project) return res.status(404).send({error: 'Project does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedProject = await Project.updateOne(req.body)
     res.json({msg: 'Project updated successfully'})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

 router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedProject = await Project.findByIdAndRemove(id)
     res.json({msg:'Project was deleted successfully', data: deletedProject})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

 

module.exports = router
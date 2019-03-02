const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const OrientationInvitation = require('../../models/OrientationInvitation')
const validator = require('../../validations/orientationinvitationValidations')
const ObjectId=require('mongodb').ObjectID;
mongoose.set('useFindAndModify',false);

router.get('/', async (req,res) => {
    const orientationinvitations = await OrientationInvitation.find()
    res.json({data: orientationinvitations})
})
router.get('/:id', async (req,res) => {
    const id = req.params.id
    const orientationinvitations = await OrientationInvitation.findById(id)
    res.json({data: orientationinvitations})
})


// Create an OrientationInvitation
router.post('/', async (req,res) => {
   try {
    const isValidated = validator.createValidationOrientationInvitation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newOrientationInvitation = await OrientationInvitation.create(req.body)
    res.json({msg:'Orientation Invitation was created successfully', data: newOrientationInvitation})
   }
   catch(error) {
       console.log(error)
       return res.status(400).send('Error')
   }  
})

// Update an OrientationInvitation
router.put('/:id', async (req,res) => {
    try {
        if(ObjectId.isValid(req.params.id)){
            const isValidated = validator.updateValidationOrientationInvitation(req.body)
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
            const updatedOrientationInvitation = await OrientationInvitation.findByIdAndUpdate({_id: req.params.id}, req.body)
            if (!updatedOrientationInvitation) return res.status(404).send({error: 'Orientation Invitation does not exists' })
            res.json({msg: 'Orientation Invitation updated successfully'})
           }
           else {
               return res.status(404).send({error: "not an Orientation Invitation id"})
           }
        }
    
    
    catch(error) {
        console.log(error)
        return res.status(404).send({error: 'Orientation Invitation does not exist'})
    }  
 })

 router.delete('/:id', async (req,res) => {
    try {
        if(ObjectId.isValid(req.params.id)){
            const id = req.params.id 
            const deletedOrientationInvitation = await OrientationInvitation.findByIdAndRemove(id)
            if (!deletedOrientationInvitation) return res.status(400).send({ error: 'Orientation Invitation does not exists' })
            res.json({msg: 'Orientation Invitation was deleted successfully', data: deletedOrientationInvitation})
           }
           else {
               return res.status(404).send({error: "not an Orientation Invitation id"})
           }
    }
    catch(error) {
        console.log(error)
        return res.status(400).send('Error')

    }  
 })

 

module.exports = router

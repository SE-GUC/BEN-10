const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const EventRequest = require('../../models/EventRequest')
const validator = require('../../validations/eventrequestValidations')

router.get('/', async (req,res) => {
    const eventrequests = await EventRequest.find()
    res.json({data: eventrequests})
})

router.get('/:id', async (req,res) => {
    const id = req.params.id
    const eventrequests = await EventRequest.findById(id)
    res.json({data: eventrequests})
})

router.post('/', async (req,res) => {
    try {
     const isValidated = validator.createValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const newEventRequest = await EventRequest.create(req.body)
     res.json({msg:'Event Request was created successfully', data: newEventRequest})
    }
    catch(error) {
        console.log(error)
        return res.status(400).send('Error')
    }
      
 })

 router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const eventrequest = await EventRequest.findById(id)
     if(!eventrequest) return res.status(404).send({error: 'Event Request does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedEventRequest = await EventRequest.updateOne(req.body)
     res.json({msg: 'Event Request updated successfully'})
    }
    catch(error) {
        console.log(error)
        return res.status(404).send({error: 'Event Request does not exist'})
    }  
 })

 router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedEventRequest = await EventRequest.findByIdAndRemove(id)
     res.json({msg:'Event Request was deleted successfully', data: deletedEventRequest})
    }
    catch(error) {
        console.log(error)
        return res.status(400).send('Error')

    }  
 })

 module.exports = router
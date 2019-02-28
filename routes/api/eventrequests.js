const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectID;
mongoose.set('useFindAndModify', false);

const EventRequest = require('../../models/EventRequest')
const validator = require('../../validations/eventrequestValidations')

router.get('/', async (req,res) => {
    const eventrequests = await EventRequest.find()
    res.json({data: eventrequests})
})

router.get('/:id', async (req,res) => {
    if(ObjectId.isValid(req.params.id)){
    const id = req.params.id
    const eventrequests = await EventRequest.findById(id)
    if (!eventrequests) return res.status(404).send({error: 'Request does not exist'})
    res.json({data: eventrequests})
    }
    else{
        return res.status(404).send({error: 'Event Request does not exist'})
    }

})

router.post('/', async (req,res) => {
    try {
     const isValidated = validator.createValidationEventRequest(req.body)
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
    try{
        if(ObjectId.isValid(req.params.id)){
        const isValidated = validator.updateValidationEventRequest(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const updatedEventRequest = await EventRequest.findByIdAndUpdate({_id: req.params.id}, req.body)
        if (!updateValidationEventRequest) return res.status(404).send({error: 'Request does not exist'})
        res.json({msg: 'Event Request updated successfully'})
        }
        else{
        return res.status(404).send({error: 'Event Request does not exist'})
        }
        
    }
    catch{
        console.log(error)
        return res.status(404).send({error: 'Event Request does not exist'})
    }

})

 router.delete('/:id', async (req,res) => {
    try {
        if(ObjectId.isValid(req.params.id)){
        const id = req.params.id
        const deletedEventRequest = await EventRequest.findByIdAndRemove(id)
        if(!deletedEventRequest) return res.status(400).send({ error: 'Request does not exist'})
        res.json({msg:'Event Request was deleted successfully', data: deletedEventRequest})
        }else{
            return res.status(404).send({error: 'Event Request does not exist'})

        }
    }
    catch(error) {
        console.log(error)
        return res.status(400).send('Error')

    }  
 })

 module.exports = router
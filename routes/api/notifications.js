const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectID;
mongoose.set('useFindAndModify', false);

const notification = require('../../models/Notification')
const validator = require('../../validations/notificationsValidation')



router.get('/', async (req,res) => {
    const myNotifications = await notification.find()
    res.json({data: myNotifications})
})

router.get('/:id', async (req,res) => {
    if(ObjectId.isValid(req.params.id)){
    const id = req.params.id
    const myNotifications = await notification.findById(id)
    if (!myNotifications) return res.status(404).send({error: 'Notification not found !'})
    res.json({data: myNotifications})
    }
    else{
        return res.status(404).send({error: 'Notification not found !'})
    }

})



router.post('/', async (req,res) => {
    try {
     const isValidated = validator.createValidationNotification(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const newNotification = await notification.create(req.body)
     res.json({msg:'Notification was created successfully !', data: newNotification})
    }
    catch(error) {
        console.log(error)
        return res.status(400).send('Error')
    }
      
 })


 router.put('/:id', async (req,res) => {
    try{
        if(ObjectId.isValid(req.params.id)){
        const isValidated = validator.updateValidationNotification(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const updatedNotification = await notification.findByIdAndUpdate({_id: req.params.id}, req.body)
        if (!updatedNotification) return res.status(404).send({error: 'Notification not found !'})
        res.json({msg: 'Notification updated successfully'})
        }
        else{
        return res.status(404).send({error: 'Notification not found !'})
        }
        
    }
    catch{
        console.log(error)
        return res.status(404).send({error: 'Notification not found !'})
    }

})

router.delete('/:id', async (req,res) => {
    try {
        if(ObjectId.isValid(req.params.id)){
        const id = req.params.id
        const deletedNotification = await notification.findByIdAndRemove(id)
        if(!deletedNotification) return res.status(400).send({ error: 'Notification not found !'})
        res.json({msg:'Notification was deleted successfully', data: deletedNotification})
        }else{
            return res.status(404).send({error: 'Notification not found !'})

        }
    }
    catch(error) {
        console.log(error)
        return res.status(400).send('Error')

    }  
 })
 module.exports = router
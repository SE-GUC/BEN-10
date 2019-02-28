const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const PartnerInfo = require('../../models/PartnerInfo')
const validator = require('../../validations/partnerValidations')

router.get('/', async (req,res) => {
    const partners = await PartnerInfo.find()
    res.json({data: partners})
})

router.get('/:id', async (req,res) => {
    const id = req.params.id
    const partners = await PartnerInfo.findById(id)
    res.json({data: partners})
})

router.post('/', async (req,res) => {
    try {
     const isValidated = validator.createValidationPartnerInfo(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const newPartnerInfo = await PartnerInfo.create(req.body)
     res.json({msg:'Partner was created successfully', data: newPartnerInfo})
    }
    catch(error) {
        console.log(error)
        return res.status(400).send('Error')
    }
      
 })

 router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const partners = await PartnerInfo.findById(id)
     if(!partners) return res.status(404).send({error: 'Partner does not exist'})
     const isValidated = validator.updateValidationPartnerInfo(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedPartnerInfo = await PartnerInfo.updateOne(req.body)
     res.json({msg: 'Partner updated successfully'})
    }
    catch(error) {
        console.log(error)
        return res.status(404).send({error: 'Partner does not exist'})
    }  
 })


router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedPartnerInfo = await PartnerInfo.findByIdAndRemove(id)
     res.json({msg:'Partner was deleted successfully', data: deletedPartnerInfo})
    }
    catch(error) {
        console.log(error)
        return res.status(400).send('Error')

    }  
 })

 

module.exports = router
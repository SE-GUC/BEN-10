const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
//FETCH REQUIERMENTS
const fetch = require('node-fetch');
const server = require('../../config/config');
const PartnerInfo = require('../../models/PartnerInfo')
const validator = require('../../validations/partnerValidations')
const ObjectId = require('mongodb').ObjectID;
mongoose.set('useFindAndModify', false);

router.get('/', async (req,res) => {
    const partners = await PartnerInfo.find()
    res.json({data: partners})
})

router.get('/:id', async (req,res) => {
    const id = req.params.id
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        // it's an ObjectID    
    
    const partners = await PartnerInfo.findById(id)
    if(partners){
      return res.json({data: partners})
    }else{
        return res.json({msg:"it doesn't exist"});
    }
}
 else{
    return res.status(400).json({msg:`a partner  with id ${id} not found`});}
    
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
     if(ObjectId.isValid(req.params.id)){
     const isValidated = validator.updateValidationPartnerInfo(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedPartner = await PartnerInfo.findByIdAndUpdate({_id: req.params.id}, req.body)
     if (!updatedPartner) return res.status(404).send({error: 'Partner does not exists' })
     res.json({msg: 'Partner updated successfully'})
    }
    else {
        return res.status(404).send({error: "not a Partner id"})
    }
    }
    catch(error) {
        console.log(error)
        return res.status(404).send({error: 'Partner does not exist'})
    }  
 })


router.delete('/:id', async (req,res) => {
    try {
        if(ObjectId.isValid(req.params.id)){
        const id = req.params.id 
        const deletedPartner = await PartnerInfo.findByIdAndRemove(id)
        if (!deletedPartner) return res.status(400).send({ error: 'Partner does not exists' })
        res.json({msg: 'Partner was deleted successfully', data: deletedPartner})
       }
       else {
           return res.status(404).send({error: 'not a Partner id'})
       }
    }
    catch(error) {
        console.log(error)
        return res.status(400).send('Error')

    }  
 })


 //1.0 as a partner i want to submit a description on a task
async function addDescription(id,decription){
    const url  = `${server}/api/projects/${id}`;
    await fetch(url, {
                      method:'put',
                      body : JSON.stringify({description : decription}),
                      headers: { 'Content-Type': 'application/json' }
                      })
                .then(res =>{  console.log(res.status)  
                               return res.json()}
                     )
                .then(json =>{ console.log(json)})
                .catch(err =>{ console.log(err)})
}

// 1.1 as a partner i want to assign a consultancy agency to a project 


//1.2 as a partner i want to approve / disapprove a final draft 
async function DecideOnProject(id,decision){
    const url  = `${server}/api/projects/${id}`;
    await fetch(url, {
                      method:'put',
                      body : JSON.stringify({life_cycle : decision}),
                      headers: { 'Content-Type': 'application/json' }
                      })
                .then(res =>{  console.log(res.status)  
                               return res.json()}
                     )
                .then(json =>{ console.log(json)})
                .catch(err =>{ console.log(err)})
}


//Test 1.0
postProject('5c7a795e53f1ba0c1b351f75', 'adding a description here to the project' );
//Test 1.3
decideEventRequest('5c7a4b2df59c3f032eb6b2dc','approved');
 
module.exports = router
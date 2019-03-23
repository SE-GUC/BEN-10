const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const fetch = require("node-fetch")
const server = require('../../config/config');
const Project = require('../../models/Project')
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
 router.post('/:id/eventrequests/',async (req,res) => {
    if(ObjectId.isValid(req.params.id)){
        const pid=await PartnerInfo.findById(req.params.id);
        if(pid){
            if(req.body.requestedBy!=null && req.body.description!=null&&req.body.eventType!=null &&
               req.body.eventLocation!=null && req.body.eventDate!=null){    
        
                const j = await PartnerRequestEvent(req.body.requestedBy, req.body.description, 
                                               req.body.eventType, req.body.eventLocation, req.body.eventDate);
                res.status(200).send(j)
                
            }else{
                return res.status(400).send({ error: "body is missing attrubites" })
            }
        }
        else
            return res.status(404).send({error: 'Partner does not exist'})
    }else
        return res.status(404).send({error: 'Partner does not exist'})
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
 async function deleteProject(id){
    var error = true;
    var result;
    const p = await Project.findById(id)
    if(p.lifecycle === 'Not Posted'){
 
    await fetch(`${server}/api/projects/${id}`, {
            method: 'delete',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            if(res.status === 200){
                error = false;
            }
            console.log(res.status)
            if(!error){
                result = res
            }
            return res.json()
        })

        .catch((err) => console.log("Error",err));
        
 }else{
     console.log('fssss')
 }
}
 async function editProject(id,description,company,companyID,category,want_consultancy,posted_date,life_cycle){
    const body = { 
        description:description,
        company: company,
        companyID: companyID,
        category: category,
        want_consultancy: want_consultancy,
        posted_date: posted_date,
        life_cycle: life_cycle
     };
    var error = true;
    const pr = await Project.findById(id)
    if(pr.lifecycle === 'Not Posted'){
 
    await fetch(`${server}/api/projects/${id}`, {
            method: 'put',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        })
         
        .then(res => {
            if(res.status === 200){
                error = false;
            }
            console.log(res.status)
            if(!error){
                result = res
            }
            return res.json()
        })

        .catch((err) => console.log("Error",err));
        
 }else{
     console.log('bla')
 }
}
 
 async function PartnerRequestEvent(requestedBy, description, eventType, eventLocation, eventDate){
    const body = { 
        requestedBy:requestedBy,
        description: description,
        eventType: eventType,
        eventLocation: eventLocation,
        eventDate: eventDate,
        isAccepted: "false"
     };
    var error = true;
    var j;
    await fetch(`${server}/api/eventrequests/`, {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => {
        if(res.status === 200){
            error = false;
        }
        return res.json()
    })
    .then(json => {
        if(!error){
            json = { msg: 'Event is requested successfully'}
        }
        j = json;
    })
    .catch((err) => console.log("Error",err));
    return j;
}

 // test 1.3 delete

 PartnerRequestEvent('aaa','bbb','ccc','cairo','10/10/2000')

 

module.exports = router
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const fetch = require("node-fetch");
const server = require("../../config/config");

const partners = require('../../models/PartnerInfo')
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

 
 //1.5 As a partner I want to review the final work of the candidate who is working on my task/project.

 router.get("/:id/ShowFinalDraft", async (req, res) => {
    const id = req.params.id;

    if(ObjectId.isValid(id))
    {   
        
        const partner= await PartnerInfo.findById(id);
        
        if(partner){
        const j = await getProjects(id);
        res.json({data:j});}

        else{
            return res.status(404).send({ error: "partner not found" })
        }
    }else {
        return res.status(404).send({ error: "ID not found" })
}
  });

 async function getProjects(partnerid) {
    var result = [];
    await fetch(`${server}/api/projects`)
      .then(res => res.json())
      .then(json => {
        const projects = json.data;
        const hisProjects = projects.filter(m => m.companyID === partnerid && m.life_cycle==="Final Review");
        result =hisProjects;
        return hisProjects;
      })
      .catch(err => console.log("Error", err));
    return result;
  }

//test 1.5

module.exports = router

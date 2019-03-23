const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectID;
const fetch = require("node-fetch")
const server = require('../../config/config');
mongoose.set('useFindAndModify', false);

const ConsultancyAgency = require('../../models/ConsultancyAgency')
const validator = require('../../validations/consultancyagencyValidations')

router.get('/', async (req,res) => {
    const consultancyAgency = await ConsultancyAgency.find()
    res.json({data: consultancyAgency})
})

router.get('/:id', async (req,res) => {
    if(ObjectId.isValid(req.params.id)){
    const id = req.params.id
    const consultancyagencys = await ConsultancyAgency.findById(id)
    if (!consultancyagencys) return res.status(404).send({error: 'Consultancy Agency not exist'})
    res.json({data: consultancyagencys})
    }
    else{
        return res.status(404).send({error: 'Consultancy Agency does not exist'})
    }

})

router.post('/', async (req,res) => {
    try {
     const isValidated = validator.createValidationconsultancyagency(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const newConsultancyAgency = await ConsultancyAgency.create(req.body)
     res.json({msg:'Consultancy Agency was created successfully', data: newConsultancyAgency})
    }
    catch(error) {
        console.log(error)
        return res.status(400).send('Error')
    }
      
 })


 router.put('/:id', async (req,res) => {
    try{
        if(ObjectId.isValid(req.params.id)){
        const isValidated = validator.updateValidationconsultancyagency(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const updatedconsultancyagency = await ConsultancyAgency.findByIdAndUpdate({_id: req.params.id}, req.body)
        if (!updatedconsultancyagency) return res.status(404).send({error: 'Consultancy Agency does not exist'})
        res.json({msg: 'Consultancy Agency updated successfully'})
        }
        else{
        return res.status(404).send({error: 'Consultancy Agency does not exist'})
        }
        
    }
    catch{
        console.log(error)
        return res.status(404).send({error: 'Consultancy Agency does not exist'})
    }

})

 
router.delete('/:id', async (req,res) => {
    try {
        if(ObjectId.isValid(req.params.id)){
        const id = req.params.id
        const deletedConsultancyAgency= await ConsultancyAgency.findByIdAndRemove(id)
        if(!deletedConsultancyAgency) return res.status(400).send({ error: 'Consultancy Agency does not exist'})
        res.json({msg:'Consultancy Agency was deleted successfully', data: deletedConsultancyAgency})
        }else{
            return res.status(404).send({error: 'Consultancy Agency does not exist'})

        }
    }
    catch(error) {
        console.log(error)
        return res.status(400).send('Error')

    }  
 })
 router.put('/:id/myprojects/:pid/finaldraft/approve', async (req,res)=>{
    try {
        if(ObjectId.isValid(req.params.id)&&ObjectId.isValid(req.params.pid))
        {
            const decision="approved"
            const j = await ApproveProject(req.params.pid,decision)
            res.status(200).send(j)
        }
        else {
            return res.status(404).send({ error: "ID NOT FOUND" })
        }
    }
    catch(error){
        console.log(error)
        return res.status(404).send({ error: "not a project id" })
    }    
  })
  async function ApproveProject(id,decision){
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
  // part 2 as a CA i want to disapprove 
  router.put('/:id/myprojects/:pid/finaldraft/disapprove', async (req,res)=>{
    try {
        if(ObjectId.isValid(req.params.id)&&ObjectId.isValid(req.params.pid))
        {
            const decision="disapproved"
            const j = await disapproveProject(req.params.pid,decision)
            res.status(200).send(j)
        }
        else {
            return res.status(404).send({ error: "ID NOT FOUND" })
        }
    }
    catch(error){
        console.log(error)
        return res.status(404).send({ error: "not a project id" })
    }    
  })
  async function disapproveProject(id,decision){
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
 module.exports = router

// test approve
 //ApproveProject('5c955ea2ea7dd51a0c16c38e','Posted')

 //test diapprove
 //disapproveProject('5c955ea2ea7dd51a0c16c38e','Not Posted')
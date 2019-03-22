const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectID;
mongoose.set('useFindAndModify', false);

const fetch = require('node-fetch');
const server = require('../../config/config');

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

//2.4 --As a consultancy agency I want to request to organize an event.
router.post('/:id/eventrequests/',async (req,res) => {
    if(ObjectId.isValid(req.params.id)){
        const cid=await ConsultancyAgency.findById(req.params.id);
        if(cid){
            if(req.body.requestedBy!=null && req.body.description!=null&&req.body.eventType!=null &&
            req.body.eventLocation!=null && req.body.eventDate!=null){    
        
                const j = await CARequestEvent(req.params.id, req.body.requestedBy, req.body.description, 
                                            req.body.eventType, req.body.eventLocation, req.body.eventDate);
                res.status(200).send(j)
                
            }else{
                return res.status(400).send({ error: "body is missing attrubites" })
            }
        }
        else
            return res.status(404).send({error: 'Consultancy Agency does not exist'})
    }else
        return res.status(404).send({error: 'Consultancy Agency does not exist'})
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

 //2.4 --As a consultancy agency I want to request to organize an event.
 async function CARequestEvent(requestorId, requestedBy, description, eventType, eventLocation, eventDate){
    const body = { 
        requestorId:requestorId,
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

//test 2.4
//CARequestEvent('5c79260b4328ab820437835c','shjhjk','sdccv','sx','sc','1/1/2020');

 module.exports = router
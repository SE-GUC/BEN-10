const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectID;
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

 // 2.1 As a consultancy agency i want to apply for task/project 
router.put("\:id\caApplyProject\:pid",async(req,res)=>{
    if(ObjectId.isValid(req.params.caID) && ObjectId.isValid(req.params.pID)){
        const ca= await ConsultancyAgency.findById(req.params.caID);
        const project= await Project.findById(req.params.pID);
        if (ca&& project){
            const applying= project.applyingCA;
            applying.push(req.params.caID);
            const j = await caApplyProject(req.params.pID,applying);
            res.status(200).send(j);
        }
        else
            return res.status(404).send({error: 'invalid inputs'})
    }else{
        return res.status(404).send({error: 'invalid inputs'})
    }

})
async function caApplyProject(pID,applying){

    var error = true;
    const body = { applyingCA: applying};
    var j;
    await fetch(`${server}/api/project/${pID}`, {
            method: 'put',
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
            json = { msg: 'Consultancy agent applied successfully'}
        }
        j = json;
    })
    .catch((err) => console.log("Error",err));
    return j;
}
 module.exports = router
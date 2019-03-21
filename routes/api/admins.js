const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
//FETCH REQUIERMENTS
const fetch = require('node-fetch');
const server = require('../../config/config');

const Admin = require('../../models/Admin')
const validator = require('../../validations/adminValidations')
const notificationValidator = require('../../validations/memberValidations')

const ObjectId = require('mongodb').ObjectID;
mongoose.set('useFindAndModify',false);

router.get('/', async (req,res) => {
    const admins = await Admin.find()
    res.json({data: admins})
})

router.get('/:id', async (req,res) => {
    const id = req.params.id
    const admins = await Admin.findById(id)
    res.json({data: admins})
})

// Create an admin
router.post('/', async (req,res) => {
   try {
    const isValidated = validator.createValidationAdmin(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newAdmin = await Admin.create(req.body)
    res.json({msg:'Admin was created successfully', data: newAdmin})
   }
   catch(error) {
       
       console.log(error)
       return res.status(400).send('Error')
   }  
})


router.put('/:id', async (req,res) => {
    try {
        if(ObjectId.isValid(req.params.id))
        {const updatedAdmin = await Admin.findByIdAndUpdate({_id: req.params.id}, req.body)
        if (!updatedAdmin) return res.status(404).send({ error: "Admin does not exist"})
        res.json({msg: 'Admin updated successfully'})
        }
        else {
            return res.status(404).send({ error: "Not an admin id"})
        }
    }
    catch(error) {
        
        console.log(error)
        return res.status(404).send({error: 'Admin does not exist'})
    }  
 })

 router.delete('/:id', async (req,res) => {
    try {
        if(ObjectId.isValid(req.params.id)){
         const id = req.params.id
         const deletedAdmin = await Admin.findByIdAndRemove(id)
         if(!deletedAdmin) return res.status(404).send({error: 'Admin does not exist'})
        res.json({msg:'Admin was deleted successfully', data: deletedAdmin})
        }else {
            return res.status(404).send({error: 'Admin does not exist'})
        }
    }
    catch(error) {
       
        console.log(error)
        return res.status(400).send('Error')
    }  
 })


 //3.2 --As an admin I want to send a final draft of the task/project so that the partner can approve posting it.
 async function sendFinalDraft(projectID, draft){
     const body = {
         life_cycle: "Waiting for draft approval",
         final_draft: draft
     }
     var error = true;
     await fetch(`${server}/api/projects/${projectID}`, {
        method: 'put',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => {
        if(res.status === 200){
            error = false;
        }
        console.log(res.status)
        return res.json()
    })
    .then(json => {
        if(!error){
            json = { msg: 'Final draft sent to partner successfully'}
        }
        console.log(json)
        
    })
    .catch((err) => console.log("Error",err));

 }

 //3.3 --As an admin I want to post the task/project to the website so that candidates can apply for it.
 async function postProject(id){
    const body = { life_cycle: "Posted" };
    var error = true;
    var result;
 
    await fetch(`${server}/api/projects/${id}`, {
            method: 'put',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        // .then(checkStatus)
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
        .then(json => {
            if(!error){
                json = { msg: 'Project is posted successfully'}
            }
            console.log(json)
            
        })
        .catch((err) => console.log("Error",err));
        
 }
 //Test 3.2
 sendFinalDraft('5c93e6b3c362c56245ec9da0','TESTING DRAFT')
 //Test 3.3
 postProject('5c7a795e53f1ba0c1b351f75');
 module.exports = router
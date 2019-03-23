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
 router.put('/:id/myProjects/:pid/sendDraft', async (req,res)=>{
    try {
        if(ObjectId.isValid(req.params.id)&&ObjectId.isValid(req.params.pid))
        {
            if(req.body.final_draft != null){           
            const j = await sendFinalDraft(req.params.pid,req.body.final_draft)
            res.status(200).send(j)
            }
            else{
                return res.status(400).send({ error: "Please insert thr final" })
            }
        }
        else {
            return res.status(404).send({ error: "ID NOT FOUND" })
        }
    }
    catch{
        console.log(error)
        return res.status(404).send({ error: "not a project id" })
    }    
 })

 async function sendFinalDraft(projectID, draft){
     const body = {
         life_cycle: "Final Draft",
         final_draft: draft
     }
     var error = true;
     var j;
     await fetch(`${server}/api/projects/${projectID}`, {
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
            json = { msg: 'Final draft sent to partner successfully'}
        }
        j = json
        
    })
    .catch((err) => {
        console.log("Error",err);
        j = ({ msg: 'Error'})
    })
    
    return j

 }

 //3.3 --As an admin I want to post the task/project to the website so that candidates can apply for it.
 router.put('/:id/postProject/:pid', async (req,res)=>{
    try {
        if(ObjectId.isValid(req.params.id)&&ObjectId.isValid(req.params.pid))
        {
            const j = await postProject(req.params.pid)
            res.status(200).send(j)
        }
        else {
            return res.status(404).send({ error: "ID NOT FOUND" })
        }
    }
    catch{
        console.log(error)
        return res.status(404).send({ error: "not a project id" })
    }    
 })


 async function postProject(id){
    const body = { life_cycle: "Posted" };
    var error = true;
    var j;
 
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
            
            return res.json()
        })
        .then(json => {
            if(!error){
                json = { msg: 'Project is posted successfully'}
            }
            j = json            
        })
        .catch((err) => {
            console.log("Error",err)
            j = ({ msg: 'Error'})
    });

        return j
        
 }

 module.exports = router

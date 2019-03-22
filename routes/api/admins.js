const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const fetch = require('node-fetch');
const server = require('../../config/config');

const Admin = require('../../models/Admin')
const member = require('../../models/member')
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

//3 --As an admin I want to further check the description of a task/project so that it will be posted for candidates to apply.
router.get('/:id/pdescription', async (req,res) => {
    if(ObjectId.isValid(req.params.id)){
        const projects = await Project.findById(req.params.id)
        if (projects){
            res.json(projects.description)
        }
        else{
            return res.status(404).send({error: 'Project does not exist'})
        }
    }else
        return res.status(404).send({error: 'Project does not exist'})
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

//3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project 
router.post('/:id/notifications/',async (req,res) => {
    if(ObjectId.isValid(req.params.id)){
        const cid=await member.findById(req.params.id);
        if(cid){
            if(req.body.description != null){           
                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();    
                const j = await AdminNotifyAcceptedCandidate(req.body.description, req.params.id, date)
                res.status(200).send(j)
                }
            else{
                return res.status(400).send({ error: "\"description\" is required" })
            }
        }
        else
            return res.status(404).send({error: 'Member does not exist'})
    }else
        return res.status(404).send({error: 'Member does not exist'})
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

 //3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project 
async function AdminNotifyAcceptedCandidate(description, NotifiedPerson, date){
    const body = { 
        description: description,
        NotifiedPerson: NotifiedPerson,
        date: date,
        seen: "false"
    };
    var error = true;
    var j;
    await fetch(`${server}/api/notifications/`, {
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
            json = { msg: 'Notifications is sent successfully'}
        }
        j = json;
    })
    .catch((err) => console.log("Error",err));

    return j;
}

//Test 3.5
//AdminNotifyAcceptedCandidate('shjk','5c93d983f3fe6358b41ccd7a', '1/1/2020');

 module.exports = router
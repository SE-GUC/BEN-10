const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


//FETCH REQUIERMENTS
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
router.get('/pdescription/:id/', async (req,res) => {
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
router.post('/notifications/:id/',async (req,res) => {
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
 // 3.1 As an admin i want to identify a task/project  with a set of attributes so that it defines it
 router.put("/:id/assignAttributes/:pid",async(req,res)=>{
     if(ObjectId.isValid(req.params.id)&& ObjectId.isValid(req.params.pid)){
         const admin = await Admin.findById(req.params.id);
         const project= await Project.findById(req.params.pid);
         if (admin && project){
            const j = await assignAttributes(req.params.pid,req.body);
            res.status(200).send(j);
        }
        else
            return res.status(404).send({error: 'invalid inputs'})
    }else{
        return res.status(404).send({error: 'invalid inputs'})
     }
 })
 async function assignAttributes(pid,body){

    var error = true;
    var j;
    await fetch(`${server}/api/projects/${pid}`, {
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
            json = { msg: 'Attributes identified successfully'}
        }
        j = json;
    })
    .catch((err) => console.log("Error",err));
    return j;
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

 router.post('/:id/addEvent/', async (req,res) => {
    try {
        if(ObjectId.isValid(req.params.id))
        {
            const j = await addEvent(req.body)
            res.status(200).send(j)
        }
        else {
            return res.status(404).send({ error: "Error" })
        }
    }
    catch(error) {
        console.log(error)
        return res.status(400).send('Error')
    }
      
 })
 async function addEvent(body){
    var error = true;
    var result;
 
    await fetch(`${server}/api/events/`, {
            method: 'post',
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
                json = { msg: 'Event is posted successfully'}
            }
            result = json
            console.log(json)
            
        })
        .catch((err) => console.log("Error",err));
        return result
        
 }
 module.exports = router

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

 module.exports = router

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const member = require('../../models/member')
const fetch = require('node-fetch');
const validator = require('../../validations/memberValidations')
const notificationValidator = require('../../validations/notificationsValidation')
const server = require('../../config/config');
var ObjectId = require('mongodb').ObjectID;

// GET method to retrieve all members
router.get('/', async (req,res) => {
    const members = await member.find() ;   
    res.json({data: members})

})


// as a member i want to view my projects 


// GET method to retirve a member by his id
router.get('/:id', async (req,res) => {
    const id = req.params.id
    try{
        if(id.match(/^[0-9a-fA-F]{24}$/)){
        const mem = await member.findById(id)
        res.json({data: mem})
        }
     }catch{
        //console.log('Invalid Object id');
        return res.status(400).send({error:"the provided id is not valid one "})
     }
   
})


// view my notifications

router.get('/:id/notifications',async (req,res) => {
    const id = req.params.id;
    // res.redirect('/api/notifications/?Member_id='+id);
    if(ObjectId.isValid(id)){
    var error = true;
    await fetch(`${server}/api/notifications`, {
       method: 'get',
       headers: { 'Content-Type': 'application/json' },
   })
   .then(res => {
       if(res.status === 200){
           error = false;
       }
       return res.json()
   })
   .then(json => {
      
    const mynotification=json.data;
    const notif=mynotification.filter(mynotification => mynotification.NotifiedPerson===id)
    res.json({data:notif})

   })
   .catch((err) => console.log("Error",err));
}
else{
    return res.status(404).send({ error: "Not a member id"})
}

}

)


// i want to be able to apply for a task or a project
router.post('/:id1/projects/:id2',async (req,res) => {
    const project_id=req.params.id2;
    const member_id=req.params.id1;
    if(project_id.match(/^[0-9a-fA-F]{24}$/)&&member_id.match(/^[0-9a-fA-F]{24}$/)){
    var active_task=req.body.activeTasks;
    if(typeof active_task === "undefined")
          active_task=0;

    const application = { 
        applicantId:member_id,
        applicantName:req.body.applicantName,
        gender:req.body.gender,
        age:req.body.age,
        email:req.body.email,
        mobile:req.body.mobile,
        applyingDate:req.body.applyingDate,
        skills:req.body.skills,
        yearsOfExp:req.body.yearsOfExp,
        hasJob:req.body.hasJob,
        activeTasks:active_task,
        projectId:project_id
    };
    var error = true;
    await fetch(`${server}/api/applications`, {
        method: 'post',
        body:    JSON.stringify(application),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res =>res.json())
    .then(json =>res.json(json))
    .catch((err) => console.log("Error",err));
}else{
    return res.status(404).send({ error: "Not a valid id format"})
}

})


//POST method to create a new member
router.post('/', async (req,res) => {
    try {
     const isValidated = validator.createValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const newMember = await member.create(req.body)
     res.json({msg:'member was created successfully', data: newMember})
    }
    catch(error) {
        // error is to be handled  later
        console.log(error)
    }
 })


// PUT method to update a member
router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     try{
        (id.match(/^[0-9a-fA-F]{24}$/))
        const mem = await member.findById(id)
       // res.json({data: mem})
     }catch{
        //console.log('Invalid Object id');
        return res.status(400).send({error:"the provided id is not valid one "})
     }
     const mem = await member.findByIdAndUpdate({_id:req.params.id},req.body)
     if(!mem) return res.status(404).send({error: 'member is not found'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })

     res.json({msg: 'member updated successfully'})
    }
    catch(error) {
        // error is to be handled later
        console.log(error)
    }
 })


// DELETE method to delete a member
router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
        if
           (!id.match(/^[0-9a-fA-F]{24}$/)){
           return res.status(400).send({error:"the provided id is not valid one "})
        }
    
        //---
        const deletedmember = await member.findByIdAndRemove(id)
        if(!deletedmember) return res.status(404).send({error: 'member is not found'})
        res.json({msg:'member was deleted successfully', data: deletedmember})
    }
    catch(error) {
        // error is to be handled later
        console.log(error)
    }
 })



 module.exports = router

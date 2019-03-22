const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectID;
const fetch = require('node-fetch');
const server = require('../../config/config');

const Event = require('../../models/Event')
const member = require('../../models/member')

const validator = require('../../validations/memberValidations')
const notificationValidator = require('../../validations/notificationsValidation')
// GET method to retrieve all members
router.get('/', async (req,res) => {
    const members = await member.find()
    res.json({data: members})
})

// GET method to retirve a member by his id
router.get('/:id', async (req,res) => {
    const id = req.params.id
    try{
        (id.match(/^[0-9a-fA-F]{24}$/))
        const mem = await member.findById(id)
        res.json({data: mem})
     }catch{
        //console.log('Invalid Object id');
        return res.status(400).send({error:"the provided id is not valid one "})
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

//4.9 --As a candidate I want that the events I attended be added on my profile.
router.put('/:id1/events/:id2',async (req,res) => {
    if(ObjectId.isValid(req.params.id1) && ObjectId.isValid(req.params.id2)){
        const mem = await member.findById(req.params.id1);
        const event = await Event.findById(req.params.id2);
        if (mem && event){
            const events = mem.events;
            events.push(req.params.id2);
            const j = await postevent(req.params.id1,events);
            res.status(200).send(j);
        }
        else
            return res.status(404).send({error: 'invalid inputs'})
    }else{
        return res.status(404).send({error: 'invalid inputs'})
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

 //4.9 --As a candidate I want that the events I attended be added on my profile.
 async function postevent(cid,events){

    var error = true;
    const body = { events: events };
    var j;
    await fetch(`${server}/api/member/${cid}`, {
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
            json = { msg: 'event is added successfully'}
        }
        j = json;
    })
    .catch((err) => console.log("Error",err));
    return j;
}

//Test 4.9
//postevent('5c93d983f3fe6358b41ccd7a',['5c7a6d0613ebebeb99a41689']);

 module.exports = router

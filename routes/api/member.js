const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const member = require('../../models/member')
const fetch = require("node-fetch");
const server = require("../../config/config");
const validator = require('../../validations/memberValidations')
const ObjectId = require('mongodb').ObjectID;
const notificationValidator = require('../../validations/notificationsValidation')
const Event = require('../../models/Event')


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


 //4.8//As a candidate I want to book a place in an event (based on the event’s type).
 router.put('/:id1/bookEvent/:id2',async (req,res) => {
            const canId=req.params.id1;
            const  eventId =req.params.id2;
    if(ObjectId.isValid(canId) && ObjectId.isValid(eventId)){
        const mem = await member.findById(canId);
        const event = await Event.findById(eventId);
        if (mem && event){
            const type=event.eventType;
            var skills= mem.skill_set;
            var allowed =skills.includes(type);
           
            if(allowed===true){
                  var members=event.bookedMembers;
                  members.push(canId);
                  const j=await bookEvent(eventId,members);
                  res.status(200).send(j);}
               
                
        
            else{
                res.send({msg: "You can't book this event"})
            }
        }
        else
            return res.status(404).send({error: 'invalid ID'})
    }else{
        return res.status(404).send({error: 'invalid ID'})
    }

})


async function bookEvent(eid,members){

    var error = true;
    const body = { bookedMembers: members };
    var j;
    await fetch(`${server}/api/events/${eid}`, {
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
            json = { msg: 'Event booked successfully'}
        }
        j = json;
    })
    .catch((err) => console.log("Error",err));
    return j;
}
//test 4.8 
 module.exports = router

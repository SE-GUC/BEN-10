const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const member = require('../../models/member')
const fetch = require('node-fetch');
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
        if(id.match(/^[0-9a-fA-F]{24}$/)){
        const mem = await member.findById(id)
        res.json({data: mem})
        }
     }catch{
        //console.log('Invalid Object id');
        return res.status(400).send({error:"the provided id is not valid one "})
     }
   
})
// Get all projects for a member
router.get('/:id/projects', async (req,res) => {
    const id = req.params.id;
    try{
        if(id.match(/^[0-9a-fA-F]{24}$/))
            res.redirect('/api/projects/?Member_id='+id);

     }catch{
        //console.log('Invalid Object id');
        return res.status(400).send({error:"the provided id is not valid one "})
     }
})


// view my notifications

router.get('/:id/notifications',async (req,res) => {
    const id = req.params.id;
    res.redirect('/api/notifications/?Member_id='+id);
}




)













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

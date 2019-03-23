const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const member = require('../../models/member')

const validator = require('../../validations/memberValidations')
const project = require("../../models/Project")



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





 router.get('/:id/recommendations', async (req,res) => {
    const id = req.params.id
    try{
        (id.match(/^[0-9a-fA-F]{24}$/))
        const mem = await member.findById(id)
        if(!mem)return res.status(404).send({error: 'member is not found'})

        res.json({data: getAvailableProjects(id)})
     }catch{
        return res.status(400).send({error:"the provided id is not valid one "})
     }
   
})


 async function getAvailableProjects(id){
        //---
            const myMember = await member.findById(id);
            let skills = myMember.skill_set;
            let myProjects = await project.find();
            var i;
            let returnResult = [];
             for (i = 0; i < myProjects.length; i++) { 
                 var j;
                 let flag = true;
             for (j = 0; j < myProjects[i].required_skills_set.length; j++) {
                var k;
                let Available = true;
                for(k=0;k<skills.length;k++){
                    if(skills[k]===myProjects[i].required_skills_set[j]){
                        Available = false;
                        break;
                    }
                }
                if(Available){
                    flag=false;
                    break;
                }
             }
             if(flag){
                 returnResult.push(myProjects[i]);
             }
                 
             }
             console.log(returnResult);
             return returnResult;
 }


 module.exports = router

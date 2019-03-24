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


 //check if there exists an error in response
//  function checkStatus(res){
//     if(res.ok){
//         return res 
//     }
//     console.log(res)
//     let err = new Error(res);
//     err.res = res;
//     return Promise.reject(err)
//  }


// 3.7 As an admin i want to decide (Accept / reject) an event request
router.use('/:id/EventRequest/:Eid/:decision',async (req,res)=>{
   try{
    if(ObjectId.isValid(req.params.id)&& ObjectId.isValid(req.params.Eid))
    {
        const url  = `${server}/api/eventrequests/${req.params.Eid}`;
        await fetch(url, {
                          method:'put',
                          body : JSON.stringify({isAccepted : req.params.decision}),
                          headers: { 'Content-Type': 'application/json' }
                          })
                    .then(res =>{  console.log(res.status)  
                                   return res.json()}
                         )
                    .then(json =>res.json({data:json.data}))
                    .catch(err =>{ console.log(err)})

   }
   }catch{
     console.log(error)
   }
})









async function decideEventRequest(id,decision){
    const url  = `${server}/api/eventrequests/${id}`;
    await fetch(url, {
                      method:'put',
                      body : JSON.stringify({isAccepted : decision}),
                      headers: { 'Content-Type': 'application/json' }
                      })
                .then(res =>{  console.log(res.status)  
                               return res.json()}
                     )
                .then(json =>{ console.log(json)})
                .catch(err =>{ console.log(err)})
}



// 3.4 as an admin i want to assign one of the candidates who applied for the task/project
router.use('/:aid/assign/:pid/to/:mid',async (req,res)=>{
    try{
        if(ObjectId.isValid(req.params.aid) &&
           ObjectId.isValid(req.params.pid) &&
           ObjectId.isValid(req.params.mid)){
               const applications  = await Application.find();
               
               var found = false    
                //loop through json and find the desired application
                for (var i in applications) {
                  let  application = applications[i];
                    if (application['applicantId'] == req.params.mid &&
                        application['projectId'] == req.params.pid) {
                        found = true 
                        break
                    }
                }
                if(found){
                    const url  = `${server}/api/projects/${req.params.pid}`;
                    fetch(url,{
                        method:'put',
                        body : JSON.stringify( {memberID : req.params.mid} ),
                        headers: { 'Content-Type': 'application/json' }
                        })
                        .then(res =>{  
                            return res.json()})
                        .then(json =>{ console.log(json)})
                        .catch(err =>{ console.log(err)})  
                }
               return res.status(200).send("Member has been assigned") 
    }
   }catch{
        console.log("error happened")
    }
})











 module.exports = router
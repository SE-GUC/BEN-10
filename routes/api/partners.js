const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
//FETCH REQUIERMENTS
const fetch = require('node-fetch');
const server = require('../../config/config');
const PartnerInfo = require('../../models/PartnerInfo')
const validator = require('../../validations/partnerValidations')
const ObjectId = require('mongodb').ObjectID;
mongoose.set('useFindAndModify', false);

router.get('/', async (req,res) => {
    const partners = await PartnerInfo.find()
    res.json({data: partners})
})

router.get('/:id', async (req,res) => {
    const id = req.params.id
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        // it's an ObjectID    
    
    const partners = await PartnerInfo.findById(id)
    if(partners){
      return res.json({data: partners})
    }else{
        return res.json({msg:"it doesn't exist"});
    }
}
 else{
    return res.status(400).json({msg:`a partner  with id ${id} not found`});}
    
})

router.post('/', async (req,res) => {
    try {
     const isValidated = validator.createValidationPartnerInfo(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const newPartnerInfo = await PartnerInfo.create(req.body)
     res.json({msg:'Partner was created successfully', data: newPartnerInfo})
    }
    catch(error) {
        console.log(error)
        return res.status(400).send('Error')
    }
      
 })

 router.put('/:id', async (req,res) => {
    try {
     if(ObjectId.isValid(req.params.id)){
     const isValidated = validator.updateValidationPartnerInfo(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedPartner = await PartnerInfo.findByIdAndUpdate({_id: req.params.id}, req.body)
     if (!updatedPartner) return res.status(404).send({error: 'Partner does not exists' })
     res.json({msg: 'Partner updated successfully'})
    }
    else {
        return res.status(404).send({error: "not a Partner id"})
    }
    }
    catch(error) {
        console.log(error)
        return res.status(404).send({error: 'Partner does not exist'})
    }  
 })


router.delete('/:id', async (req,res) => {
    try {
        if(ObjectId.isValid(req.params.id)){
        const id = req.params.id 
        const deletedPartner = await PartnerInfo.findByIdAndRemove(id)
        if (!deletedPartner) return res.status(400).send({ error: 'Partner does not exists' })
        res.json({msg: 'Partner was deleted successfully', data: deletedPartner})
       }
       else {
           return res.status(404).send({error: 'not a Partner id'})
       }
    }
    catch(error) {
        console.log(error)
        return res.status(400).send('Error')

    }  
 })


 //1.0 as a partner i want to submit a description on a task/project 
 router.post('/:id/addProject', async (req,res) => {
    try {
        if(ObjectId.isValid(req.params.id))
        {
            const company_id=req.params.id
            const Project={
            description:req.body.description,
            company:req.body.company,
            companyID: company_id,
            category:req.body.category,
            want_consultancy:req.body.want_consultancy,
            posted_date:req.body.posted_date,
            life_cycle : "Submitted" ,
            
            }
             
             var error = true
            await fetch(`${server}/api/projects/`, {
                method: 'post',
                body:    JSON.stringify(Project),
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
                    res.json(json)
                }
                result = json
                console.log(json)
                
            })
            .catch((err) => console.log("Error",err));
            return res.json(result)
                    
             
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
 

// 1.1 as a partner i want to assign a consultancy agency to a project 
router.put('/:id1/AssignCAtoProject/:id2',async (req,res) => {
           const  projID=req.params.id1;
           const   caId =req.params.id2;
    if(ObjectId.isValid(projID) && ObjectId.isValid(caId)){
        const project = await Project.findById(projID);
        const consultancy = await ConsultancyAgency.findById(caId);
        
        if (project && consultancy){
           var consul= project.applyingConsultancies;
           var found =false;
           for(var i=0 ; consul.length>i ; i++){
              
               if(caId == consul[i]){
                   found = true;
                   break;
               }
           }
           var need = project.want_consultancy;
        if(need === true){ 
            if(found===true){
             const j=await assigning(caId,projID);
             res.status(200).send(j);
        }    
        else {
        res.send({msg: "consultancy agency is not included in the list "})
    } 
}
       else {
        res.send({msg: "Projecst doesn't need a consultancy"})
    }
}
else
    return res.status(404).send({error: 'invalid ID'})
}else{
return res.status(404).send({error: 'invalid ID'})
}

})


async function assigning(caId,projID){
    var error = true;
    const body = { consultancyID : caId };
     var j;
     await fetch(`${server}/api/projects/${projID}`, {
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
         json = { msg: 'Consultancy Agency assigend successfully'}
        }
        j = json; 
        })
          .catch((err) => console.log("Error",err));
        return j;
     }


//1.2 as a partner i want to approve 
router.put('/:id/myprojects/:pid/finaldraft/approve', async (req,res)=>{
  try {
      if(ObjectId.isValid(req.params.id)&&ObjectId.isValid(req.params.pid))
      {
          const decision="approved"
          const j = await ApproveProject(req.params.pid,decision)
          res.status(200).send(j)
      }
      else {
          return res.status(404).send({ error: "ID NOT FOUND" })
      }
  }
  catch(error){
      console.log(error)
      return res.status(404).send({ error: "not a project id" })
  }    
})
async function ApproveProject(id,decision){
  const url  = `${server}/api/projects/${id}`;
  await fetch(url, {
                    method:'put',
                    body : JSON.stringify({life_cycle : decision}),
                    headers: { 'Content-Type': 'application/json' }
                    })
              .then(res =>{  console.log(res.status)  
                             return res.json()}
                   )
              .then(json =>{ console.log(json)})
              .catch(err =>{ console.log(err)})
}
//1.2 parte 2 as a partner i want to disapprove 
router.put('/:id/myprojects/:pid/finaldraft/disapprove', async (req,res)=>{
  try {
      if(ObjectId.isValid(req.params.id)&&ObjectId.isValid(req.params.pid))
      {
          const decision="disapproved"
          const j = await disapproveProject(req.params.pid,decision)
          res.status(200).send(j)
      }
      else {
          return res.status(404).send({ error: "ID NOT FOUND" })
      }
  }
  catch(error){
      console.log(error)
      return res.status(404).send({ error: "not a project id" })
  }    
})
async function disapproveProject(id,decision){
  const url  = `${server}/api/projects/${id}`;
  await fetch(url, {
                    method:'put',
                    body : JSON.stringify({life_cycle : decision}),
                    headers: { 'Content-Type': 'application/json' }
                    })
              .then(res =>{  console.log(res.status)  
                             return res.json()}
                   )
              .then(json =>{ console.log(json)})
              .catch(err =>{ console.log(err)})
}

 
module.exports = router
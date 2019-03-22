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
            life_cycle : "started" ,
            experience_level_needed:req.body.experience_level_needed,
            required_skills_set:req.body.required_skills_set
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
            return result
                    
             
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

//1.1 part1 View consultancy agency
router.get("/:id/assignCAtoProject/:pid", async (req, res) => {
    var j = await getApplyingConsultancyAgency(req.params.pid);
    var result = [];
    var i;
    for (i = 0; i < j.length; i++) {
      await fetch(`${server}/api/consultancyagency/${j[i]}`)
        .then(res => res.json())
        .then(json => {
          const consultancyagency = json.data;
          result.push(consultancyagency);
        })
        .catch(err => console.log("Error", err));
    }
    res.json({ data: result });
  });
  
  async function getApplyingConsultancyAgency(pid) {
    var result = [];
    await fetch(`${server}/api/consultancyagency`)
      .then(res => res.json())
      .then(json => {
        const ConsultancyAgency = json.data;
        const appliedConsultancies = ConsultancyAgency.filter(c => c.projectId === pid);
        appliedConsultancies.forEach(c => {
          result.push(c.applicantId);
        });
        return result;
      })
      .catch(err => console.log("Error", err));
    return result;
  }
  
  //1.1 part2 assign a CA to a project
  router.put("/:id/assignCAtoProject/:pid", async (req, res) => {
    const members = await getApplyingConsultancyAgency(req.params.pid);
    if (req.body.consultancyID != null) {
      candidatID = req.body.consultancyID;
    } else {
      return res.status(400).send({ error: "Please enter consultancy agency ID" });
    }
    const canBeAssigned = consultancyagency.includes(candidatID);
    var j;
    if (canBeAssigned) {
      j = await assigning(req.params.pid, candidatID);
      res.status(200).send(j);
    } else {
      res.status(400).send({ error: "Consultancy Agency did not apply" });
    }
  });
  
  async function assigning(projectID, candidatID) {
    const body = { consultancyID: candidatID };
    var error = true;
    var j;
  
    await fetch(`${server}/api/projects/${projectID}`, {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (res.status === 200) {
          error = false;
        }
        if (!error) {
          result = res;
        }
        return res.json();
      })
      .then(json => {
        if (!error) {
          json = { msg: "Consultancy Agency is assigned successfully" };
        }
        j = json;
      })
      .catch(err => {
        console.log("Error", err);
        j = { msg: "Error" };
      });
  
    return j;
  }

//1.2 as a partner i want to approve / disapprove a final draft 
router.post('/:id/DecideOnProject', async (req,res) => {
  try {
      if(ObjectId.isValid(req.params.id))
      {
          const company_id=req.params.id
          const Project={
          life_cycle : req.body.life_cycle 
          }
           
           var error = true
          await fetch(`${server}/api/projects/`, {
              method: 'put',
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
          return result
                  
           
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


 
module.exports = router
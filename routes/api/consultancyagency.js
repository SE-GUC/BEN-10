const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
mongoose.set("useFindAndModify", false);
//FETCH REQUIERMENTS
const fetch = require("node-fetch");
const server = require("../../config/config");

const ConsultancyAgency = require("../../models/ConsultancyAgency");
const validator = require("../../validations/consultancyagencyValidations");


router.get("/", async (req, res) => {
  const consultancyAgency = await ConsultancyAgency.find();
  res.json({ data: consultancyAgency });
});

router.get("/:id", async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const id = req.params.id;
    const consultancyagencys = await ConsultancyAgency.findById(id);
    if (!consultancyagencys)
      return res.status(404).send({ error: "Consultancy Agency not exist" });
    res.json({ data: consultancyagencys });
  } else {
    return res.status(404).send({ error: "Consultancy Agency does not exist" });
  }
});

router.post("/", async (req, res) => {
  try {
    const isValidated = validator.createValidationconsultancyagency(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const newConsultancyAgency = await ConsultancyAgency.create(req.body);
    res.json({
      msg: "Consultancy Agency was created successfully",
      data: newConsultancyAgency
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const isValidated = validator.updateValidationconsultancyagency(req.body);
      if (isValidated.error)
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message });
      const updatedconsultancyagency = await ConsultancyAgency.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      );
      if (!updatedconsultancyagency)
        return res
          .status(404)
          .send({ error: "Consultancy Agency does not exist" });
      res.json({ msg: "Consultancy Agency updated successfully" });
    } else {
      return res
        .status(404)
        .send({ error: "Consultancy Agency does not exist" });
    }
  } catch {
    console.log(error);
    return res.status(404).send({ error: "Consultancy Agency does not exist" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const deletedConsultancyAgency = await ConsultancyAgency.findByIdAndRemove(
        id
      );
      if (!deletedConsultancyAgency)
        return res
          .status(400)
          .send({ error: "Consultancy Agency does not exist" });
      res.json({
        msg: "Consultancy Agency was deleted successfully",
        data: deletedConsultancyAgency
      });
    } else {
      return res
        .status(404)
        .send({ error: "Consultancy Agency does not exist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error");
  }
});


//2.4 --As a consultancy agency I want to request to organize an event.
router.post('/:id/eventrequests/',async (req,res) => {
    if(ObjectId.isValid(req.params.id)){
        const cid=await ConsultancyAgency.findById(req.params.id);
        if(cid){
            if(req.body.requestedBy!=null && req.body.description!=null&&req.body.eventType!=null &&
               req.body.eventLocation!=null && req.body.eventDate!=null){    
        
                const j = await CARequestEvent(req.body.requestedBy, req.body.description, 
                                               req.body.eventType, req.body.eventLocation, req.body.eventDate);
                res.status(200).send(j)
                
            }else{
                return res.status(400).send({ error: "body is missing attrubites" })
            }
        }
        else
            return res.status(404).send({error: 'Consultancy Agency does not exist'})
    }else
        return res.status(404).send({error: 'Consultancy Agency does not exist'})
})


//2.2 --As a consultancy agency I want to assign one of the candidates who applied for the task/project.

//2.2 part1 View candidates applying for a project
router.get("/:id/assignMembers/:pid", async (req, res) => {
  var j = await getApplyingMembers(req.params.pid);
  var result = [];
  var i;
  for (i = 0; i < j.length; i++) {
    await fetch(`${server}/api/member/${j[i]}`)
      .then(res => res.json())
      .then(json => {
        const member = json.data;
        result.push(member);
      })
      .catch(err => console.log("Error", err));
  }
  res.json({ data: result });
});

async function getApplyingMembers(pid) {
  var result = [];
  await fetch(`${server}/api/applications`)
    .then(res => res.json())
    .then(json => {
      const members = json.data;
      const appliedmembers = members.filter(m => m.projectId === pid);
      appliedmembers.forEach(m => {
        result.push(m.applicantId);
      });
      return result;
    })
    .catch(err => console.log("Error", err));
  return result;
}


//2.2 part2 assign a candidate to a project
router.put("/:id/assignMembers/:pid", async (req, res) => {
  const members = await getApplyingMembers(req.params.pid);
  if (req.body.memberID != null) {
    candidatID = req.body.memberID;
  } else {
    return res.status(400).send({ error: "Please enter Memeber ID" });
  }
  const canBeAssigned = members.includes(candidatID);
  var j;
  if (canBeAssigned) {
    j = await assignCandidate(req.params.pid, candidatID);
    res.status(200).send(j);
  } else {
    res.status(400).send({ error: "Candidate did not apply on this project" });
  }
});
router.delete('/:id', async (req,res) => {
    try {
        if(ObjectId.isValid(req.params.id)){
        const id = req.params.id
        const deletedConsultancyAgency= await ConsultancyAgency.findByIdAndRemove(id)
        if(!deletedConsultancyAgency) return res.status(400).send({ error: 'Consultancy Agency does not exist'})
        res.json({msg:'Consultancy Agency was deleted successfully', data: deletedConsultancyAgency})
        }else{
            return res.status(404).send({error: 'Consultancy Agency does not exist'})


async function assignCandidate(projectID, candidatID) {
  const body = { memberID: candidatID };
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
        json = { msg: "Candidate is assigned successfully" };
      }
      j = json;
    })
    .catch(err => {
      console.log("Error", err);
      j = { msg: "Error" };
    });

  return j;
}


 //2.4 --As a consultancy agency I want to request to organize an event.
 async function CARequestEvent(requestedBy, description, eventType, eventLocation, eventDate){
    const body = { 
        requestedBy:requestedBy,
        description: description,
        eventType: eventType,
        eventLocation: eventLocation,
        eventDate: eventDate,
        isAccepted: "false"
     };
    var error = true;
    var j;
    await fetch(`${server}/api/eventrequests/`, {
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
            json = { msg: 'Event is requested successfully'}
        }
        j = json;
    })
    .catch((err) => console.log("Error",err));
    return j;
}


 module.exports = router

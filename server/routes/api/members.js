const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const fetch = require("node-fetch");
const server = require("../../config/config");
const Application = require("../../models/Application");

const Event = require("../../models/Event");
const member = require("../../models/Member");
const validator = require("../../validations/memberValidations");
const notificationValidator = require("../../validations/notificationsValidation");
const project = require("../../models/Project");


//----CRUDS-------

// GET method to retrieve all members
router.get("/", async (req, res) => {
  const members = await member.find();
  res.json({ data: members });
});

// GET method to retirve a member by his id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const mem = await member.findById(id);
      if(mem)
      return res.json({ data: mem });
      else
      return res.json({ msg: "it doesn't exist" });

    }
    else 
    return res.status(400).send({ error: "the provided id is not valid one " });
  }
);

// post method to add member
router.post("/", async (req, res) => {
  try {
    const isValidated = validator.createValidationMember(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const newMember = await member.create(req.body);
    res.json({ msg: "member was created successfully", data: newMember });
  } catch (error) {
    return res.status(400).send({error: error});
  }
});

// DELETE method to delete a member
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(400)
        .send({ error: "the provided id is not valid one " });
    }

    //---
    const deletedmember = await member.findByIdAndRemove(id);
    if (!deletedmember)
      return res.status(404).send({ error: "member is not found" });
    res.json({ msg: "member was deleted successfully", data: deletedmember });
  } catch (error) {
    return res.status(400).send({error: error})
  }
});

// PUT method to update a member
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if(id.match(/^[0-9a-fA-F]{24}$/)){
      const isValidated = validator.updateValidationMember(req.body);
      if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
      const mem = await member.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      );
      console.log(mem)
      if (!mem) return res.status(404).send({ error: "member is not found" });
      res.json({ msg: "member updated successfully" });
  
    }
    else{
      return res
        .status(400)
        .send({ error: "the provided id is not valid one " });

    }
  } catch (error) {
    console.log(error)
    return res.status(400).send({error : error});
  }
});

// --------------------------------------doooodie's evaluation world --------------------------------

// as a candidate i want to submit the project to be finally reviewed
router.put('/:id1/Myprojects/:id2/submit/:link',async(req,res)=>{
  try{
    const project_id = req.params.id2;
   const member_id = req.params.id1;
   const link=req.params.link;
  if (
    project_id.match(/^[0-9a-fA-F]{24}$/) &&
    member_id.match(/^[0-9a-fA-F]{24}$/)
  ){
    const project_appliedfor = await project.findById(project_id);
    const member_applying= await member.findById(member_id);
    if(project_appliedfor!=null && member_applying!=null){
      var lifeCycle=project_appliedfor["lifeCycle"];
      if(lifeCycle==="In Progress"){
        console.log(project_appliedfor.memberID)
        console.log(member_id.toString())
        if(project_appliedfor.memberID.toString()!=member_id.toString()){
          return res.status(404).send({ error: "this projects is not assigned to you" });
        }
      var error=true;
      const body={
        lifeCycle:"Final Review",
        submittedProjectLink:link
      }
      console.log(1);
      await fetch(`${server}/api/projects/${project_id}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => {
          console.log(res)
          
          if (res.status === 200) {
            error = false;
          }
          return res.json();
        })
        .then(json => {
          return res.json({data:"project was submitted successfully"})
        })
        .catch(err => console.log("Error", err));
      }
      else{
        return res.status(404).send({ error: `this project is in phase"${lifeCycle_project}` });
      }
    }
    else{
      if(project_appliedfor ==null)
       return res.status(404).send({ error: "there is no such project" });
       if(member_applying==null)
       return res.status(404).send({ error: "there is no such member with this id" });
    }
  } else return res.status(404).send({ error: "Not a valid id format1" })
  }
  catch(error){
    return res.status(404).send({ error: "Not a valid id format" });
  }
})

// as a member i want to receive a task orientation invitation
router.get('/:id/task_orientation',async(req,res)=>{
  try{
    const member_id=req.params.id;
    if(member_id.match(/^[0-9a-fA-F]{24}$/)){
      const Member = await member.findById(member_id);
      if(Member){
      var error = true;
    await fetch(`${server}/api/orientationinvitations`, {
      method: "get",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (res.status === 200) {
          error = false;
        }
        return res.json();
      })
      .then(json => {
        const mytasks_orientation = json.data;
        const task = mytasks_orientation.filter(
          task1 => task1.sentToId === member_id
        );
        res.json({ data: task });
      })
      .catch(err => console.log("Error", err));


    
      } else return res.status(404).send({ error: "there is no such member" });
    }else{
      return res.status(404).send({ error: "Not a valid id format" });
    }

  }
  catch(error){
    return res.status(404).send({ error: "Not a valid id format" });
  }
})

// view my notifications

router.get("/:id/notifications", async (req, res) => {
  const id = req.params.id;
  // res.redirect('/api/notifications/?Member_id='+id);
  if (ObjectId.isValid(id)) {
    const member_id=req.params.id;
    const Member = await member.findById(member_id);
    if(Member!=null){
    var error = true;
    await fetch(`${server}/api/notifications`, {
      method: "get",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (res.status === 200) {
          error = false;
        }
        return res.json();
      })
      .then(json => {
        const mynotification = json.data;
        const notif = mynotification.filter(
          mynotification => mynotification.notifiedPerson === id
        );
        res.json({ data: notif });
      })
      .catch(err => console.log("Error", err));
    }else{
      return res.status(404).send({ error: "there is no such member " });
    }
  } else {
    return res.status(404).send({ error: "Not a member id" });
  }
});

// i want to be able to apply for a task or a project
router.post("/:id1/projects/:id2/apply", async (req, res) => {
  const project_id = req.params.id2;
  const member_id = req.params.id1;
  if (
    project_id.match(/^[0-9a-fA-F]{24}$/) &&
    member_id.match(/^[0-9a-fA-F]{24}$/)
  ) {
    const project_appliedfor = await project.findById(project_id);
    const member_applying= await member.findById(member_id);
    if(member_applying!=null && project_appliedfor!=null){
    var found=true;
    console.log(member_applying["firstName"])
    console.log(member_applying["skillSet"]);
    for(var i=0;project_appliedfor["requiredSkillsSet"].length>i;i++){
      console.log(project_appliedfor["requiredSkillsSet"][i])
      if(!member_applying["skillSet"].includes(project_appliedfor["requiredSkillsSet"][i])){
        found=false;
        break;
      }
    }
    if(!found){
      return res.send({ error: "this member does not have the required skills for this project" });
    }
    const application = {
      applicantId: member_id,
      applyingDate: Date.now(),
      projectId: project_id
    };
    var allApplications = await Application.find();
    allApplications = allApplications.filter(a =>((a.applicantId.toString()===member_id.toString())&&(a.projectId.toString()===project_id.toString())))
    var error = true;
    if(allApplications.length===0){
    await fetch(`${server}/api/applications`, {
      method: "post",
      body: JSON.stringify(application),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(json => res.json(json))
      .catch(err => console.log("Error", err));


  }else{
    return res.send({error:"You already applied before"})
  }
}
  else{
    return res.send({ error: "there no such data with these ids" });
  }
  } else {
    return res.send({ error: "Not a valid id format" });
  }

});

// ------------------------- end of doodie's world ------------------------------------
// ------------------------- hope u had fun:) -----------------------------------------
// ------------------------- thank u for visiting -------------------------------------


//4.9 --As a candidate I want that the events I attended be added on my profile.
router.put("/:id1/events/:id2", async (req, res) => {
  if (ObjectId.isValid(req.params.id1) && ObjectId.isValid(req.params.id2)) {
    const mem = await member.findById(req.params.id1);
    const event = await Event.findById(req.params.id2);
    if (mem && event) {
      const events = mem.events;
      events.push(req.params.id2);
      const j = await postevent(req.params.id1, events);
      res.status(200).send(j);
    } else return res.status(404).send({ error: "invalid inputs" });
  } else {
    return res.status(404).send({ error: "invalid inputs" });
  }
});


//as a candidate i want to view tasks so that i can apply for them

router.get("/:id/getProject", async (req, res) => {
  const id = req.params.id;
  if (ObjectId.isValid(id)) {
    const j = await getProjects(id);
    res.json({ data: j });
  } else {
    return res.status(404).send({ error: "ID NOT FOUND" });
  }
});

async function getProjects() {
  var result = [];
  await fetch(`${server}/api/projects`)
    .then(res => res.json())
    .then(json => {
      const projects = json.data;
      const hisProjects = projects.filter(m => m.lifeCycle === "Posted");
      result = hisProjects;
      return hisProjects;
    })
    .catch(err =>
       res.status(400).send({error:err}));
  return result;
}
// as a candidate i want to view an events so that i can book a place in it
router.get("/:id/getEvent", async (req, res) => {
  const id = req.params.id;
  if (ObjectId.isValid(id)) {
    const j = await getEvents(id);
    const mye = j.filter(m=>!( m.bookedMembers.includes(id)))
    res.json({ data: mye });
  } else {
    return res.status(404).send({ error: "ID NOT FOUND" });
  }
});

async function getEvents() {
  var result = [];
  await fetch(`${server}/api/events`)
    .then(res => res.json())
    .then(json => {
      const events = json.data;
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var yyyy = today.getFullYear();
      today = yyyy + "-" + mm + "-" + dd + "T00:00:00.000Z";
      const hisEvents = events.filter(m => m.eventDate >= today);
      console.log(hisEvents)
      result = hisEvents;
      return hisEvents;
    })
    .catch(err => 
      {return res.status(404).send({ error: err })  })   ; 

  return result;
}

//4.9 --As a candidate I want that the events I attended be added on my profile.
async function postevent(cid, events) {
  var error = true;
  events = events.filter(e =>e.bookedMembers.includes(cid));
  const body = { events: events };
  var j;
  await fetch(`${server}/api/members/${cid}`, {
    method: "put",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      if (!error) {
        json = { msg: "event is added successfully" };
      }
      j = json;
    })
    .catch(err =>   {return res.status(404).send({ error: err })  })   ; 

  return j;
}

router.get("/:id/recommendations", async (req, res) => {
  const id = req.params.id;
  try {
    id.match(/^[0-9a-fA-F]{24}$/);
    const mem = await member.findById(id);
    if (!mem) return res.status(404).send({ error: "member is not found" });

    res.json({ data: await getAvailableProjects(id) });
  } catch {
    return res.status(400).send({ error: "the provided id is not valid one " });
  }
});

async function getAvailableProjects(id) {
  //---
  let myMember = await member.findById(id);
  // myMember=JSON.parse(JSON.stringify(myMember))
  let skills = null
  skills = myMember.skillSet;
  console.log(skills)
  let myProjects = await project.find();
  var i;
  let returnResult = [];
  for (i = 0; i < myProjects.length; i++) {
    var j;
    let flag = true;
    
    for (j = 0; j < myProjects[i].requiredSkillsSet.length; j++) {
      // console.log(myProjects[i].requiredSkillsSet)
      var k;
      let Available = true;
      if(skills.length>0){
        // console.log(myProjects[i])
      }
      for (k = 0; k < skills.length; k++) {
        if (skills[k].toString() === myProjects[i].requiredSkillsSet[j].toString()) {
          Available = false;
          break;
        }
       } if (Available) {
        flag = false;
        break;
      }
      console.log(myProjects[i].lifeCycle.toString())
      if (flag && myProjects[i].lifeCycle.toString() ==="Posted") {
      returnResult.push(myProjects[i]);
    }
      

    } 
  }
  return returnResult;
}

//4.8//As a candidate I want to book a place in an event (based on the event’s type).
router.put("/:id1/bookEvent/:id2", async (req, res) => {
  const canId = req.params.id1;
  const eventId = req.params.id2;
  if (ObjectId.isValid(canId) && ObjectId.isValid(eventId)) {
    const mem = await member.findById(canId);
    const event = await Event.findById(eventId);
    if (mem && event) {
      const type = event.eventType;
      var skills = mem.skillSet;
      var allowed = skills.includes(type);

      if (allowed === true&&event.remainingPlace!=0) {
        const members = event.bookedMembers;
        members.push(canId);
        const j = await bookEvent(eventId, members,event.remainingPlace-1);
        res.status(200).send(j);
      } else {
        res.send({ msg: "You can't book this event" });
      }
    } else return res.status(404).send({ error: "invalid ID" });
  } else {
    return res.status(404).send({ error: "invalid ID" });
  }
});

async function bookEvent(eid, members,remainingPlace) {
  var error = true;
  const body = { bookedMembers: members,remainingPlace };
  var j;
  await fetch(`${server}/api/events/${eid}`, {
    method: "put",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      if (!error) {
        json = { msg: "Event booked successfully" };
      }
      j = json;
    })
    .catch(err =>   {return res.status(404).send({ error: err })  })   ; 

  return j;
}
//as a candidate i want to view my projects
router.get("/:id/myProjects", async (req, res) => {
  const id = req.params.id;
  if (ObjectId.isValid(id)) {
    const mem = await member.findById(id);
    if (mem) {
      var error = true;
      await fetch(`${server}/api/projects`, {
        method: "get",
        headers: { "Content-Type": "application/json" }
      })
        .then(res => {
          if (res.status === 200) {
            error = false;
          }
          return res.json();
        })
        .then(json => {
          const myprojects = json.data;
          const proj = myprojects.filter(
            myprojects => myprojects.memberId == id
          );
          res.json({ data: proj });
        })
        .catch(err => console.log("Error", err));
    } else {
      return res.send({ error: "Member not found" });
    }
  } else {
    return res.send({ error: "ID not found" });
  }
});

async function getTheProjects(memberid) {
  var result = [];
  await fetch(`${server}/api/projects`)
    .then(res => res.json())
    .then(json => {
      const projects = json.data;
      console.log(projects)
      const hisProjects = projects.filter(m => m.memberID === memberid );
      console.log()
      result =hisProjects;
      return hisProjects;
    })
    .catch(err => {return { error: err }  })   ; 

  return result;
}

router.get("/:id/ShowMyEvents", async (req, res) => {
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    const memb = await member.findById(id);
    var found = false;
    if (memb) {
      var arr=[];
      const e = await Event.find();
      for(var m=0; m<e.length; m++){
      found = false;
      var mem = e[m].bookedMembers;
      for (var i = 0; mem.length > i; i++) {
          if (req.params.id== mem[i]) {
            found = true;
            arr.push(e[m]);
            break;
          }
        }
      }
      return res.json({"data":arr})
    } else {
      return res.status(404).send({ msg: "Member not found" });
    }
  } else {
    return res.status(404).send({ msg: "Member not found" });
  }
})

//test 4.8
router.get("/:id/viewAllProjects",async (req,res)=>{
  const mem = await member.findById(req.params.id);
  if(mem){
    var projects = await project.find();
    arr=["Posted","In Progress","Final Review","Finished"]
    projects = projects.filter(p => arr.includes(p.lifeCycle))
    res.json({data:projects})
  }else{
    return res.status(404).send({error:"not a member id"})
  }
})
module.exports = router;

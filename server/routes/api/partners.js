const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Project = require("../../models/Project");
const event = require("../../models/Event");
const PartnerInfo = require("../../models/PartnerInfo");
const fetch = require("node-fetch");
const server = require("../../config/config");
const Member = require("../../models/member");
const Event = require("../../models/Event");
const validator = require("../../validations/partnerValidations");
const ObjectId = require("mongodb").ObjectID;

mongoose.set("useFindAndModify", false);

router.get("/", async (req, res) => {
  const partners = await PartnerInfo.find();
  res.json({ data: partners });
});

//1.0 as a partner i want to submit a description on a task/project 
router.post('/:id/addProject', async (req,res) => {
  try {
      if(ObjectId.isValid(req.params.id))
      {
          console.log(req.body.want_consultancy)
          console.log(req.body.want_consultancy == true)
          const company_id=req.params.id
          var life;
          if(req.body.want_consultancy == true){
              life = "Waiting for consultancy"
          }
          else{
              life = "Negotiation"
          }
          var result;
          var error = true
          const Project={
          description:req.body.description,
          company:req.body.company,
          companyID: company_id,
          category:req.body.category,
          want_consultancy:req.body.want_consultancy,
          posted_date:req.body.posted_date,
          life_cycle : life
          }
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
                  json = ({msg:`created successfully`});
              }
              result = json
              console.log(json)
              
          })
          .catch((err) => console.log("Error",err));
       res.json(result)
                  
           
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

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    // it's an ObjectID

    const partners = await PartnerInfo.findById(id);
    if (partners) {
      return res.json({ data: partners });
    } else {
      return res.json({ msg: "it doesn't exist" });
    }
  } else {
    return res.status(400).json({ msg: `a partner  with id ${id} not found` });
  }
});

router.post("/", async (req, res) => {
  try {
    const isValidated = validator.createValidationPartnerInfo(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const newPartnerInfo = await PartnerInfo.create(req.body);
    res.json({ msg: "Partner was created successfully", data: newPartnerInfo });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const isValidated = validator.updateValidationPartnerInfo(req.body);
      if (isValidated.error)
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message });
      const updatedPartner = await PartnerInfo.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      );
      if (!updatedPartner)
        return res.status(404).send({ error: "Partner does not exists" });
      res.json({ msg: "Partner updated successfully" });
    } else {
      return res.status(404).send({ error: "not a Partner id" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "Partner does not exist" });
  }
});
router.post("/:id/eventrequests/", async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const p = await PartnerInfo.findById(req.params.id);
    if (p) {
      if (
        req.body.requestedBy != null &&
        req.body.description != null &&
        req.body.eventType != null &&
        req.body.eventLocation != null &&
        req.body.eventDate != null
      ) {
        const j = await PartnerRequestEvent(
          req.params.id,
          req.body.requestedBy,
          req.body.description,
          req.body.eventType,
          req.body.eventLocation,
          req.body.eventDate
        );
        console.log(j)
        res.send(j);
      } else {
        return res.status(400).send({ error: "body is missing attrubites" });
      }
    } else
      return res
        .status(404)
        .send({ error: "Partner does not exist" });
  } else
    return res.status(404).send({ error: "Partner does not exist" });
});

 async function PartnerRequestEvent(
  rid,
  requestedBy,
  description,
  eventType,
  eventLocation,
  eventDate
) {
  const body = {
    requestorId :rid,
    requestedBy: requestedBy,
    description: description,
    eventType: eventType,
    eventLocation: eventLocation,
    eventDate: eventDate,
    isAccepted: "false"
  }
  var error = true;
  var j;
  await fetch(`${server}/api/eventrequests`, {
    method: "post",
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
        json = { msg: "Event is requested successfully" };
      }
      console.log(json)
      j = json;
    })
    .catch(err => console.log("Error", err));
  return j;
}

router.delete("/:id", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const deletedPartner = await PartnerInfo.findByIdAndRemove(id);
      if (!deletedPartner)
        return res.status(400).send({ error: "Partner does not exists" });
      res.json({
        msg: "Partner was deleted successfully",
        data: deletedPartner
      });
    } else {
      return res.status(404).send({ error: "not a Partner id" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error");
  }
});
router.delete("/:id/deleteProject/:pid/", async (req, res) => {
  const p = await Project.findById(req.params.pid);
  if (p.companyID == req.params.id) {
    const j = await deleteProject(req.params.pid);
    console.log(j)
    return res.json(j);
  } else {
    res.json({ msg: "error" });
  }
});
router.put("/:id/editProject/:pid/", async (req, res) => {
  const p = await Project.findById(req.params.pid);
  if (p.companyID == req.params.id) {
    const j = await editProject(req.params.pid, req.body);
    return res.json(j);
  } else {
    res.json({ msg: "error" });
  }
});
// router.post("/:id/submitRequest", async (req, res) => {
//   const p = await PartnerInfo.findById(req.params.id)
//   if (p.requestorId==req.params.id){
//     const j = await PartnerRequestEvent(req.body);
//   }
//   return res.json(j);
// });
// router.post("/:id/submitRequest", async (req, res) => {
//   try {
//     const isValidated = validator.createValidationPartnerInfo(req.body);
//     if (isValidated.error)
//       return res
//         .status(400)
//         .send({ error: isValidated.error.details[0].message });
//     const newPartnerInfo = await PartnerInfo.create(req.body);
//     res.json({ msg: "Request was created successfully", data: newAdmin });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send("Error");
//   }
// });
//1.0 as a partner i want to submit a description on a task/project
router.post("/:id/addProject", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const company_id = req.params.id;
      const Project = {
        description: req.body.description,
        company: req.body.company,
        companyID: company_id,
        category: req.body.category,
        want_consultancy: req.body.want_consultancy,
        posted_date: req.body.posted_date,
        life_cycle: "Submitted"
      };

      var error = true;
      await fetch(`${server}/api/projects/`, {
        method: "post",
        body: JSON.stringify(Project),
        headers: { "Content-Type": "application/json" }
      })
        // .then(checkStatus)
        .then(res => {
          if (res.status === 200) {
            error = false;
          }
          console.log(res.status);
          if (!error) {
            result = res;
          }
          return res.json();
        })
        .then(json => {
          if (!error) {
            res.json(json);
          }
          result = json;
          console.log(json);
        })
        .catch(err => console.log("Error", err));
      return res.json(result);
    } else {
      return res.status(404).send({ error: "Error" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error");
  }
});


async function deleteProject(id) {
  var error = true;
  var result;
  const pr = await Project.findById(id);
  if (
    pr.life_cycle !== "Posted" &&
    pr.life_cycle !== "Final Review" &&
    pr.life_cycle !== "Finished"
  ) {
    await fetch(`${server}/api/projects/${id}`, {
      method: "delete",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (res.status === 200) {
          error = false;
        }
        console.log(res.status);
        
        return res.json();
      }).then(json => {
        if (!error) {
          json={msg: "Project Deleted"};
        }
        result = json;
        console.log(json);
      })
      .catch(err => console.log("Error", err));
    return result;      

  } else {
    return {error: "Project can not be deleted"};
  }
}
async function editProject(id, body) {
  var error = true;
  var j;
  const pr = await Project.findById(id);
  if (
    pr.life_cycle !== "Posted" &&
    pr.life_cycle !== "Final Review" &&
    pr.life_cycle !== "Finished"
  ) {
    await fetch(`${server}/api/projects/${id}`, {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (res.status === 200) {
          error = false;
        }
        return res.json();
      }).then(json => {
        if (!error) {
          json={msg: "Project Edited"};
        }
        j = json;
        console.log(json);
      })
      .catch(err => console.log("Error", err));
    return j;
  } else {
    console.log("error");
  }
}

// async function PartnerRequestEvent(body) {
//   var error = true;
//   var j;
//   await fetch(`${server}/api/eventrequests/`, {
//     method: "post",
//     body: JSON.stringify(body),
//     headers: { "Content-Type": "application/json" }
//   })
//     .then(res => {
//       if (res.status === 200) {
//         error = false;
//       }
//       return res.json();
//     })
//     .then(json => {
//       if (!error) {
//         json = { msg: "Event is requested successfully" };
//       }
//       j = json;
//       console.log(j);
//     })
//     .catch(err => console.log("Error", err));
//   return j;
// }

//1.5 As a partner I want to review the final work of the candidate who is working on my task/project.
router.get("/:id/ShowFinalDraft", async (req, res) => {
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    const partners = await PartnerInfo.findById(id);

    if (partners) {
      const j = await getProjects(id);
      res.json({ data: j });
    } else {
      return res.status(404).send({ error: "partner not found" });
    }
  } else {
    return res.status(404).send({ error: "ID not found" });
  }
});

async function getProjects(partnerid) {
  var result = [];
  await fetch(`${server}/api/projects`)
    .then(res => res.json())
    .then(json => {
      const projects = json.data;
      const hisProjects = projects.filter(
        m => m.companyID === partnerid && m.life_cycle === "Final Review"
      );
      result = hisProjects;
      return hisProjects;
    })
    .catch(err => console.log("Error", err));
  return result;
}
// assign ca to project
router.put("/:id3/project/:id1/AssignCAtoProject/:id2", async (req, res) => {
  const projID = req.params.id1;
  const caId = req.params.id2;
  const part = req.params.id3;
  if (ObjectId.isValid(projID) && ObjectId.isValid(caId) && ObjectId.isValid(part) ) {
    const project = await Project.findById(projID);
    const consultancy = await ConsultancyAgency.findById(caId);
    const partner = await PartnerInfo.findById(part)
    if (project && consultancy && partner) {
      var consul = project.applyingCA;
      var found = false;
      var same1 = project.companyID
      var same2 = req.params.id3
      if( same1 == same2 ) {
      for (var i = 0; consul.length > i; i++) {
        if (caId == consul[i]) {
          found = true;
          break;
        }
      }
      var need = project.want_consultancy;
      if (need === true) {
        if (found === true) {
          const j = await assigning(caId, projID);
          res.status(200).send(j);
        } else {
          res.send({ msg: "consultancy agency is not included in the list " });
        }
      } else {
        res.send({ msg: "Projecst doesn't need a consultancy" });
      }
    }else { res.send({ msg: "Partner is not the owner of the Project to edit" }); }
 } 
 else return res.status(404).send({ error: "invalid ID" });
  } 
  else {
    return res.status(404).send({ error: "invalid ID" });
  }
});

async function assigning(caId, projID) {
  var error = true;
  const body = { consultancyID: caId };
  var j;
  await fetch(`${server}/api/projects/${projID}`, {
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
        json = { msg: "Consultancy Agency assigend successfully" };
      }
      j = json;
    })
    .catch(err => console.log("Error", err));
  return j;
}

//1.2 as a partner i want to approve 
router.put('/:id1/myprojects/:id2/finaldraft/approve', async (req,res)=>{
  const  part=req.params.id1;
  const   proj =req.params.id2;
if(ObjectId.isValid(part) && ObjectId.isValid(proj)){
  const partner = await PartnerInfo.findById(part);
  const project = await Project.findById(proj);
  console.log(partner)
  console.log(project)
  if (partner && project){
      var app = project.life_cycle
      var consl = project.want_consultancy
      if(consl == false){
      if(app == "Final Draft" ){
       const decision="Approved"
      const j = await ApproveProject(proj,decision)
      res.send(j)
  }
  else{return res.status(404).send({ error: "Not in the Final Draft to approve" })}
}else { return res.status(404).send({ error: "Consultancy Agency is the one to Approve" })}
}else
return res.status(404).send({error: 'invalid ID'})
}else{
return res.status(404).send({error: 'invalid ID'})
}

})

async function ApproveProject(id,decision){
const url  = `${server}/api/projects/${id}`;
var j
await fetch(url, {
          method:'put',
          body : JSON.stringify({life_cycle : decision}),
          headers: { 'Content-Type': 'application/json' }
          })
    .then(res =>{  console.log(res.status)  
                   return res.json()}
         )
    .then(json =>{ console.log(json)
  j= json})
    .catch(err =>{ console.log(err)})
    return j
}
//1.2 parte 2 as a partner i want to disapprove 
router.put('/:id/myprojects/:pid/finaldraft/disapprove', async (req,res)=>{
const  part=req.params.id;
const   proj =req.params.pid;
if(ObjectId.isValid(part) && ObjectId.isValid(proj)){
const partner = await PartnerInfo.findById(part);
const project = await Project.findById(proj);
if (partner && project){
var dis = project.life_cycle
var consl = project.want_consultancy
if(consl == false){
if(dis == "Final Draft"){
const decision="Negotiation"
const j = await disapproveProject(proj,decision)
res.send(j)
}else{return res.status(404).send({ error: "No Final Draft to Disapprove it " })}
}else { return res.status(404).send({ error: "Consultancy Agency is the one to Cancel" })}
}else
return res.status(404).send({error: 'invalid ID'})
}else{
return res.status(404).send({error: 'invalid ID'})
}

})
async function disapproveProject(id,decision){
  var j
const url  = `${server}/api/projects/${id}`;
await fetch(url, {
          method:'put',
          body : JSON.stringify({life_cycle : decision}),
          headers: { 'Content-Type': 'application/json' }
          })
    .then(res =>{  console.log(res.status)  
                   return res.json()}
         )
    .then(json =>{ console.log(json)
    j = json})
    .catch(err =>{ console.log(err)})
    return j
}

          
// 10 As a patrner I want to give the attendees a form to rate the event and give a feedback
router.post("/:pid/rating/:eid/", async (req, res) => {
  if (ObjectId.isValid(req.params.pid) && ObjectId.isValid(req.params.eid)) {
    const partner = await PartnerInfo.findById(req.params.pid);
    const event = await Event.findById(req.params.eid);
    if (partner && event) {
      if (event.requestorId == req.params.pid) {
        var i;
        var success = true;
        var date = Date.now()
        const attendees = event.bookedMembers
        var arr = new Array(attendees.length);
        for (i = 0; i < attendees.length; i++) {
          const j = await Partnerrequestrating(event.formLink, attendees[i], date);
          arr[i] = j;
        }
        for (i = 0; i < attendees.length; i++){
          if (arr[i].msg != "Notifications are sent successfully")
            success = false;
        }
        if (success)
          res.json({ msg: "Notifications are sent successfully" })
        else
          res.json({ msg: "Error occured" })
      } else {
        return res.status(400).send({ error: 'this Event does not belong to you' });
      }
    } else return res.status(404).send({ error: "inavalid inputs" });
  } else return res.status(404).send({ error: "inavalid inputs" });
});

// 10 As a patrner I want to give the attendees a form to rate the event and give a feedback
async function Partnerrequestrating(formLink,id,date) {
  var error = true;
  const body = {
    description: `please rate thie event through this form ${formLink}`,
    NotifiedPerson: id,
    date: date,
    seen: "false"
  };
  var j;
  await fetch(`${server}/api/notifications/`, {
    method: "post",
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
        json = { msg: "Notifications are sent successfully" };
      }
      j = json;
    })
    .catch(err => console.log("Error", err));

  return j;
}

// as i partner i want to get my projects 
router.get("/:id/myProjects", async (req, res) => {
  const id = req.params.id;
  if (ObjectId.isValid(id)) {
    const partner = await PartnerInfo.findById(id);
    if(partner){
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
        const myprojects= json.data;
        const proj = myprojects.filter(
          myprojects => myprojects.companyID === id
        );
        res.json({ data: proj });
      })
      .catch(err => console.log("Error", err));
  }else{
    return res.status(404).send({ error: "Partner not found" });
  }
} else {
  return res.status(404).send({ error: "ID not found" });
}
});

// -- 7 As a partner I wanto to approve/disapprove the final review of a project

router.put("/:id/myprojects/:pid/finalreview/approve", async (req, res) => {
  try {
    const par = await PartnerInfo.findById(req.params.id);
    const proj = await Project.findById(req.params.pid);
    if (par && proj) {
      if (proj.companyID == req.params.id) {
        if (proj.life_cycle === "Final Review") {
          const j = await acceptFinalReview(req.params.pid);
          console.log(j)
          res.send(j);
        } else {
          //not final review
          res
            .status(400)
            .send({
              error: "The project is not submitted to be finally reviewed"
            });
        }
      } else {
        //not your project
        res.status(400).send({ error: "You can not access this project" });
      }
    } else {
      //id error
      res.status(400).send({ error: "ERROR: Project not found" });
    }
  } catch (error) {
    res.status(404).send({ error: "Error" });
  }
});

async function acceptFinalReview(pid) {
  var j;
  var error = true;
  await fetch(`${server}/api/projects/${pid}`, {
    method: "put",
    body: JSON.stringify({ life_cycle: "Finished" }),
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
        json = { msg: "Final Review accepted successfully" };
      }
      j = json;
    })
    .catch(err => {
      console.log("Error", err);
      j = { msg: "Error" };
    });

  return j;
}
router.put("/:id/myprojects/:pid/finalreview/decline", async (req, res) => {
  try {
    const par = await PartnerInfo.findById(req.params.id);
    const proj = await Project.findById(req.params.pid);
    if (par && proj) {
      if (proj.companyID == req.params.id) {
        if (proj.life_cycle === "Final Review") {
          const j = await declineFinalReview(req.params.pid);
          res.json(j);
        } else {
          //not final review
          res
            .status(400)
            .send({
              error: "The project is not submitted to be finally reviewed"
            });
        }
      } else {
        //not your project
        res.status(400).send({ error: "You can not access this project" });
      }
    } else {
      //id error
      res.status(400).send({ error: "ERROR: Project not found" });
    }
  } catch (error) {
    res.status(404).send({ error: "Error" });
  }
});

async function declineFinalReview(pid) {
  var j;
  var error = true;
  await fetch(`${server}/api/projects/${pid}`, {
    method: "put",
    body: JSON.stringify({ life_cycle: "In Progress" }),
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
        json = {
          msg: "Final Review declined successfully -> The project In Progress"
        };
      }
      j = json;
    })
    .catch(err => {
      console.log("Error", err);
      j = { msg: "Error" };
    });

  return j;
}

//sprint3 => 5- as partner i want to cancel my project
router.use("/:id/cancelproject/:pid", async (req, res) => {
  var error = true;
  console.log("here1")
  if (ObjectId.isValid(req.params.id) && ObjectId.isValid(req.params.pid)) {
    const partner = await PartnerInfo.findById(req.params.id);
    const project = await Project.findById(req.params.pid);
    var result ;
    if (partner && project) {
      if (project.companyID == req.params.id){
        if(project.life_cycle == "Negotiation" || project.life_cycle == "Final Draft" || 
             project.life_cycle == "Waiting For Consultancy Agency"){
          var error = true;
          await fetch(`${server}/api/projects/${req.params.pid}`, {
            method: "delete",
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
              json = { msg: "Project is canceled" };
            }
          })
          .catch(err => console.log("Error", err));
          // remove the project from array of projects for the partner
          var arrayOfProjects = partner["projects"];
          var comp = JSON.stringify(req.params.id)
          arrayOfProjects.splice(arrayOfProjects.indexOf(comp),1)
          console.log(arrayOfProjects)
          // update the array 
          var err = true;
          var k;
          await fetch(`${server}/api/partners/${req.params.id}`,{
            method : "PUT",
            body : JSON.stringify({projects : arrayOfProjects}),
            headers: { "Content-Type": "application/json" }
          })
          .then(res =>{
            console.log(res.status)
            if(res.status === 200){
             err = false
            }
            return res.json()
          })
          .then(json =>{
            if(!err && ! error){
              json = {msg: "canceled and removed from array"};
            }
             k = json 
          })
         .catch(err => {return err})
      } else return res.status(404).send({ error: "you cannot cancel this project" });
   } else return res.status(404).send({ error: "this project doesnot belong to you" });
    } else return res.status(404).send({ error: "invalid inputs" });
  } else return res.status(404).send({ error: "invalid inputs" });
  return res.json(k) ;
});


// as partner i want to send task orientation invitation
router.post("/:id/sendOrientationInvitations/:pid/", async (req, res) => {
  if (ObjectId.isValid(req.params.id) && ObjectId.isValid(req.params.pid)) {
    const partner = await PartnerInfo.findById(req.params.id);
    const project = await Project.findById(req.params.pid);
    if (partner && project) {
      if (project.companyID == req.params.id) {
        if (project.life_cycle == "Posted"){
          var i;
          var success = true;
          var today = new Date();
          var date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();
          const Applications = await Application.find()
          const candidates = Applications.filter(c => c.projectId == req.params.pid)
          var arr = new Array(candidates.length);
          for (i = 0; i < candidates.length; i++) {
            const m = await Member.findById(candidates[i].applicantId);
            const j = await Partnersendtask(candidates[i].applicantId,
              `${m.fname} ${m.mname} ${m.lname}`,
              req.body.description,
              req.params.pid,
              partner.name,
              date);
            arr[i] = j;
          }
          for (i = 0; i < candidates.length; i++){
            if (arr[i].msg != "task is sent successfully")
              success = false;
          }
          if (success)
            res.status(200).send({ msg: "Task Orientations are sent successfully" })
          else
            res.status(404).send({ msg: "Error occured" })
        } else return res.status(404).send({ msg: "Project has already started" });
      } else {
        return res.status(404).send({ msg: 'This project does not belong to you' });
      }
    } else return res.status(404).send({ msg: "inavalid inputs" });
  } else return res.status(404).send({ msg: "inavalid inputs" });
});

// 9 As a partner I want to send a task orientation invitation to applying candidates
async function Partnersendtask(mid,mname,description,pid,pname,date) {
  var error = true;
  const body = {
    senttoID: mid,
    sentto: mname,
    description: `get to know the project better through this session ${description}`,
    sentByID: pid,
    sentBy: pname,
    sentAt: date
  }; 
  var j;
  await fetch(`${server}/api/orientationinvitations/`, {
    method: "post",
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
        json = { msg: "task is sent successfully" };
      }
      j = json;
    })
    .catch(err => console.log("Error", err));

  return j;
}

  //as a partner i want to show my events
router.get("/:id/ShowMyEvents", async (req, res) => {
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    const partners = await PartnerInfo.findById(id);

    if (partners) {
      const e =await event.find()
      const Myevents=e.filter(m=>m.requestorId==id);
      if(Myevents.length===0){
        res.send({msg: "NO Events to show"});}
        else{
           res.json({ data:Myevents });}
    } else {
      return res.status(404).send({ msg: "Partner not found" });
    }
  } else {
    return res.status(404).send({ msg: "Partner not found" });
  }
});
module.exports = router;
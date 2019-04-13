const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Project = require("../../models/Project");
const event = require("../../models/Event");
const Partner = require("../../models/Partner");
const fetch = require("node-fetch");
const server = require("../../config/config");
const Member = require("../../models/Member");
const Event = require("../../models/Event");
const validator = require("../../validations/partnerValidations");
const ObjectId = require("mongodb").ObjectID;

mongoose.set("useFindAndModify", false);

// -- CRUDS
router.get("/", async (req, res) => {
  const partners = await Partner.find();
  res.json({ data: partners });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    // it's an ObjectID

    const partners = await Partner.findById(id);
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
    const isValidated = validator.createValidationPartner(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const newPartner = await Partner.create(req.body);
    res.json({ msg: "Partner was created successfully", data: newPartner });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const isValidated = validator.updateValidationPartner(req.body);
      if (isValidated.error)
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message });
      const updatedPartner = await Partner.findByIdAndUpdate(
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

router.delete("/:id", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const deletedPartner = await Partner.findByIdAndRemove(id);
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

//------------------------------------------------------

//1.0 as a partner i want to submit a description of a task/project
router.post("/:id/addProject", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const partners = await Partner.findById(req.params.id);
      if (partners) {
        if (
          req.body.description != null &&
          req.body.category != null &&
          req.body.wantConsultancy != null
        ) {
          const company_id = req.params.id;
          var life;
          var date = Date.now();
          if (req.body.wantConsultancy == true) {
            life = "Waiting for consultancy Agency";
          } else {
            life = "Negotiation";
          }
          var result;
          var error = true;
          const Project = {
            description: req.body.description,
            companyId: company_id,
            category: req.body.category,
            wantConsultancy: req.body.wantConsultancy,
            postedDate: date,
            lifeCycle: life
          };
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
                json = { msg: `Project Submitted Successfully` };
              }
              result = json;
              console.log(json);
            })
            .catch(err => console.log("Error", err));
          res.json(result);
        } else
          return res.status(400).send({ error: "body is missing attrubites" });
      } else
        return res
          .status(400)
          .json({ msg: `a partner  with id ${id} not found` });
    } else
      return res
        .status(404)
        .send({ error: `a partner  with id ${id} not found` });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error");
  }
});
//--------------------------------------------------------

// as a partner i want to submit a request to organize an event
router.post("/:id/eventrequests/", async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const p = await Partner.findById(req.params.id);
    if (p) {
      if (
        req.body.requestorId != null &&
        req.body.description != null &&
        req.body.eventType != null &&
        req.body.eventLocation != null &&
        req.body.eventDate != null
      ) {
        const j = await PartnerRequestEvent(
          req.params.id,
          req.body.description,
          req.body.eventType,
          req.body.eventLocation,
          req.body.eventDate
        );
        console.log(j);
        res.send(j);
      } else {
        return res.status(400).send({ error: "body is missing attrubites" });
      }
    } else return res.status(404).send({ error: "Partner does not exist" });
  } else return res.status(404).send({ error: "Partner does not exist" });
});

async function PartnerRequestEvent(
  rid,
  description,
  eventType,
  eventLocation,
  eventDate
) {
  const body = {
    requestorId: rid,
    description: description,
    eventType: eventType,
    eventLocation: eventLocation,
    eventDate: eventDate,
    isAccepted: "false"
  };
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
      console.log(json);
      j = json;
    })
    .catch(err => console.log("Error", err));
  return j;
}
//--------------------------------------------------------------------
// as a partner i want to delete a task or a project
router.delete("/:id/deleteProject/:pid/", async (req, res) => {
  const p = await Project.findById(req.params.pid);
  if (p.companyId == req.params.id) {
    const j = await deleteProject(req.params.pid);
    console.log(j);
    return res.json(j);
  } else {
    res.json({ msg: "error , this is not your project :(" });
  }
});
async function deleteProject(id) {
  var error = true;
  var result;
  const pr = await Project.findById(id);
  if (
    pr.lifeCycle !== "Posted" &&
    pr.lifeCycle !== "Final Review" &&
    pr.lifeCycle !== "Finished"
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
      })
      .then(json => {
        if (!error) {
          json = { msg: "Project Deleted" };
        }
        result = json;
        console.log(json);
      })
      .catch(err => console.log("Error", err));
    return result;
  } else {
    return { error: "Project can not be deleted" };
  }
}
//-------------------------------------------

// as a partner i want to edit my project
router.put("/:id/editProject/:pid/", async (req, res) => {
  const p = await Project.findById(req.params.pid);
  if (p.companyId == req.params.id) {
    const j = await editProject(req.params.pid, req.body);
    return res.json(j);
  } else {
    res.json({ msg: "error" });
  }
});
async function editProject(id, body) {
  var error = true;
  var j;
  const pr = await Project.findById(id);
  if (
    pr.lifeCycle !== "Posted" &&
    pr.lifeCycle !== "Final Review" &&
    pr.lifeCycle !== "Finished"
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
      })
      .then(json => {
        if (!error) {
          json = { msg: "Project Edited" };
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
//--------------------------------------------------------

//1.5 As a partner I want to review the final work of the candidate who is working on my task/project. NotWorking
router.get("/:id/ShowFinalDraft", async (req, res) => {
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    const partners = await Partner.findById(id);

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
        m => m.companyId === partnerid && m.lifeCycle === "Final Review"
      );
      result = hisProjects;
      return hisProjects;
    })
    .catch(err => console.log("Error", err));
  return result;
}
//------------------------------------------------

// as a partner i want to assign ca to project
router.put("/:id3/project/:id1/AssignCAtoProject/:id2", async (req, res) => {
  const projID = req.params.id1;
  const caId = req.params.id2;
  const part = req.params.id3;
  if (
    ObjectId.isValid(projID) &&
    ObjectId.isValid(caId) &&
    ObjectId.isValid(part)
  ) {
    const project = await Project.findById(projID);
    const consultancy = await ConsultancyAgency.findById(caId);
    const partner = await Partner.findById(part);
    if (project && consultancy && partner) {
      var consul = project.applyingCA;
      var found = false;
      var same1 = project.companyId;
      var same2 = req.params.id3;
      if (same1 == same2) {
        for (var i = 0; consul.length > i; i++) {
          if (caId == consul[i]) {
            found = true;
            break;
          }
        }
        var need = project.wantConsultancy;
        if (need === true) {
          if (found === true) {
            const j = await assigning(caId, projID);
            res.status(200).send(j);
          } else {
            res.send({
              msg: "consultancy agency is not included in the list "
            });
          }
        } else {
          res.send({ msg: "Project doesn't need a consultancy" });
        }
      } else {
        res.send({ msg: "Partner is not the owner of the Project to edit" });
      }
    } else return res.status(404).send({ error: "invalid ID" });
  } else {
    return res.status(404).send({ error: "invalid ID" });
  }
});

async function assigning(caId, projID) {
  var error = true;
  const body = { consultancyId: caId };
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
//---------------------------------------------------------

//1.2 as a partner i want to approve the finaldraft modified check on his project and partner can approve if he wants CA
router.put("/:id1/myprojects/:id2/finaldraft/approve", async (req, res) => {
  const part = req.params.id1;
  const proj = req.params.id2;
  if (ObjectId.isValid(part) && ObjectId.isValid(proj)) {
    const partner = await Partner.findById(part);
    const project = await Project.findById(proj);
    console.log(partner);
    console.log(project);

    if (partner && project) {

      if(partner._id.toString()==project.companyId.toString()){
      var app = project.lifeCycle;
        if (app == "Final Draft") {
          const decision = "Approved";
          const j = await ApproveProject(proj, decision);
          res.send(j);
        } else {
          return res
            .status(404)
            .send({ error: "Not in the Final Draft to approve" });
        }
    }else{
      return res.status(404).send({error:"not your project"});
    }
    } else return res.status(404).send({ error: "invalid ID" });
  } else {
    return res.status(404).send({ error: "invalid ID" });
  }
});

async function ApproveProject(id, decision) {
  const url = `${server}/api/projects/${id}`;
  var j;
  await fetch(url, {
    method: "put",
    body: JSON.stringify({ lifeCycle: decision }),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      console.log(res.status);
      return res.json();
    })
    .then(json => {
      console.log(json);
      j = json;
    })
    .catch(err => {
      console.log(err);
    });
  return j;
}
//-------------------------------------------------------

//1.2 as a partner i want to disapprove
router.put("/:id/myprojects/:pid/finaldraft/disapprove", async (req, res) => {
  const part = req.params.id;
  const proj = req.params.pid;
  if (ObjectId.isValid(part) && ObjectId.isValid(proj)) {
    const partner = await Partner.findById(part);
    const project = await Project.findById(proj);
    if (partner && project) {
      if(partner._id.toString()==project.companyId.toString()){
      var dis = project.lifeCycle;
        if (dis == "Final Draft") {
          const decision = "Negotiation";
          const j = await disapproveProject(proj, decision);
          res.send(j);
        } else {
          return res
            .status(404)
            .send({ error: "No Final Draft to Disapprove it " });
        }
    }else{
      return res.status(404).send({error:"not your project"})
    }
  } else return res.status(404).send({ error: "invalid ID" });
  } else {
    return res.status(404).send({ error: "invalid ID" });
  }
});
async function disapproveProject(id, decision) {
  var j;
  const url = `${server}/api/projects/${id}`;
  await fetch(url, {
    method: "put",
    body: JSON.stringify({ lifeCycle: decision }),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      console.log(res.status);
      return res.json();
    })
    .then(json => {
      console.log(json);
      j = json;
    })
    .catch(err => {
      console.log(err);
    });
  return j;
}
//-----------------------------------




// 10 As a patrner I want to give the attendees a form to rate the event and give a feedback
router.post("/:pid/rating/:eid/", async (req, res) => {
  if (ObjectId.isValid(req.params.pid) && ObjectId.isValid(req.params.eid)) {
    const partner = await Partner.findById(req.params.pid);
    const event = await Event.findById(req.params.eid);
    if (partner && event) {
      if (event.requestorId == req.params.pid) {
        var i;
        var success = true;
        var date = Date.now();
        const attendees = event.bookedMembers;
        var arr = new Array(attendees.length);
        for (i = 0; i < attendees.length; i++) {
          const j = await Partnerrequestrating(
            event.formLink,
            attendees[i],
            date
          );
          arr[i] = j;
        }
        for (i = 0; i < attendees.length; i++) {
          if (arr[i].msg != "Notifications are sent successfully")
            success = false;
        }
        if (success) res.json({ msg: "Notifications are sent successfully" });
        else res.json({ msg: "Error occured" });
      } else {
        return res
          .status(400)
          .send({ error: "this Event does not belong to you" });
      }
    } else return res.status(404).send({ error: "inavalid inputs" });
  } else return res.status(404).send({ error: "inavalid inputs" });
});
async function Partnerrequestrating(formLink, id, date) {
  var error = true;
  const body = {
    description: `please rate thie event through this form ${formLink}`,
    notifiedPerson: id,
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
//----------------------------


// as a partner i want to view my projects
router.get("/:id/myProjects", async (req, res) => {
  const id = req.params.id;
  if (ObjectId.isValid(id)) {
    const partner = await Partner.findById(id);
    if (partner) {
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
            myprojects => myprojects.companyId === id
          );
          res.json({ data: proj });
        })
        .catch(err => console.log("Error", err));
    } else {
      return res.status(404).send({ error: "Partner not found" });
    }
  } else {
    return res.status(404).send({ error: "ID not found" });
  }
});
//---------------------------------------------------


// -- 7 As a partner I wanto to approve/disapprove the final review of a project

router.put("/:id/myprojects/:pid/finalreview/approve", async (req, res) => {
  try {
    const par = await Partner.findById(req.params.id);
    const proj = await Project.findById(req.params.pid);
    if (par && proj) {
      if (proj.companyId == req.params.id) {
        if (proj.lifeCycle === "Final Review") {
          const j = await acceptFinalReview(req.params.pid);
          console.log(j);
          res.send(j);
        } else {
          //not final review
          res.status(400).send({
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
    body: JSON.stringify({ lifeCycle: "Finished" }),
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
    const par = await Partner.findById(req.params.id);
    const proj = await Project.findById(req.params.pid);
    if (par && proj) {
      if (proj.companyId == req.params.id) {
        if (proj.lifeCycle === "Final Review") {
          const j = await declineFinalReview(req.params.pid);
          res.json(j);
        } else {
          //not final review
          res.status(400).send({
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
    body: JSON.stringify({ lifeCycle: "In Progress" }),
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
//--------------------------- 

//as partner i want to cancel my project
router.use("/:id/cancelproject/:pid", async (req, res) => {
  var error = true;
  if (ObjectId.isValid(req.params.id) && ObjectId.isValid(req.params.pid)) {
    const partner = await Partner.findById(req.params.id);
    const project = await Project.findById(req.params.pid);
    var result;
    if (partner && project) {
      if (project.companyId == req.params.id) {
        if (
          project.lifeCycle == "Negotiation" ||
          project.lifeCycle == "Final Draft" ||
          project.lifeCycle == "Waiting For Consultancy Agency"
        ) {
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
          var comp = JSON.stringify(req.params.id);
          arrayOfProjects.splice(arrayOfProjects.indexOf(comp), 1);
          console.log(arrayOfProjects);
          // update the array
          var err = true;
          var k;
          await fetch(`${server}/api/partners/${req.params.id}`, {
            method: "PUT",
            body: JSON.stringify({ projects: arrayOfProjects }),
            headers: { "Content-Type": "application/json" }
          })
            .then(res => {
              console.log(res.status);
              if (res.status === 200) {
                err = false;
              }
              return res.json();
            })
            .then(json => {
              if (!err && !error) {
                json = { msg: "canceled and removed from array" };
              }
              k = json;
            })
            .catch(err => {
              return err;
            });
        } else
          return res
            .status(404)
            .send({ error: "you cannot cancel this project" });
      } else
        return res
          .status(404)
          .send({ error: "this project does not belong to you" });
    } else return res.status(404).send({ error: "invalid inputs" });
  } else return res.status(404).send({ error: "invalid inputs" });
  return res.json(k);
});
//---------------


// as partner i want to send task orientation invitation
router.post("/:id/sendOrientationInvitations/:pid/", async (req, res) => {
  if (ObjectId.isValid(req.params.id) && ObjectId.isValid(req.params.pid)) {
    const partner = await Partner.findById(req.params.id);
    const project = await Project.findById(req.params.pid);
    if (partner && project) {
      if (project.companyId == req.params.id) {
        if (project.lifeCycle == "Posted") {
          var i;
          var success = true;
          var today = new Date();
          var date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();
          const Applications = await Application.find();
          const candidates = Applications.filter(
            c => c.projectId == req.params.pid
          );
          var arr = new Array(candidates.length);
          for (i = 0; i < candidates.length; i++) {
            const m = await Member.findById(candidates[i].applicantId);
            const j = await Partnersendtask(
              candidates[i].applicantId,
              req.body.description,
              req.params.pid,
              date
            );
            arr[i] = j;
          }
          for (i = 0; i < candidates.length; i++) {
            if (arr[i].msg != "task is sent successfully") success = false;
          }
          if (success)
            res
              .status(200)
              .send({ msg: "Task Orientations are sent successfully" });
          else res.status(404).send({ msg: "Error occured" });
        } else
          return res.status(404).send({ msg: "Project has already started" });
      } else {
        return res
          .status(404)
          .send({ msg: "This project does not belong to you" });
      }
    } else return res.status(404).send({ msg: "inavalid inputs" });
  } else return res.status(404).send({ msg: "inavalid inputs" });
});

async function Partnersendtask(mid, description, pid, date) {
  var error = true;
  const body = {
    sentToID: mid,
    description: `get to know the project better through this session ${description}`,
    sentByID: pid,
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
//----------------------------------------------------------------



//as a partner i want to show my events
router.get("/:id/ShowMyEvents", async (req, res) => {
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    const partner = await Partner.findById(id);

    if (partner) {
      const e = await event.find();
      const Myevents = e.filter(m => m.requestorId == id);
      if (Myevents.length === 0) {
        res.send({ msg: "NO Events to show" });
      } else {
        res.json({ data: Myevents });
      }
    } else {
      return res.status(404).send({ msg: "Partner not found" });
    }
  } else {
    return res.status(404).send({ msg: "Partner not found" });
  }
});
router.get("/:id/viewAllProjects",async (req,res)=>{
  const partner = await Partner.findById(req.params.id);
  if(partner){
    var projects = await Project.find();
    arr=["Posted","In Progress","Final Review","Finished"]
    projects = projects.filter((p) => p.companyId.toString()==partner._id.toString()||arr.includes(p.lifeCycle))
    res.json({data:projects})
  }else{
    return res.status(404).send({error:"not a member id"})
  }
})
// assign a member to a project
router.put(
  "/:id/myProjects/:pid/applyingMembers/:mid/assign",
  async (req, res) => {
    if(ObjectId.isValid(req.params.id)&&ObjectId.isValid(req.params.pid)&&ObjectId.isValid(req.params.mid)){
    const cid = await Partner.findById(req.params.id);
    const pid= await Project.findById(req.params.pid);
    const mid= await Member.findById(req.params.mid);
    if(cid!=null && pid!=null && mid!=null){
      if(req.params.id.toString()===pid.companyId.toString()){
    const members = await getApplyingMembers(req.params.pid);
    console.log(members);
    if (req.params.mid != null) {
      candidatID = req.params.mid;
    } else {
      return res.status(400).send({ error: "Please enter Memeber ID" });
    }
    const canBeAssigned = members.includes(candidatID);
    var j;
    if (canBeAssigned) {
      j = await assignCandidate(req.params.pid, candidatID);
      var projects = mid.projects;
      projects.push(req.params.pid);
      const body = {projects}
      await fetch(`${server}/api/members/${candidatID}`, {
        method: "put",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
      })
      res.send(j);
    } else {
      res
        .status(400)
        .send({ error: "Candidate did not apply on this project" });
    }
  }else{
    res.status(400).send({error:"not your project"})
  }
}
  else{
    res.status(404).send({error:"the ids requested doesnt exist"})

  }
}
else{
  res.status(404).send({error:"error in ids"})
}
}
);
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

// View candidates applying for a project
router.get("/:id/myProjects/:pid/applyingMembers", async (req, res) => {
  if(ObjectId.isValid(req.params.id)&&ObjectId.isValid(req.params.pid)){
  const partnerId = await Partner.findById(req.params.id);
  const pid= await Project.findById(req.params.pid);
 if(partnerId!=null && pid!=null){
   if (pid.companyId.toString() === req.params.id.toString()){
  var j = await getApplyingMembers(req.params.pid);
  var result = [];
  var i;
  for (i = 0; i < j.length; i++) {
    await fetch(`${server}/api/members/${j[i]}`)
      .then(res => res.json())
      .then(json => {
        const member = json.data;
        result.push(member);
      })
      .catch(err => console.log("Error", err));
  }
  if (result.length === 0) {
    res.status(404).send({error: "No members applied for this project"})
  } else {
    res.json({ data: result });
  }
}
else res.status(404).send({error:"this project isnt assigned to you"})
}
else{
  res.status(404).send({error:"the ids requested doesnt exist"})
}

}else{
  res.status(404).send({error:"error in the ids"})
}


});

async function getApplyingMembers(pid) {
  var result = [];
  await fetch(`${server}/api/applications`)
    .then(res => res.json())
    .then(json => {
      const members = json.data;
      const appliedmembers = members.filter(m => m.projectId == pid);
      appliedmembers.forEach(m => {
        result.push(m.applicantId);
      });
      return result;
    })
    .catch(err => console.log("Error", err));
  return result;
}






module.exports = router;

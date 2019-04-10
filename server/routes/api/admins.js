const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//FETCH REQUIERMENTS
const fetch = require("node-fetch");
const server = require("../../config/config");

const Admin = require("../../models/Admin");
const member = require("../../models/member");
const Event = require("../../models/Event");
const Application = require("../../models/Application");
const Project = require("../../models/Project");

const validator = require("../../validations/adminValidations");
const notificationValidator = require("../../validations/memberValidations");

const ObjectId = require("mongodb").ObjectID;
mongoose.set("useFindAndModify", false);
//CRUDS
router.get("/", async (req, res) => {
  const admins = await Admin.find();
  res.json({ data: admins });
});

router.get("/:id", async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const id = req.params.id;
    const admin = await Admin.findById(id);
    if (admin) {
      res.json({ data: admin });
    } else {
      return res.status(404).send({ error: "NO admin with this id" });
    }
  } else return res.status(404).send({ error: "ID ERROR" });
});
router.post("/", async (req, res) => {
  try {
    const isValidated = validator.createValidationAdmin(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const newAdmin = await Admin.create(req.body);
    res.json({ msg: "Admin was created successfully", data: newAdmin });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error");
  }
});
router.put("/:id", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const updatedAdmin = await Admin.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      );
      if (!updatedAdmin)
        return res.status(404).send({ error: "Admin does not exist" });
      res.json({ msg: "Admin updated successfully" });
    } else {
      return res.status(404).send({ error: "Not an admin id" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "Admin does not exist" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const deletedAdmin = await Admin.findByIdAndRemove(id);
      if (!deletedAdmin)
        return res.status(404).send({ error: "Admin does not exist" });
      res.json({ msg: "Admin was deleted successfully", data: deletedAdmin });
    } else {
      return res.status(404).send({ error: "Admin does not exist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error");
  }
});
//-----------------------------------

//3 --As an admin I want to further check the description of a task/project so that it will be posted for candidates to apply.
router.get("/:aid/pdescription/:id/", async (req, res) => {
  if (ObjectId.isValid(req.params.aid) && ObjectId.isValid(req.params.id)) {
    const projects = await Project.findById(req.params.id);
    const admin = await Admin.findById(req.params.aid);
    if (admin) {
      if (projects) {
        res.json(projects.description);
      } else return res.status(404).send({ error: "Project does not exist" });
    } else return res.status(404).send({ error: "Not an Admin" });
  } else return res.status(404).send({ error: "Invalid Inputs" });
});
//--------------------------------------------

//3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project
router.post("/:aid/notifications/:id/", async (req, res) => {
  if (ObjectId.isValid(req.params.aid) && ObjectId.isValid(req.params.id)) {
    const cid = await member.findById(req.params.id);
    const admin = await Admin.findById(req.params.aid);
    if (admin) {
      if (cid) {
        if (req.body.description != null) {
          var date = Date.now();
          const j = await AdminNotifyAcceptedCandidate(
            req.params.aid,
            req.body.description,
            req.params.id,
            date
          );
          res.status(200).send(j);
        } else {
          return res.status(400).send({ error: '"description" is required' });
        }
      } else return res.status(404).send({ error: "Member does not exist" });
    } else return res.status(404).send({ error: "Not an Admin" });
  } else return res.status(404).send({ error: "Member does not exist" });
});
async function AdminNotifyAcceptedCandidate(
  sentBy,
  description,
  NotifiedPerson,
  date
) {
  const body = {
    sentById,
    description: description,
    NotifiedPerson: NotifiedPerson,
    date: date,
    seen: "false"
  };
  var error = true;
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
        json = { msg: "Notification is sent successfully" };
      }
      j = json;
    })
    .catch(err => console.log("Error", err));

  return j;
}
//-------------------------------

// 3.1 As an admin i want to identify a task/project  with a set of attributes so that it defines it
router.put("/:id/assignAttributes/:pid", async (req, res) => {
  if (ObjectId.isValid(req.params.id) && ObjectId.isValid(req.params.pid)) {
    const admin = await Admin.findById(req.params.id);
    const project = await Project.findById(req.params.pid);
    if (admin && project) {
      const j = await assignAttributes(req.params.pid, req.body);
      res.status(200).send(j);
    } else return res.status(404).send({ error: "invalid inputs" });
  } else {
    return res.status(404).send({ error: "invalid inputs" });
  }
});
async function assignAttributes(pid, body) {
  var error = true;
  var j;
  await fetch(`${server}/api/projects/${pid}`, {
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
        json = { msg: "Attributes identified successfully" };
      }
      j = json;
    })
    .catch(err => console.log("Error", err));
  return j;
}
//--------------------------------------------

//3.2 --As an admin I want to send a final draft of the task/project so that the partner can approve posting it.
router.put("/:id/myProjects/:pid/sendDraft", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id) && ObjectId.isValid(req.params.pid)) {
      if (req.body.final_draft != null) {
        const j = await sendFinalDraft(req.params.pid, req.body.final_draft);
        res.status(200).send(j);
      } else {
        return res.status(400).send({ error: "Please insert the final draft" });
      }
    } else {
      return res.status(404).send({ error: "ID NOT FOUND" });
    }
  } catch {
    console.log(error);
    return res.status(404).send({ error: "not a project id" });
  }
});

async function sendFinalDraft(projectID, draft) {
  const body = {
    life_cycle: "Final Draft",
    final_draft: draft
  };
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
      return res.json();
    })
    .then(json => {
      if (!error) {
        json = { msg: "Final draft sent to partner successfully" };
      }
      j = json;
    })
    .catch(err => {
      console.log("Error", err);
      j = { msg: "Error" };
    });

  return j;
}
//--------------------------------------------------

//3.3 --As an admin I want to post the task/project to the website so that candidates can apply for it.
router.put("/:id/postProject/:pid", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id) && ObjectId.isValid(req.params.pid)) {
      const project = await Project.findById(req.params.pid);
      if (project.life_cycle == "Approved") {
        const j = await postProject(req.params.pid);
        res.send(j);
      } else {
        return res.status(404).send({ error: "project is not approved yet" });
      }
    } else {
      return res.status(404).send({ error: "ID NOT FOUND" });
    }
  } catch {
    console.log(error);
    return res.status(404).send({ error: "not a project id" });
  }
});
async function postProject(id) {
  const body = { life_cycle: "Posted" };
  var error = true;
  var result;

  await fetch(`${server}/api/projects/${id}`, {
    method: "put",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
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
        json = { msg: "Project is posted successfully" };
      }
      result = json;
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  return result;
}
//--------------------------------------------

//as an admin i want to create an event
router.post("/:id/addEvent/", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const admin = await Admin.findById(req.params.id);
      if (admin) {
        const j = await addEvent(req.body);
        res.status(200).send(j);
      } else {
        return res.status(404).send({ error: "not an admin id" });
      }
    } else {
      return res.status(404).send({ error: "Error" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error");
  }
});
async function addEvent(body) {
  var error = true;
  var result;

  await fetch(`${server}/api/events/`, {
    method: "post",
    body: JSON.stringify(body),
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
        json = { msg: "Event is posted successfully" };
      }
      result = json;
      console.log(json);
    })
    .catch(err => console.log("Error", err));
  return result;
}

//---------------------------------------

// 3.7 As an admin i want to decide (Accept / reject) an event request
router.use("/:id/EventRequest/:Eid/:decision", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id) && ObjectId.isValid(req.params.Eid)) {
      admin = await Admin.findById(req.params.id);
      if (admin) {
        if (
          req.params.decision == "Approve" ||
          req.params.decision == "DisApprove"
        ) {
          await decideEventRequest(req.params.Eid, req.params.decision);
        }else{
          return res.status(404).send({error:"your decision must be Approve or DisApprove"})
        }
      } else {
        return res.status(404).send({ error: "Not an admin id" });
      }
    } else {
      return res.status(404).send({ msg: "invalid inputs" });
    }
  } catch {
    console.log(error);
  }
});

async function decideEventRequest(id, decision) {
  const url = `${server}/api/eventrequests/${id}`;
  await fetch(url, {
    method: "put",
    body: JSON.stringify({ isAccepted: decision }),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      console.log(res.status);
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => {
      console.log(err);
    });
}
//-----------


// 3.4 as an admin i want to assign one of the candidates who applied for the task/project
router.use("/:aid/assign/:pid/to/:mid", async (req, res) => {
  try {
    if (
      ObjectId.isValid(req.params.aid) &&
      ObjectId.isValid(req.params.pid) &&
      ObjectId.isValid(req.params.mid)
    ) {
      const admin = Admin.findById(req.params.aid);
      if(admin){
      const applications = await Application.find();

      var found = false;
      //loop through json and find the desired application

      for (var i in applications) {
        let application = applications[i];
        if (
          application["applicantId"] == req.params.mid &&
          application["projectId"] == req.params.pid
        ) {
          found = true;
          break;
        }
      }
      if (found) {
        const url = `${server}/api/projects/${req.params.pid}`;
        fetch(url, {
          method: "put",
          body: JSON.stringify({ memberID: req.params.mid }),
          headers: { "Content-Type": "application/json" }
        })
          .then(res => {
            return res.json();
          })
          .then(json => {
            console.log(json);
          })
          .catch(err => {
            console.log(err);
          });
        return res.status(200).send({ msg: "Member has been assigned" });
      } else return res.status(404).send({ msg: "no application found" });
    }else{
      return res.status(404).send({error:"not an admin id"});
    }
   } else {
      return res.status(404).send({ msg: "invalid inputs" });
    }
  } catch {
    console.log("error happened");
    res.status(404).send({ msg: "Error in catch block" });
  }
});

//------------------------------


// sprint3 #13  As an admin I want to give the attendees a form to rate the event and give a feedback.
router.post("/:id/events/:id2/sendFeedBackForm", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).send({ error: "Not an admin id" });
    } else {
      const event = await Event.findById(req.params.id2);
      if (!event) {
        return res.status(404).send({ error: "Not an event id" });
      } else {
        return res.send({
          data: await sendFeedBack(event.formLink, req.params.id2,req.params.id)
        });
      }
    }
  } catch (error) {
    return res.status(400).send("Error");
  }
});

async function sendFeedBack(formLink, eventId,sentBy) {
  var error = true;
  var result;
  let myEvent = await Event.findById(eventId);
  let attendingMembers = myEvent.bookedMembers;
  var i;
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  for (i = 0; i < attendingMembers.length; i++) {
    const body = {
      sentBy,
      description: formLink,
      NotifiedPerson: attendingMembers[i],
      date: date,
      seen: "false"
    };

    await fetch(`${server}/api/notifications/`, {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
      // .then(checkStatus)
      .then(res => {
        if (res.status === 200) {
          error = false;
        }
        if (!error) {
          result = res;
        }
      })
      .then(json => {
        if (!error) {
          json = attendingMembers;
        }
        result = json;
      })
      .catch(err => console.log("Error", err));
  }
  return result;
}

//--------------------------------------

// sprint3 #14 As a rejected candidate I want to be notified that I was rejected for a task/project so that I start looking for other tasks/projects.
router.post("/:id/projects/:id2/sendRejection", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      res.send({ error: "Not an admin id" });
    } else {
      const project = await Project.findById(req.params.id2);
      if (!project) {
        res.send({ error: "Not a project id" });
      } else {
        return res.send({
          data: await sendRejectionNotification(req.params.id2,sentBy)
        });
      }
    }
  } catch (error) {
    return res.status(400).send("Error");
  }
});
async function sendRejectionNotification(projectId,sentBy) {
  const project = await Project.findById(projectId);
  if (!project) {
    return { msg: "there is no Such project" };
  }
  const allApplications = await Application.find();
  let myProjectApplications = [];
  var i;
  var result;
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  for (i = 0; i < allApplications.length; i++) {
    if (allApplications[i].projectId == projectId) {
      myProjectApplications.push(allApplications[i].applicantId);
    }
  }
  for (i = 0; i < myProjectApplications.length; i++) {
    if (project.memberID.toString() !== myProjectApplications[i].toString()) {
      const body = {
        sentBy,
        description:
          "Sorry u were not accepted for project {" + project.description + "}",
        NotifiedPerson: myProjectApplications[i],
        date: date,
        seen: "false"
      };

      await fetch(`${server}/api/notifications/`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
      })
        // .then(checkStatus)
        .then(res => {
          if (res.status === 200) {
            error = false;
          }
          if (!error) {
            result = res;
          }
        })
        .then(json => {
          if (!error) {
            json = myProjectApplications.filter(
              myProjectApplications =>
                project.memberID.toString() !== myProjectApplications.toString()
            );
          }
          result = json;
        })
        .catch(err => console.log("Error", err));
    }
  }
  return result;
}
//sprint 3 = >as admin i want to view all applications
router.get(`/:id/applications`, async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const admin = await Admin.findById(req.params.id);
    if (admin) {
      var result;
      const url = `${server}/api/applications`;
      await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      })
        .then(res => {
          return res.json();
        })
        .then(json => {
          result = json;
        })
        .catch(err => {
          return err;
        });
    } else {
      return res.status(404).send({ msg: "admin not found" });
    }
  } else {
    return res.status(404).send({ msg: "not found" });
  }
  return res.json(result);
});
//-------------------

//as an admin i want to view all eventrequests
router.get("/:id/eventRequests", async (req, res) => {
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    const admin = await Admin.findById(id);
    if (admin) {
      await fetch(`${server}/api/eventrequests`)
        .then(res => res.json())
        .then(json => {
          const eventrequests = json.data;
          res.json({ data: eventrequests });
        })
        .catch(err => console.log("Error", err));
    } else {
      return res.status(404).send({ error: "Admin not found" });
    }
  } else {
    return res.status(404).send({ error: "ID not found" });
  }
});

//as an admin i want to see all ca
router.get("/:id/ShowAllCA", async (req, res) => {
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    const admin = await Admin.findById(id);
    if (admin) {
      await fetch(`${server}/api/ConsultancyAgency`)
        .then(res => res.json())
        .then(json => {
          const ca = json.data;
          res.json({ data: ca });
        })
        .catch(err => console.log("Error", err));
    } else {
      return res.status(404).send({ error: "Admin not found" });
    }
  } else {
    return res.status(404).send({ error: "ID not found" });
  }
});

// 21- As an admin i want to view all Events

router.get("/:id/ShowAllEvents", async (req, res) => {
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    const admin = await Admin.findById(id);
    if (admin) {
      await fetch(`${server}/api/events`)
        .then(res => res.json())
        .then(json => {
          const events = json.data;
          res.json({ data: events });
        })
        .catch(err => console.log("Error", err));
    } else {
      return res.status(404).send({ error: "Admin not found" });
    }
  } else {
    return res.status(404).send({ error: "ID not found" });
  }
});

//As an admin i want to view all members

router.get("/:id/ShowAllMembers", async (req, res) => {
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    const admin = await Admin.findById(id);
    if (admin) {
      await fetch(`${server}/api/member`)
        .then(res => res.json())
        .then(json => {
          const member = json.data;
          res.json({ data: member });
        })
        .catch(err => console.log("Error", err));
    } else {
      return res.status(404).send({ error: "Admin not found" });
    }
  } else {
    return res.status(404).send({ error: "ID not found" });
  }
});

//get all projects
router.get("/:id/projects", async (req, res) => {
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    const admin = await Admin.findById(id);
    if (admin) {
      await fetch(`${server}/api/projects`)
        .then(res => res.json())
        .then(json => {
          const projects = json.data;
          res.json({ data: projects });
        })
        .catch(err => console.log("Error", err));
    } else {
      return res.status(404).send({ error: "Admin not found" });
    }
  } else {
    return res.status(404).send({ error: "ID not found" });
  }
});

module.exports = router;

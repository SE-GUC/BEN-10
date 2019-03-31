const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//FETCH REQUIERMENTS
const fetch = require("node-fetch");
const server = require("../../config/config");

const Admin = require("../../models/Admin");
const member = require("../../models/member");
const validator = require("../../validations/adminValidations");
const notificationValidator = require("../../validations/memberValidations");

const ObjectId = require("mongodb").ObjectID;
mongoose.set("useFindAndModify", false);

router.get("/", async (req, res) => {
  const admins = await Admin.find();
  res.json({ data: admins });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const admins = await Admin.findById(id);
  res.json({ data: admins });
});

//3 --As an admin I want to further check the description of a task/project so that it will be posted for candidates to apply.
router.get("/pdescription/:id/", async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const projects = await Project.findById(req.params.id);
    if (projects) {
      res.json(projects.description);
    } else {
      return res.status(404).send({ error: "Project does not exist" });
    }
  } else return res.status(404).send({ error: "Project does not exist" });
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const admins = await Admin.findById(id);
  res.json({ data: admins });
});

// Create an admin
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

//3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project
router.post("/notifications/:id/", async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const cid = await member.findById(req.params.id);
    if (cid) {
      if (req.body.description != null) {
        var today = new Date();
        var date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        const j = await AdminNotifyAcceptedCandidate(
          req.body.description,
          req.params.id,
          date
        );
        res.status(200).send(j);
      } else {
        return res.status(400).send({ error: '"description" is required' });
      }
    } else return res.status(404).send({ error: "Member does not exist" });
  } else return res.status(404).send({ error: "Member does not exist" });
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

//3.2 --As an admin I want to send a final draft of the task/project so that the partner can approve posting it.
router.put("/:id/myProjects/:pid/sendDraft", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id) && ObjectId.isValid(req.params.pid)) {
      if (req.body.final_draft != null) {
        const j = await sendFinalDraft(req.params.pid, req.body.final_draft);
        res.status(200).send(j);
      } else {
        return res.status(400).send({ error: "Please insert thr final" });
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

//3.3 --As an admin I want to post the task/project to the website so that candidates can apply for it.
router.put("/:id/postProject/:pid", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id) && ObjectId.isValid(req.params.pid)) {
      const j = await postProject(req.params.pid);
      res.status(200).send(j);
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
  var j;

  await fetch(`${server}/api/projects/${id}`, {
    method: "put",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    // .then(checkStatus)
    .then(res => {
      if (res.status === 200) {
        error = false;
      }

      return res.json();
    })
    .then(json => {
      if (!error) {
        json = { msg: "Project is posted successfully" };
      }
      j = json;
    })
    .catch(err => {
      console.log("Error", err);
      j = { msg: "Error" };
    });

  return j;
}

router.post("/:id/addEvent/", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const j = await addEvent(req.body);
      res.status(200).send(j);
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
router.use("/:id/EventRequest/:Eid/:decision", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id) && ObjectId.isValid(req.params.Eid)) {
      const url = `${server}/api/eventrequests/${req.params.Eid}`;
      await fetch(url, {
        method: "put",
        body: JSON.stringify({ isAccepted: req.params.decision }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => {
          console.log(res.status);
          return res.json();
        })
        .then(json => res.json({ data: json.data }))
        .catch(err => {
          console.log(err);
        });
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

// 3.4 as an admin i want to assign one of the candidates who applied for the task/project
router.use("/:aid/assign/:pid/to/:mid", async (req, res) => {
  try {
    if (
      ObjectId.isValid(req.params.aid) &&
      ObjectId.isValid(req.params.pid) &&
      ObjectId.isValid(req.params.mid)
    ) {
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
      }
      return res.status(200).send({msg : "Member has been assigned"});
    }
  } catch {
    console.log("error happened");
  }
});

//3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project
async function AdminNotifyAcceptedCandidate(description, NotifiedPerson, date) {
  const body = {
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
        json = { msg: "Notifications is sent successfully" };
      }
      j = json;
    })
    .catch(err => console.log("Error", err));

  return j;
}

//3.3 --As an admin I want to post the task/project to the website so that candidates can apply for it.
async function postProject(id) {
  const body = { life_cycle: "Posted" };
  var error = true;
  var result;

  await fetch(`${server}/api/projects/${id}`, {
    method: "put",
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
      return res.json();
    })
    .then(json => {
      if (!error) {
        json = { msg: "Project is posted successfully" };
      }
      console.log(json);
    })
    .catch(err => console.log("Error", err));
}

//as an admin i want to create event

router.post("/:id/addEvent/", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const j = await addEvent(req.body);
      res.status(200).send(j);
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
//sprint 3 = >as admin i want to view all applications
router.get(`/:id/applications`,async(req,res)=>{
  if(ObjectId.isValid(req.params.id)){
    const admin  = await Admin.findById(req.params.id)
    if(admin){
      var result ;
      const url = `${server}/api/applications`;
      await fetch(url,{
        method : "GET",
        headers: { "Content-Type": "application/json" }
      })
      .then(res => {

        return res.json();
      })
      .then(json => {
        result=json;
      }) 
      .catch(err=> {return err})  
    }
    else{
      return res.status(404).send("admin not found");
    }
  }else{
    return res.status(404).send("not found")
  }
   return res.json(result);
})
module.exports = router;

//FETCH REQUIERMENTS
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const fetch = require("node-fetch");
const server = require("../../config/config");
mongoose.set("useFindAndModify", false);
const event = require("../../models/Event");
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
router.post("/:id/eventrequests/", async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const cid = await ConsultancyAgency.findById(req.params.id);
    if (cid) {
      if (
        req.body.requestedBy != null &&
        req.body.description != null &&
        req.body.eventType != null &&
        req.body.eventLocation != null &&
        req.body.eventDate != null
      ) {
        const j = await CARequestEvent(
          req.body.requestedBy,
          req.body.description,
          req.body.eventType,
          req.body.eventLocation,
          req.body.eventDate
        );
        res.status(200).send(j);
      } else {
        return res.status(400).send({ error: "body is missing attrubites" });
      }
    } else
      return res
        .status(404)
        .send({ error: "Consultancy Agency does not exist" });
  } else
    return res.status(404).send({ error: "Consultancy Agency does not exist" });
});

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
router.put(
  "/:id/MyProjetcs/:pid/applyingMembers/:mid/assign",
  async (req, res) => {
    const members = await getApplyingMembers(req.params.pid);
    if (req.body.memberID != null) {
      candidatID = req.params.mid;
    } else {
      return res.status(400).send({ error: "Please enter Memeber ID" });
    }
    const canBeAssigned = members.includes(candidatID);
    var j;
    if (canBeAssigned) {
      j = await assignCandidate(req.params.pid, candidatID);
      res.status(200).send(j);
    } else {
      res
        .status(400)
        .send({ error: "Candidate did not apply on this project" });
    }
  }
);

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

router.put("/:id/myprojects/:pid/finaldraft/approve/", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id) && ObjectId.isValid(req.params.pid)) {
      const decision = "Approved";
      const j = await ApproveProject(req.params.pid, decision);
      res.status(200).send(j);
    } else {
      return res.status(404).send({ error: "ID NOT FOUND" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "not a project id" });
  }
});
async function ApproveProject(id, decision) {
  const url = `${server}/api/projects/${id}`;
  var j;
  await fetch(url, {
    method: "put",
    body: JSON.stringify({ life_cycle: decision }),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      j = res.json();
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => {
      console.log(err);
    });
  return j;
}
// part 2 as a CA i want to disapprove
router.put("/:id/myprojects/:pid/finaldraft/disapprove", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id) && ObjectId.isValid(req.params.pid)) {
      const decision = "Negotiation";
      const j = await disapproveProject(req.params.pid, decision);
      res.status(200).send(j);
    } else {
      return res.status(404).send({ error: "ID NOT FOUND" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "not a project id" });
  }
});
async function disapproveProject(id, decision) {
  var j;
  const url = `${server}/api/projects/${id}`;
  await fetch(url, {
    method: "put",
    body: JSON.stringify({ life_cycle: decision }),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      j = res.json();
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => {
      console.log(err);
    });
  return j;
}
module.exports = router;

// test approve
//ApproveProject('5c955ea2ea7dd51a0c16c38e','Posted')

// 2.3 As consultancy agency i want to view the final work of the candidate who is working on my task
// initialize new route to view my tasks

//ConsultancyAgency.update(
//   {name: 'abdo Agency'},
// {projects : ['5c94436fd0c61339203ad8c7','5c94376f029c043e280b0fb0'] },
//   {multi:true},
//    function(err, numberAffected){
//    });

router.get("/:caid/reviewprojects/:pid", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.caid)) {
      const caid = req.params.caid;
      const pid = req.params.pid;
      const matchingProjects = await getProjectsInFinalReview(caid);
      var r = null;
      for (var i in matchingProjects) {
        if (matchingProjects[i].id == pid) {
          r = matchingProjects[i];
          break;
        }
      }
      return res.json({ data: r });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error");
  }
});

router.get("/:caid/reviewprojects", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.caid)) {
      const caid = req.params.caid;
      const matchingProjects = await getProjectsInFinalReview(caid);
      res.json({ data: matchingProjects });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error");
  }
});

async function getProjectsInFinalReview(caid) {
  const allprojects = await Project.find();
  var matchingProjects = [];
  for (var i in allprojects) {
    if (
      allprojects[i].consultancyID == caid &&
      allprojects[i].life_cycle == "Final Review"
    ) {
      matchingProjects.push(allprojects[i]);
    }
  }
  return matchingProjects;
}

// a mthod to be deleted
async function getFinished(caProjects) {
  var finished = [];
  for (var i = 0; i < caProjects.length; i++) {
    const p = await Project.findById(caProjects[i]);
    if (p.life_cycle === "Finished") {
      finished.push(p);
    }
  }
  return finished;
}

//2.4 --As a consultancy agency I want to request to organize an event.
async function CARequestEvent(
  requestedBy,
  description,
  eventType,
  eventLocation,
  eventDate
) {
  const body = {
    requestedBy: requestedBy,
    description: description,
    eventType: eventType,
    eventLocation: eventLocation,
    eventDate: eventDate,
    isAccepted: "false"
  };
  var error = true;
  var j;
  await fetch(`${server}/api/eventrequests/`, {
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
      j = json;
    })
    .catch(err => console.log("Error", err));
  return j;
}

// 2.1 As a consultancy agency i want to apply for task/project
router.put("/:id/caApplyProject/:pid", async (req, res) => {
  if (ObjectId.isValid(req.params.id) && ObjectId.isValid(req.params.pid)) {
    const ca = await ConsultancyAgency.findById(req.params.id);
    const project = await Project.findById(req.params.pid);
    if (ca && project) {
      const applying = project.applyingCA;
      applying.push(req.params.id);
      const j = await caApplyProject(req.params.pid, applying);
      res.status(200).send(j);
    } else return res.status(404).send({ error: "invalid inputs" });
  } else {
    return res.status(404).send({ error: "invalid inputs" });
  }
});
async function caApplyProject(pID, applying) {
  var error = true;
  const body = { applyingCA: applying };
  var j;
  await fetch(`${server}/api/projects/${pID}`, {
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
        json = { msg: "Consultancy agent applied successfully" };
      }
      j = json;
    })
    .catch(err => console.log("Error", err));
  return j;
}

// --11 As a consultancy agency I want to give the attendees a form to rate the event and give a feedback.

router.post("/:cid/rating/:eid/", async (req, res) => {
  if (ObjectId.isValid(req.params.cid) && ObjectId.isValid(req.params.eid)) {
    const ca = await ConsultancyAgency.findById(req.params.cid);
    const event = await Event.findById(req.params.eid);
    if (ca && event) {
        if (event.requestorId == req.params.cid) {
        var i;
        var success = true;
        var today = new Date();
        var date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        const attendees = event.bookedMembers
        var arr = new Array(attendees.length);
        for (i = 0; i < attendees.length; i++) {
          const j = await carequestrating(event.formLink, attendees[i], date);
          arr[i] = j;
        }
        for (i = 0; i < attendees.length; i++){
          if (arr[i].msg != "Form is sent successfully")
            success = false;
        }
        if (success)
          res.json({ msg: "Form is sent successfully" })
        else
          res.json({ msg: "Error occured" })
      } else {
        return res.status(400).send({ error: 'You can not access this event' });
      }
    } else return res.status(404).send({ error: "Error" });
  } else return res.status(404).send({ error: "Error" });
});

// 11 As a CA I want to give the attendees a form to rate the event and give a feedback
async function carequestrating(formLink,id,date) {
  var error = true;
  const body = {
    description: `Please rate thie event through this form ${formLink}`,
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
        json = { msg: "Form is sent successfully" };
      }
      j = json;
    })
    .catch(err => console.log("Error", err));

  return j;
}



//22 AS a consultancy Agency i want to view my events

router.get("/:id/ShowMyEvents", async (req, res) => {
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    const consultancyagencys = await ConsultancyAgency.findById(id);

    if (consultancyagencys) {
      const e =await event.find()
      const Myevents=e.filter(m=>m.requestorId==id);
      if(Myevents.length===0){
        res.send({msg: "NO Events to show"});}
        else{
           res.json({ data:Myevents });}
    } else {
      return res.status(404).send({ error: "Consultancy Agency not found" });
    }
  } else {
    return res.status(404).send({ error: "Consultancy Agency not found" });
  }
});
module.exports = router;

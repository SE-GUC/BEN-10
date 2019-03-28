const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const fetch = require("node-fetch");
const server = require("../../config/config");

const Event = require("../../models/Event");
const member = require("../../models/member");
const validator = require("../../validations/memberValidations");
const notificationValidator = require("../../validations/notificationsValidation");
const project = require("../../models/Project");

// GET method to retrieve all members
router.get("/", async (req, res) => {
  const members = await member.find();
  res.json({ data: members });
});

// as a member i want to view my projects

// GET method to retirve a member by his id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const mem = await member.findById(id);
      res.json({ data: mem });
    }
  } catch {
    //console.log('Invalid Object id');
    return res.status(400).send({ error: "the provided id is not valid one " });
  }
});

// view my notifications

router.get("/:id/notifications", async (req, res) => {
  const id = req.params.id;
  // res.redirect('/api/notifications/?Member_id='+id);
  if (ObjectId.isValid(id)) {
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
          mynotification => mynotification.NotifiedPerson === id
        );
        res.json({ data: notif });
      })
      .catch(err => console.log("Error", err));
  } else {
    return res.status(404).send({ error: "Not a member id" });
  }
});

// i want to be able to apply for a task or a project
router.post("/:id1/projects/:id2", async (req, res) => {
  const project_id = req.params.id2;
  const member_id = req.params.id1;
  if (
    project_id.match(/^[0-9a-fA-F]{24}$/) &&
    member_id.match(/^[0-9a-fA-F]{24}$/)
  ) {
    var active_task = req.body.activeTasks;
    if (typeof active_task === "undefined") active_task = 0;

    const application = {
      applicantId: member_id,
      applicantName: req.body.applicantName,
      gender: req.body.gender,
      age: req.body.age,
      email: req.body.email,
      mobile: req.body.mobile,
      applyingDate: req.body.applyingDate,
      skills: req.body.skills,
      yearsOfExp: req.body.yearsOfExp,
      hasJob: req.body.hasJob,
      activeTasks: active_task,
      projectId: project_id
    };
    var error = true;
    await fetch(`${server}/api/applications`, {
      method: "post",
      body: JSON.stringify(application),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(json => res.json(json))
      .catch(err => console.log("Error", err));
  } else {
    return res.status(404).send({ error: "Not a valid id format" });
  }
});

//POST method to create a new member
router.post("/", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const newMember = await member.create(req.body);
    res.json({ msg: "member was created successfully", data: newMember });
  } catch (error) {
    // error is to be handled  later
    console.log(error);
  }
});

// PUT method to update a member
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    try {
      id.match(/^[0-9a-fA-F]{24}$/);
      const mem = await member.findById(id);
      // res.json({data: mem})
    } catch {
      //console.log('Invalid Object id');
      return res
        .status(400)
        .send({ error: "the provided id is not valid one " });
    }
    const mem = await member.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    if (!mem) return res.status(404).send({ error: "member is not found" });
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });

    res.json({ msg: "member updated successfully" });
  } catch (error) {
    // error is to be handled later
    console.log(error);
  }
});

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
    // error is to be handled later
    console.log(error);
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
      const hisProjects = projects.filter(m => m.life_cycle === "Posted");
      result = hisProjects;
      return hisProjects;
    })
    .catch(err => console.log("Error", err));
  return result;
}
//as a candidate i want to view an events so that i can book a place in it
router.get("/:id/getEvent", async (req, res) => {
  const id = req.params.id;
  if (ObjectId.isValid(id)) {
    const j = await getEvents(id);
    const mye = j.filter(m=> m.requestorId == id)
    console.log(mye)
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
      result = hisEvents;
      return hisEvents;
    })
    .catch(err => console.log("Error", err));

  return result;
}

//4.9 --As a candidate I want that the events I attended be added on my profile.
async function postevent(cid, events) {
  var error = true;
  const body = { events: events };
  var j;
  await fetch(`${server}/api/member/${cid}`, {
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
    .catch(err => console.log("Error", err));
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
  const myMember = await member.findById(id);
  let skills = myMember.skill_set;
  let myProjects = await project.find();
  var i;
  let returnResult = [];
  for (i = 0; i < myProjects.length; i++) {
    var j;
    let flag = true;
    for (j = 0; j < myProjects[i].required_skills_set.length; j++) {
      var k;
      let Available = true;
      for (k = 0; k < skills.length; k++) {
        if (skills[k] === myProjects[i].required_skills_set[j]) {
          Available = false;
          break;
        }
      }
      if (Available) {
        flag = false;
        break;
      }
    }
    if (flag) {
      returnResult.push(myProjects[i]);
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
      var skills = mem.skill_set;
      var allowed = skills.includes(type);

      if (allowed === true) {
        const members = event.bookedMembers;
        members.push(canId);
        const j = await bookEvent(eventId, members);
        res.status(200).send(j);
      } else {
        res.send({ msg: "You can't book this event" });
      }
    } else return res.status(404).send({ error: "invalid ID" });
  } else {
    return res.status(404).send({ error: "invalid ID" });
  }
});

async function bookEvent(eid, members) {
  var error = true;
  const body = { bookedMembers: members };
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
    .catch(err => console.log("Error", err));
  return j;
}
//test 4.8
module.exports = router;

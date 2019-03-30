const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Project = require("../../models/Project");
const PartnerInfo = require("../../models/PartnerInfo");
const fetch = require("node-fetch");
const server = require("../../config/config");
const partners = require("../../models/PartnerInfo");
const validator = require("../../validations/partnerValidations");
const ObjectId = require("mongodb").ObjectID;

mongoose.set("useFindAndModify", false);

router.get("/", async (req, res) => {
  const partners = await PartnerInfo.find();
  res.json({ data: partners });
});

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
        life_cycle: "started",
        experience_level_needed: req.body.experience_level_needed,
        required_skills_set: req.body.required_skills_set
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
      return result;
    } else {
      return res.status(404).send({ error: "Error" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error");
  }
});

router.put("/:id/Myprojects/:pid/finaldraft/accept", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id) && ObjectId.isValid(req.params.pid)) {
      const j = await DecideOnProject(req.params.pid);
      res.status(200).send(j);
    } else {
      return res.status(404).send({ error: "ID NOT FOUND" });
    }
  } catch {
    console.log(error);
    return res.status(404).send({ error: "not a project id" });
  }
});
async function DecideOnProject(id, decision) {
  const url = `${server}/api/projects/${id}`;
  await fetch(url, {
    method: "put",
    body: JSON.stringify({ life_cycle: decision }),
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
    const pid = await PartnerInfo.findById(req.params.id);
    if (pid) {
      if (
        req.body.requestedBy != null &&
        req.body.description != null &&
        req.body.eventType != null &&
        req.body.eventLocation != null &&
        req.body.eventDate != null
      ) {
        const j = await PartnerRequestEvent(
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
    } else return res.status(404).send({ error: "Partner does not exist" });
  } else return res.status(404).send({ error: "Partner does not exist" });
});

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
  const p = await Project.findById(pid);
  if (p.companyID == req.params.id) {
    const j = await deleteProject(req.params.pid);
    return res.json(j);
  } else {
    res.json({ msg: "error" });
  }
});
router.put("/:id/editProject/:pid/", async (req, res) => {
  const p = await Project.findById(pid);
  if (p.companyID == req.params.id) {
    const j = await editProject(req.params.pid, req.body);
    return res.json(j);
  } else {
    res.json({ msg: "error" });
  }
});
router.post("/:id/submitRequest/", async (req, res) => {
  const j = await PartnerRequestEvent(req.body);
  return res.json(j);
});

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
  const p = await Project.findById(id);
  if (
    pr.life_cycle !== "Posted" &&
    pr.life_cycle !== "Final Review" &&
    pr.life_cycle !== "Finished"
  ) {
    await fetch(`${server}/api/projects/${id}`, {
      method: "delete",
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

      .catch(err => console.log("Error", err));
  } else {
    console.log("fssss");
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
        j = res.json;
        return res.json();
      })

      .catch(err => console.log("Error", err));
    return j;
  } else {
    console.log("error");
  }
}

async function PartnerRequestEvent(body) {
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
      console.log(j);
    })
    .catch(err => console.log("Error", err));
  return j;
}

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

// 1.1 as a partner i want to assign a consultancy agency to a project
router.put("/:id1/AssignCAtoProject/:id2", async (req, res) => {
  const projID = req.params.id1;
  const caId = req.params.id2;
  if (ObjectId.isValid(projID) && ObjectId.isValid(caId)) {
    const project = await Project.findById(projID);
    const consultancy = await ConsultancyAgency.findById(caId);

    if (project && consultancy) {
      var consul = project.applyingCA;
      var found = false;
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
    } else return res.status(404).send({ error: "invalid ID" });
  } else {
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
router.put("/:id/myprojects/:pid/finaldraft/approve", async (req, res) => {
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
  await fetch(url, {
    method: "put",
    body: JSON.stringify({ life_cycle: decision }),
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
//1.2 parte 2 as a partner i want to disapprove
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
  const url = `${server}/api/projects/${id}`;
  await fetch(url, {
    method: "put",
    body: JSON.stringify({ life_cycle: decision }),
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

//sprint3 => 5- as partner i want to cancel my project
router.put("/:id/cancelproject/:pid", async (req, res) => {
  var error = true;
  if (ObjectId.isValid(req.params.id) && ObjectId.isValid(req.params.pid)) {
    const partner = await PartnerInfo.findById(req.params.id);
    const project = await Project.findById(req.params.pid);
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
              res.json({ msg: "Project is canceled" });
            }
          })
          .catch(err => console.log("Error", err));
        } else return res.status(404).send({ error: "you cannot cancel this project" });
      } else return res.status(404).send({ error: "this project doesnot belong to you" });
    } else return res.status(404).send({ error: "invalid inputs" });
  } else return res.status(404).send({ error: "invalid inputs" });
});
module.exports = router;

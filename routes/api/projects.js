const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const Project = require("../../models/Project");
const validator = require("../../validations/projectValidations");
const ObjectId = require("mongodb").ObjectID;
mongoose.set("useFindAndModify", false);

router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.status(200).json({ data: projects });
});

// get a project
router.get("/:id", async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const id = req.params.id;
    const projects = await Project.findById(id);
    if (!projects)
      return res.status(404).send({ error: "Project does not exist" });
    res.json({ data: projects });
  } else {
    return res.status(404).send({ error: "Project does not exist" });
  }
});

// Create a project
router.post("/", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    }
    const newProject = await Project.create(req.body);
    return res.json({ msg: "Project was created successfully", data: newProject });
  } catch (error) {
    console.log(error)
    return res.status(400).send({ error: "not a project id" });
  }
});

// Update a project
router.put("/:id", async (req, res) => {
  try {

    if (ObjectId.isValid(req.params.id)) {
      const isValidated = validator.updateValidation(req.body);
      if (isValidated.error){
        return res
          .send({ error: isValidated.error.details[0].message });
      }
      const updatedProject = await Project.findOneAndUpdate({ _id: req.params.id },req.body);

      if (!updatedProject)
        return res.send({ msg: "Project does not exist" });
      res.status(200).json({ msg: "Project updated successfully" });
    } else {
      return res.send({ msg: "not a project id" });

    }
  } catch {
    return res.status(400).send({ error: "not a project id" });
  }
});

// Delete a project
router.delete("/:id", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const deletedProject = await Project.findByIdAndRemove(id);
      if (!deletedProject)
        return res.status(400).send({ error: "Project does not exist" });
      res.json({
        msg: "Project was deleted successfully",
        data: deletedProject
      });
    } else {
      return res.status(404).send({ error: "not a project id" });
    }
  } catch (error) {
    return res.status(400).send("not a project id");
  }
});
module.exports = router;


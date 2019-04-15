const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Application = require("../../models/Application");
const validator = require("../../validations/applicationValidations");
const ObjectId = require("mongodb").ObjectID;
mongoose.set("useFindAndModify", false);

router.get("/", async (req, res) => {
  const applications = await Application.find();
  res.json({ data: applications });
});


router.get("/:id", async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const id = req.params.id;
    const applications = await Application.findById(id);
    if (!applications)
      return res.status(404).send({ error: "Application does not exist" });
    res.json({ data: applications });
  } else {
    return res.status(404).send({ error: "Application does not exist" });
  }
});

// Create an application
router.post("/", async (req, res) => {
  try {
    const isValidated = validator.createValidationApplication(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const newApplication = await Application.create(req.body);
    res.json({
      msg: "Application was created successfully",
      data: newApplication
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const updatedApplication = await Application.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      );
      if (!updatedApplication)
        return res.status(404).send({ error: "Application does not exist" });
      res.json({ msg: "Application updated successfully" });
    } else {
      return res.status(404).send({ error: "not a application id" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send({ error: "Application does not exist" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const deletedApplication = await Application.findByIdAndRemove(id);
      if (!deletedApplication)
        return res.status(400).send({ error: "Application does not exist" });
      res.json({
        msg: "Application was deleted successfully",
        data: deletedApplication
      });
    } else {
      return res.status(404).send({ error: "Application does not exist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error");
  }
});

module.exports = router;

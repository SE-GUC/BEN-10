const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const fetch = require('node-fetch');
const Project = require('../../models/Project')
const validator = require('../../validations/projectValidations')
const ObjectId = require('mongodb').ObjectID;
mongoose.set('useFindAndModify', false);

var member_id=null;
var project_id=null;

router.get('/', async (req,res) => {
    const projects = await Project.find()
    res.json({data: projects})
    if(req.query.Member_id!=null){
      member_id=req.query.Member_id;

    }

})

// choose a project to apply for

router.post('/:id/apply',async (req,res) => {
    project_id=req.params.id;
    var active_task=req.body.activeTasks;
    if(typeof active_task === "undefined")
          active_task=0;

    const application = { applicantId:member_id,
        applicantName:req.body.applicantName,
        gender:req.body.gender,
        age:req.body.age,
        email:req.body.email,
        mobile:req.body.mobile,
        applyingDate:req.body.applyingDate,
        skills:req.body.skills,
        yearsOfExp:req.body.yearsOfExp,
        hasJob:req.body.hasJob,
        activeTasks:active_task,
        projectId:project_id
    };
 
fetch('http://localhost:5000/api/applications', {
        method: 'post',
        body:    JSON.stringify(application),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res =>res.json())
    .then(json =>console.log(json));

})


// select a project
router.get('/:id',async(req,res)=>{
    const id = req.params.id
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        // it's an ObjectID    
    
    const project = await Project.findById(id)
    if(project){
      return res.json({data: project})
    }else{
        return res.json({msg:"it was rendering here"});
    }
}
 else{
    return res.status(400).json({msg:`a project with id ${id} not found`});}
});

// Create a projectt
router.post('/', async (req,res) => {
   try {
    console.log(req.body.description);
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) {
        return res.status(400).send({ error: isValidated.error.details[0].message })
    }
    const newProject = await Project.create(req.body)
    res.json({msg:'Project was created successfully', data: newProject})
   }
   catch(error) {
        return res.status(400).send({ error: "not a project id" });
   }  
})

// Update a project
router.put('/:id', async (req,res) => {
    try {
        if(ObjectId.isValid(req.params.id))
            {
            const isValidated = validator.updateValidation(req.body)
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
            const updatedProject = await Project.findByIdAndUpdate({_id: req.params.id}, req.body)
            if (!updatedProject) return res.status(404).send({error: 'Project does not exist'})
            res.json({msg: 'Project updated successfully'})
        }
        else {
            return res.status(404).send({ error: "not a project id" })
        }
    }
    catch{
        console.log(error)
        return res.status(404).send({ error: "not a project id" })
    }
 })

 // Delete a project
 router.delete('/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const deletedProject = await Project.findByIdAndRemove(id)
        if(!deletedProject) return res.status(400).send({ error: 'Project does not exist'})
        res.json({msg:'Project was deleted successfully', data: deletedProject})

        if(ObjectId.isValid(req.params.id)){
        const id = req.params.id
        const deletedProject = await Project.findByIdAndRemove(id)
        if(!deletedProject) return res.status(400).send({ error: 'Project does not exist'})
        res.json({msg:'Project was deleted successfully', data: deletedProject})}
        else{
            return res.status(404).send({ error: "not a project id" })
        }
       

        if(ObjectId.isValid(req.params.id)){
            const id = req.params.id
            const deletedProject = await Project.findByIdAndRemove(id)
            if(!deletedProject) return res.status(400).send({ error: 'Project does not exist'})
            res.json({msg:'Project was deleted successfully', data: deletedProject})
       }else{
            return res.status(404).send({error: 'Project does not exist'})
       }
    }
       catch(error) {
           console.log(error)
           return res.status(400).send('not a project id')
   
       }  
    });

 

module.exports = router
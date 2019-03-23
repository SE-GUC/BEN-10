const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectID;
mongoose.set('useFindAndModify', false);

const ConsultancyAgency = require('../../models/ConsultancyAgency')
const validator = require('../../validations/consultancyagencyValidations')

router.get('/', async (req,res) => {
    const consultancyAgency = await ConsultancyAgency.find()
    res.json({data: consultancyAgency})
})

router.get('/:id', async (req,res) => {
    if(ObjectId.isValid(req.params.id)){
    const id = req.params.id
    const consultancyagencys = await ConsultancyAgency.findById(id)
    if (!consultancyagencys) return res.status(404).send({error: 'Consultancy Agency not exist'})
    res.json({data: consultancyagencys})
    }
    else{
        return res.status(404).send({error: 'Consultancy Agency does not exist'})
    }

})

router.post('/', async (req,res) => {
    try {
     const isValidated = validator.createValidationconsultancyagency(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const newConsultancyAgency = await ConsultancyAgency.create(req.body)
     res.json({msg:'Consultancy Agency was created successfully', data: newConsultancyAgency})
    }
    catch(error) {
        console.log(error)
        return res.status(400).send('Error')
    }
      
 })


 router.put('/:id', async (req,res) => {
    try{
        if(ObjectId.isValid(req.params.id)){
        const isValidated = validator.updateValidationconsultancyagency(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const updatedconsultancyagency = await ConsultancyAgency.findByIdAndUpdate({_id: req.params.id}, req.body)
        if (!updatedconsultancyagency) return res.status(404).send({error: 'Consultancy Agency does not exist'})
        res.json({msg: 'Consultancy Agency updated successfully'})
        }
        else{
        return res.status(404).send({error: 'Consultancy Agency does not exist'})
        }
        
    }
    catch{
        console.log(error)
        return res.status(404).send({error: 'Consultancy Agency does not exist'})
    }

})

 
router.delete('/:id', async (req,res) => {
    try {
        if(ObjectId.isValid(req.params.id)){
        const id = req.params.id
        const deletedConsultancyAgency= await ConsultancyAgency.findByIdAndRemove(id)
        if(!deletedConsultancyAgency) return res.status(400).send({ error: 'Consultancy Agency does not exist'})
        res.json({msg:'Consultancy Agency was deleted successfully', data: deletedConsultancyAgency})
        }else{
            return res.status(404).send({error: 'Consultancy Agency does not exist'})

        }
    }
    catch(error) {
        console.log(error)
        return res.status(400).send('Error')

    }  
 })


 // 2.3 As consultancy agency i want to view the final work of the candidate who is working on my task
   // initialize new route to view my tasks


 //ConsultancyAgency.update(
  //  {name: 'abdo Agency'}, 
  //  {projects : ['5c94436fd0c61339203ad8c7','5c94376f029c043e280b0fb0'] },
  //  {multi:true}, 
   //   function(err, numberAffected){  
   //   });


async function  getFinished(caProjects){
    var finished = []
    for(var i=0;i<caProjects.length;i++){
        const p  =await Project.findById(caProjects[i])
        if(p.life_cycle==='Finished'){
            finished.push(p)
        }
    }
    return finished
}


router.get('/:id/myProjects',async (req,res)=>{
 try{
    if(ObjectId.isValid(req.params.id)){
      const id = req.params.id
      const ca= await ConsultancyAgency.findById(id)
      const caProjects = ca.projects
      const caFinishedProjects = await getFinished(caProjects)
    res.json({data: caFinishedProjects})
 }
}
 catch(error) {
    console.log(error)
    return res.status(400).send('Error')

}  

}) 


 module.exports = router
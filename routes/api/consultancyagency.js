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
 //   {name: 'abdo Agency'}, 
 // {projects : ['5c94436fd0c61339203ad8c7','5c94376f029c043e280b0fb0'] },
 //   {multi:true}, 
  //    function(err, numberAffected){  
  //    });


  router.get('/:caid/reviewprojects/:pid',async (req,res)=>{
    try{
       if(ObjectId.isValid(req.params.caid)){
         const caid = req.params.caid
         console.log(caid)
         const pid = req.params.pid
         const matchingProjects = await getProjectsInFinalReview(caid)
         console.log(matchingProjects)
         var r = null
         for(var i in matchingProjects){
             if(matchingProjects[i].id == pid){
                 console.log(matchingProjects[i].id)
              r = matchingProjects[i]
                 break
            }
         }
         return res.json({data : r})
    }
   }
    catch(error) {
       console.log(error)
       return res.status(400).send('Error')
   
   }  
   })


router.get('/:caid/reviewprojects',async (req,res)=>{
    console.log("hnaaaa")
 try{
    if(ObjectId.isValid(req.params.caid)){
      const caid = req.params.caid
      const matchingProjects = await getProjectsInFinalReview(caid)
      console.log(matchingProjects)
    res.json({data: matchingProjects})
 }
}
 catch(error) {
    console.log(error)
    return res.status(400).send('Error')

}  
})


 async function getProjectsInFinalReview(caid){
    console.log("jjjjjjjjjjjj")
    console.log(caid)

      const allprojects = await Project.find()
      var matchingProjects =[]
      for( var i in allprojects){
          console.log(allprojects[i].consultancyID)
          console.log(caid)
          console.log(allprojects[i].consultancyID == caid)
          console.log(allprojects[i].life_cycle== 'Final Review')
          console.log(allprojects[i].life_cycle)
          if(allprojects[i].consultancyID == caid && allprojects[i].life_cycle== 'Final Review'){
              console.log("yepiieee")
              matchingProjects.push(allprojects[i])
          }
      }
      console.log("lllllllllllllll")
      console.log(matchingProjects)

     return matchingProjects 

  //  const  url  = `${server}/api/projects/${caid}`
  //  const projects ;
  //  fetch(url,{
   //    method : 'GET'
   //     })
    //    .then(res=>{ projects=res ; return res.json()})
    //    .catch(err =>{ return err.status('404')})   
  
 }
// a mthod to be deleted
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

 module.exports = router
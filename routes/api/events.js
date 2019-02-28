const express=require('express');
const uuid=require('uuid');
const router=express.Router();
const events=require('../../models/Event');
const validator = require('../../validations/eventValidations')



// gets all events
router.get('/',async(req,res)=>{
    const event = await Event.find()
    res.json({data: event})
}
);

// get a single event
router.get('/:id',async(req,res)=>{
    const id = req.params.id
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        // it's an ObjectID    
    
    const event = await Event.findById(id)
    if(event){
      return res.json({data: event})
    }else{
        return res.json({msg:"it was rendering here"});
    }
}
 else{
    return res.status(400).json({msg:`an event with id ${id} not found`});}
});
// create an Event

router.post('/',async(req,res)=>{
    try {
        const isValidated = validator.createValidationEvent(req.body)
        console.log(isValidated);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const newEvent = await Event.create(req.body)
        res.json({msg:'Event was created successfully', data: newEvent})
       }
       catch(error) {
           console.log(error)
           return res.status(400).send('Error')
       }

});

// update an event

router.put('/:id',async(req,res)=>{
    try {
        if ((req.params.id).match(/^[0-9a-fA-F]{24}$/)){
        const found=await Event.findById(req.params.id);
        const isValidated = validator.updateValidationEvent(req.body)
        if (isValidated.error) {
            console.log(2);
            res.status(400).send({ error: isValidated.error.details[0].message })
        }
        await Event.findByIdAndUpdate({_id: req.params.id}, req.body);
        if(found){
          res.json({msg: 'Event Request updated successfully'});
        }else{
            return res.status(404).send({error: 'Event does not exist'})
        }
    }else{
        return res.status(404).send({error: 'Event does not exist'})
    }
       }
       catch(error) {
           console.log(error)
           return res.status(404).send({error: 'Event does not exist'})
       } 
});

// delete an event
router.delete('/:id',async(req,res)=>{
    try {
        const id = req.params.id
        if ((id).match(/^[0-9a-fA-F]{24}$/)){
        const found=await Event.findById(req.params.id);
        if(found){
        const deletedEvent = await Event.findByIdAndRemove(id)
        res.json({msg:'Event was deleted successfully', data: deletedEvent})
        }else{
            return res.json({msg:`event with id ${id} not found`});
        }

        }
        else{
            return res.json({msg:`event with id ${id} not found`});
        }
       }
       catch(error) {
           console.log(error)
           return res.status(400).send('Error')
   
       }  
});

module.exports=router;
const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
// const member = require('../../models/member') //require your model
const Notification = require('../../models/Notification') 
const Task_invitation = require('../../models/OrientationInvitation') 
const project = require('../../models/Project') 
const Member = require('../../models/member')
const Events = require('../../models/Event')
const ObjectId = require('mongoose');

class MTest extends AbstractTests {
  constructor (PORT, ROUTE) {
    super(PORT, ROUTE)
    this.sharedState = {
        // enter model attributes an set them to null
    }
  }

  run() {
    super.run()
    try {
      return new Promise((resolve, reject) => {
        describe('Making sure A routes work', () => {
          // this.postRequest()
          // this.getRequest()
          // this.putRequest()
          // this.deleteRequest()
          
          // add all methods
          this.getmyNotifications();
          this.appylyForproject();
          this.viewTaskInvitation();
          this.submitTask();
          this.postevent()
          this.posteventbywrongMemberID()
          this.posteventbynotavalidatedMemberID()
          this.posteventbywrongEventID()
          this.posteventbynotavalidatedEventID()
        })
        resolve()
      })
    } catch (err) {}
  }
// as a member i want to submit a project to be finally reviewed
submitTask(){
  test('submitting a task to be finally reviewed',async()=>{
    var project_id=null;
    var member_id=null;
    const projects=await project.find();
    for(var i=0;projects.length>i;i++){
      console.log(projects[i]["life_cycle"]);
      if(projects[i]["life_cycle"]==='In Progress'){
        project_id=projects[i]["_id"];
        member_id=projects[i]["memberID"];
        if(project_id!=null&&member_id!=null){
          break;
        }
      }
    }
    if(project_id!=null && member_id!=null){
    const requestBody={

    }
    const response = await fetch(`${this.base_url}/${member_id}/Myprojects/${project_id}/submit/www.projectlzink.com`, {
      method: 'PUT',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    })
    const jsonResponse =  await response.json();
    if(Object.keys(jsonResponse).toString()!=='error'){
      console.log(jsonResponse);
     expect(Object.keys(jsonResponse).toString()).toEqual(['data'].toString())
     expect(Object.keys(jsonResponse)).not.toEqual(['error'])
  }
  else{
    console.log(jsonResponse);
    expect(Object.keys(jsonResponse).toString()).toEqual(['error'].toString())
    expect(response.status).toBe(404);
  }
}else{
  console.log("there is no matching in the db:(")
}


  })
  

}

// as a member i want to view my task orientation invitation
viewTaskInvitation(){
  test('view task orientation invitations',async()=>{
    const task=await Task_invitation.find();
    var notified_member=null;
    for(var i=0;task.length>i;i++){
      if(task[i]["senttoID"]!=null){
        notified_member=task[i]["senttoID"];
        break;
      }

    }  
    if(notified_member!=null){  
    const response = await fetch(`${this.base_url}/${notified_member}/task_orientation`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const jsonResponse = await response.json();

    if(Object.keys(jsonResponse).toString()!=='error'){
    expect(Object.keys(jsonResponse).toString()).toEqual(['data'].toString())
    expect(Object.keys(jsonResponse)).not.toEqual([' error'])
    for(var i=0;jsonResponse.data.length>i;i++){
      expect(jsonResponse.data[i]["senttoID"].toString()).toEqual(notified_member.toString())

    }
  }else{
    expect(Object.keys(jsonResponse).toString()).toEqual(['error'].toString())
    expect(response.status).toBe(404);

  }
}else{
  console.log("there is no matching in the db:(")
}
  })
}

// as a member i want to apply for a project
appylyForproject(){
  test('testing for apply for a task or a project',async()=>{
    const project_toApply=await project.find();
    const member_applying=await Member.find();
    var member_id=null;
    var member_index=null
    var project_id=null;
    var flag=false;

    for(var i=0;project_toApply.length>i;i++){

      for(var j=0;member_applying.length>j;j++){
        if(project_toApply[i]["memberID"]==null){
          if(project_toApply[i]["required_skills_set"].toString()==member_applying[j]["skill_set"].toString()){
              member_id=member_applying[j]["_id"];
              member_index=j;
              project_id=project_toApply[i]["_id"];
              flag=true;
              break;

          }
        }

      }
      if(flag)
      break;
    }
    var gender1=null
    var skill="java"
    if(member_applying[member_index]["skill_set"].length>0)
      skill=member_applying[member_index]["skill_set"][0]
    if(member_applying[member_index]["gender"])
      gender1="male"
    else
      gender1="female"
    const requestBody={
      applicantName:member_applying[member_index]["fname"],
      gender:gender1,
      age:(new Date().getFullYear())-(member_applying[member_index]["birthdate"].getFullYear()),
      email:member_applying[member_index]["email"],
      mobile:"01066118715",
      applyingDate:new Date(),
      skills:skill,
      yearsOfExp:2,
      hasJob:false,
      activeTasks:0
    
    }
    console.log(requestBody)
     const response = await fetch(`${this.base_url}/${member_id}/projects/${project_id}/apply`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json();
      if(Object.keys(jsonResponse).toString()!=='error'){
      expect(Object.keys(jsonResponse).toString()).toEqual(['msg','data'].toString())
      expect(response.status).toEqual(200)
      }
      else{
        expect(Object.keys(jsonResponse).toString()).toEqual(['error'].toString())
        expect(response.status).toBe(404);
      }
  })
}




// as a member i want to view my notifications tests
  getmyNotifications(){
    test('view notifications',async()=>{
      const notifications=await Notification.find();
      var notified_member=null;
      for(var i=0;notifications.length>i;i++){
        if(notifications[i]["NotifiedPerson"]!=null){
          notified_member=notifications[i]["NotifiedPerson"];
          break;
        }
      }
      if(notified_member!=null){ 
      const response = await fetch(`${this.base_url}/${notified_member}/notifications`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json();
      if(Object.keys(jsonResponse).toString()!=='error'){
      expect(Object.keys(jsonResponse).toString()).toEqual(['data'].toString())
      expect(Object.keys(jsonResponse)).not.toEqual([' error'])
      for(var i=0;jsonResponse.data.length>i;i++){
        expect(jsonResponse.data[i]["NotifiedPerson"].toString()).toEqual(notified_member.toString())

      }
    }else{
        expect(Object.keys(jsonResponse).toString()).toEqual(['error'].toString())
        expect(response.status).toBe(404);
    }
  }
  else{
    console.log("there is no matching in the db")
  }



    })
  }


  postRequest () {}

  getRequest  () {}
  putRequest  () {}
  deleteRequest  () {}

  //4.9 As a candidate I want that the events I attended be added on my profile.
  postevent() {
    const requestBody = {}
    test(`put ${this.base_url}/${this.sharedState.id}/events/:id2/`, async () => {
      const m = await Member.find();
      const m1 = m[0];
      const mid = m1.id;
      const ed = await Event.find();
      const ed1 = ed[0];
      const edid = ed1.id;
      const response = await fetch(`${this.base_url}/${mid}/events/${edid}/`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toEqual(200)
      // const pRequest = await Project.findbyid(requestBody).exec()
      // expect(pRequest.description).toEqual(requestBody.description)

      // this.sharedState.description =  pRequest.description
    })
  }

  //4.9 As a candidate I want that the events I attended be added on my profile.
  posteventbywrongMemberID() {
    const requestBody = {}
    test(`put ${this.base_url}/:id1/events/:id2/`, async () => {
      const response = await fetch(`${this.base_url}/5c93d983f3fe6358b41cd7a/events/5c9ce0e20ddd11042a301e26/`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)
    })
  }

  //4.9 As a candidate I want that the events I attended be added on my profile.
  posteventbynotavalidatedMemberID() {
    const requestBody = {}
    test(`put ${this.base_url}/"id1"/events/:id2/`, async () => {
      const response = await fetch(`${this.base_url}/5c93d983f3fe7358b41ccd7a/events/5c9ce0e20ddd11042a301e26/`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)
    })
  }

  //4.9 As a candidate I want that the events I attended be added on my profile.
  posteventbywrongEventID() {
    const requestBody = {}
    test(`put ${this.base_url}/${this.sharedState.id}/events/:id2/`, async () => {
      const response = await fetch(`${this.base_url}/5c93d983f3fe6358b41ccd7a/events/5c9ce0e20dd11042a301e26/`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)
    })
  }

  //4.9 As a candidate I want that the events I attended be added on my profile.
  posteventbynotavalidatedEventID() {
    const requestBody = {}
    test(`put ${this.base_url}/${this.sharedState.id}/events/:id2/`, async () => {
      const response = await fetch(`${this.base_url}/5c93d983f3fe6358b41ccd7a/events/5c9ce0e27ddd11042a301e26/`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)
    })
  }
}

module.exports = MTest
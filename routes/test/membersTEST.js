const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const member = require('../../models/member') //require your model
const Notification = require('../../models/Notification') 
const Task_invitation = require('../../models/OrientationInvitation') 
const project = require('../../models/Project') 
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
          // this.getmyNotifications();
          // this.appylyForproject();
          this.viewTaskInvitation();
          this.submitTask();
          

          // add all methods

        })
        resolve()
      })
    } catch (err) {}
  }
// as a member i want to submit a project to be finally reviewed
submitTask(){
  

}

// as a member i want to view my task orientation invitation
viewTaskInvitation(){
  test('view task orientation invitations',async()=>{
    const task=await Task_invitation.find();
    const notified_member=task[0]["senttoID"]
    const response = await fetch(`${this.base_url}/${notified_member}/task_orientation`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const jsonResponse = await response.json();
    expect(Object.keys(jsonResponse).toString()).toEqual(['data'].toString())
    expect(Object.keys(jsonResponse)).not.toEqual([' error'])
    for(var i=0;jsonResponse.data.length>i;i++){
      expect(jsonResponse.data[i]["senttoID"].toString()).toEqual(notified_member.toString())

    }
  })
}

// as a member i want to apply for a project
appylyForproject(){
  test('testing for apply for a task or a project',async()=>{
    const project_toApply=await project.find();
    const member_applying=await member.find();
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
     const response = await fetch(`${this.base_url}/${member_id}/projects/${project_id}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      // console.log(jsonResponse);
      expect(Object.keys(jsonResponse).toString()).toEqual(['msg','data'].toString())
      expect(response.status).toEqual(200)
  })
}




// as a member i want to view my notifications tests
  getmyNotifications(){
    test('view notifications',async()=>{
      const notifications=await Notification.find();
      const notified_member=notifications[0]["NotifiedPerson"]
      const response = await fetch(`${this.base_url}/${notified_member}/notifications`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse).toString()).toEqual(['data'].toString())
      expect(Object.keys(jsonResponse)).not.toEqual([' error'])
      for(var i=0;jsonResponse.data.length>i;i++){
        expect(jsonResponse.data[i]["NotifiedPerson"].toString()).toEqual(notified_member.toString())

      }
    })
  }


  postRequest () {
    const requestBody = {
       // enter model attributes
    }

    test(`post ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['msg','data'])
      expect(response.status).toEqual(200)

     
      
    })
  }

  getRequest  () {}
  putRequest  () {}
  deleteRequest  () {}

}
module.exports = MTest
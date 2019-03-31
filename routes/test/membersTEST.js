
const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
// const member = require('../../models/member') //require your model
const Notification = require('../../models/Notification') 
const Task_invitation = require('../../models/OrientationInvitation') 
const Admin = require('../../models/Admin') //require your model
const project = require('../../models/Project')
const Member = require('../../models/member')
const Events = require('../../models/Event')
const ObjectId = require('mongoose');
const server = require("../../config/config");
class MTest extends AbstractTests {
  constructor (PORT, ROUTE) {
    super(PORT, ROUTE)
    this.sharedState = {
      fname: null,
      mname : null,
     lname:null,
     SSN : null,
     birthdate:null,
     Gender:null,
     Nationality:null,
     Marital_status:null,
     Military_status: null,
     Driving_license: null,
     Country:null,
     City: null,
     email:null,
     password:null,
     Mobile_number:null
    }
  }

  run() {
    super.run()
    try {
      return new Promise((resolve, reject) => {
        describe('Making sure Members routes work', () => {

        this.postRequest()
          this.postRequestBadRequest()
          this.getRequest()
          this.getRequestbyId()
          this.putRequest()
          this.deleteRequest()
        //  this.getProjects()
        //  this.getProjectsFail()
        //   this.getEvents()
        // this.getEventsFail()
        //  this.getMyProjects()
        //  this.getMyProjectsFail()
        //   this.bookEvent()
        //  this.bookEventFail();

         // add all methods
          // this.getmyNotifications();
          // this.appylyForproject();
          // this.viewTaskInvitation();
          // this.submitTask();
          // this.postevent()
          // this.posteventbywrongMemberID()
          // this.posteventbynotavalidatedMemberID()
          // this.posteventbywrongEventID()
          // this.posteventbynotavalidatedEventID()
          // this.submitTaskIDmistach();
          // this.submitTaskProjectDoesntExist();
          // this.submitTaskLifeCycleNotInProgress();
          // this.submitTaskNotAssignedToYou();
          // this.getmyNotificationsIdMistmatch();
          // this.viewTaskInvitationIdMisMatch();
          // this.viewTaskInvitationNoSuchMember();
          // this.getmyNotificationsNoSuchMember();
          // this.appylyForprojectIdMismatch();
          // this.appylyForprojectWithNoSuchMember();
          // this.appylyForprojectwithNotRequiredSkill();
        })
        resolve()
      })
    } catch (err) {}
  }

// submit a project to be finally reviewed
submitTaskIDmistach(){
  test('testing an id mismtach',async ()=>{
    const member_id=1;
    const projects=await project.find();
    const project_id=projects[0]["_id"];
    const requestBody={

    }
    const response = await fetch(`${this.base_url}/${member_id}/Myprojects/${project_id}/submit/www.projectlzink.com`, {
      method: 'PUT',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    })
    const jsonResponse =  await response.json();
    console.log(jsonResponse);
    expect(Object.keys(jsonResponse).toString()).toEqual(['error'].toString())
    expect(response.status).toBe(404);


  })

}

submitTaskProjectDoesntExist(){
  test("testing for a project that doesn't exist",async()=>{
    // not a project :)
    const projects =await Notification.find();
    const pid=projects[0]["_id"];
    const members=await member.find();
    const mid=members[0]["_id"];




    const requestBody={

    }
    const response = await fetch(`${this.base_url}/${mid}/Myprojects/${pid}/submit/www.projectlzink.com`, {
      method: 'PUT',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    })
    const jsonResponse =  await response.json();
    console.log(jsonResponse);
    expect(Object.keys(jsonResponse).toString()).toEqual(['error'].toString())
    expect(response.status).toBe(404);
  })
}


submitTaskLifeCycleNotInProgress(){
  test('test for a life cycle other than In Progress',async()=>{
    const projects=await project.find();
    let index=null;
    for(var i=0;projects.length>i;i++){
      if(projects[i].life_cycle!=='In Progress'&&projects[i].memberID!=null){
        index=i;
        break;
      }
    }
    if(index!=null){
      const member_id=projects[index].memberID;
      const project_id=projects[index]._id;



    const requestBody={

    }
    const response = await fetch(`${this.base_url}/${member_id}/Myprojects/${project_id}/submit/www.projectlzink.com`, {
      method: 'PUT',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    })
    const jsonResponse =  await response.json();
    expect(Object.keys(jsonResponse).toString()).toEqual(['error'].toString())
    expect(response.status).toBe(404);

    }
    else{
      console.log("sorry no matching in the db")
    }
  })
}


submitTaskNotAssignedToYou(){
test('submit a task that is not assigned to you',async()=>{
  const members=await member.find();
  const member_id=members[0]._id;
  const member_id2=members[1]._id;
  const projects=await project.find();
  const project_id=projects[0]._id;
  // ------------------------------------------------------------------------ \\
if(project_id!=null){
  const body={
    life_cycle:"In Progress",
    memberID:member_id
  }
  const response1 =  await fetch(`${server}/api/projects/${project_id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    const jsonResponse1=await response1.json();
    if(Object.keys(jsonResponse1).toString()!='error'){
     if(member_id2!=null){
      const requestBody={

      }
      const response = await fetch(`${this.base_url}/${member_id2}/Myprojects/${project_id}/submit/www.projectlzink.com`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse =  await response.json();
      console.log(jsonResponse);
      expect(Object.keys(jsonResponse).toString()).toEqual(['error'].toString())
      expect(response.status).toBe(404);
    }
    }
    else{
      console.log("there is no such project")
    }


    }
    else{
      console.log("it didnt update a project :(")
    }
    
  // --------------------------------------------------------------------------- \\
  
})

}


// ----------------------------- view notifications ---------------------------
getmyNotificationsIdMistmatch(){
  test('testing for notifications viewing id mismatch',async()=>{
    const member_id=1;
    const response = await fetch(`${this.base_url}/${member_id}/notifications`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const jsonResponse = await response.json();
    expect(Object.keys(jsonResponse).toString()).toEqual(['error'].toString())
    expect(response.status).toBe(404);
  })
}

getmyNotificationsNoSuchMember(){
  test('testing for notification for an id that is not a member id',async()=>{
    const admin=await Admin.find();
    const admin_id=admin[0]._id;
    if(admin_id!=null){
      const response = await fetch(`${this.base_url}/${admin_id}/notifications`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json();
      console.log(jsonResponse)
      expect(Object.keys(jsonResponse).toString()).toEqual(['error'].toString())
      expect(response.status).toBe(404);


    }
    else{

    }
    
    
  })
}
// ------------------------------------ done ----------------------------------
// ----------------------------- view task orientation invitation ---------------------------
viewTaskInvitationIdMisMatch(){
  test('testing for task orientation viewing id mismatch',async()=>{
    const member_id=1;
    const response = await fetch(`${this.base_url}/${member_id}/task_orientation`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const jsonResponse = await response.json();
    expect(Object.keys(jsonResponse).toString()).toEqual(['error'].toString())
    expect(response.status).toBe(404);
  })
}
viewTaskInvitationNoSuchMember(){
  test('testing for task orientation for an id that is not a member id',async()=>{
    const admin=await Admin.find();
    const admin_id=admin[0]._id;
    if(admin_id!=null){
      const response = await fetch(`${this.base_url}/${admin_id}/task_orientation`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json();
      console.log(jsonResponse)
      expect(Object.keys(jsonResponse).toString()).toEqual(['error'].toString())
      expect(response.status).toBe(404);


    }
    else{

    }
    
    
  })
}
// ------------------------------------ done ----------------------------------














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

// -------------------------- apply for a project failures -------------------------

appylyForprojectIdMismatch(){
  test('apply for a project with id mismatch',async()=>{
    const member_id=1;
    const project_id=2;
    const requestBody={
      applicantName:"nada elaraby",
      gender:"female",
      age:21,
      email:"nadaelarabyy@gmail.com",
      mobile:"01066118715",
      applyingDate:new Date(),
      skills:["java"],
      yearsOfExp:2,
      hasJob:false,
      activeTasks:0
    
    }
    const response = await fetch(`${this.base_url}/${member_id}/projects/${project_id}/apply`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    })
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    expect(Object.keys(jsonResponse).toString()).toEqual(['error'].toString())
    expect(response.status).toBe(404);


  })
}
appylyForprojectWithNoSuchMember(){
  test('testing for a member that is not a member :)',async()=>{

    const admins=await Admin.find();
    const projects=await project.find();
    const admin_id=admins[0]._id;
    const project_id=projects[0]._id;
    if(admin_id!=null && project_id!=null){
      const requestBody={
        applicantName:"nada elaraby",
        gender:"female",
        age:21,
        email:"nadaelarabyy@gmail.com",
        mobile:"01066118715",
        applyingDate:new Date(),
        skills:["java"],
        yearsOfExp:2,
        hasJob:false,
        activeTasks:0
      
      }
      const response = await fetch(`${this.base_url}/${admin_id}/projects/${project_id}/apply`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      expect(Object.keys(jsonResponse).toString()).toEqual(['error'].toString())
      expect(response.status).toBe(404);
  
  
    }
    else{
      console.log("no data:(")
    }


  })
  

}

appylyForprojectwithNotRequiredSkill(){
  test('testing for applying for a project that doesnt have the requiredSkill',async()=>{

    const project_toApply=await project.find();
    const member_applying=await Member.find();
    var member_id=null;
    var member_index=null
    var project_id=null;
    var flag=false;

    for(var i=0;project_toApply.length>i;i++){

      for(var j=0;member_applying.length>j;j++){
        if(project_toApply[i]["memberID"]==null){
          if(project_toApply[i]["required_skills_set"].toString()!=member_applying[j]["skill_set"].toString()){
              member_id=member_applying[j]["_id"];
              member_index=j;
              project_id=project_toApply[i]["_id"];
              const members=Member.findById(member_id);
              const projects=project.findById(project_id);
              if(members!=null && projects!=null){
                flag=true;
                break;
              }

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
      console.log(jsonResponse);
      expect(Object.keys(jsonResponse).toString()).toEqual(['error'].toString())
      expect(response.status).toBe(404);

  })



}










// ---------------------------------------------------------------------------------


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
              const members=Member.findById(member_id);
              const projects=project.findById(project_id);
              if(members!=null && projects!=null){
                flag=true;
                break;
              }
              member_id=null;
              project_id=null;

          }
        }

      }
      if(flag)
      break;
    }
    if(member_id!=null && project_id!=null){
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
    }else{
      console.log("no data in db:(")
      
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


  postRequest () {
    const requestBody = {
      fname: "ahmed",
      mname : "mohamed",
     lname: "abdel-aal",
     SSN :12455698 ,
     birthdate:"1/1/1998",
     Gender:true,
     Nationality:"egyptian",
     Marital_status:"single",
     Military_status: "not yet",
     Driving_license: "yes",
     Country:"Egypt",
     City: "cairo",
     email:"a7med_201196@yahoo.com",
     password:"12345678AaAa",
     Mobile_number:"01119461010"
    }

    test(`post ${this.base_url}`, async (done) => {
      const response = await fetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus method 1 post: "+ response.status)
      const jsonr = response.json()
      console.log(jsonr)
      const PostedMember = await Member.findOne(requestBody).exec()
      this.sharedState.id=PostedMember.id
      expect(response.status).toEqual(200)
      done();
    }
    )
  }
  postRequestBadRequest () {
    const requestBody = {
      fname: "ahmed",
      mname : "mohamed",
     lname: "abdel-aal",
     SSN :12455698 ,
     Gender:true,
     Marital_status:"single",
     Military_status: "not yet",
     Driving_license: "yes",
     Country:"Egypt",
     City: "cairo",
     email:"a7med_201196@yahoo.com",
     password:"12345678AaAa",
     Mobile_number:"01119461010"
    }

    test(`post ${this.base_url}`, async (done) => {
      const response = await fetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus method 2 post bad: "+ response.status)
      const jsonr = response.json()
      console.log(jsonr)
      expect(response.status).toEqual(400)
      done();
    }
    )
  }


  getRequest  () {
    test(`get ${this.base_url}`, async (done) => {
      const response = await fetch(`${this.base_url}/`, {
        method: 'GET',
       // body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
       })
      console.log("response stastus method 3 get: "+ response.status)
      expect(response.status).toEqual(200)
      done();
     }
    )  
    }
  

  getRequestbyId  () {
    test(`get ${this.base_url}/${this.sharedState.id}`, async (done) => {
      const response = await fetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'GET',
       // body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
       })
      console.log("response stastus method 4 get by id: "+ response.status)
      expect(response.status).toEqual(200)
      done();
     }
    )  

  }
  putRequest  () {
    const requestBody = {
      fname: "ahmed 2 ",
      mname : "mohamed 2",
     lname: "abdel-aal 2",
    }
    test(`put ${this.base_url}/${this.sharedState.id}`, async (done) => {
      const response = await fetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
       })
      console.log("response stastus method 5 put: "+ response.status)
      expect(response.status).toEqual(200)
      done();
     }
    )  
  }
  deleteRequest  () {
    test(`delete ${this.base_url}/${this.sharedState.id}`, async (done) => {
      const response = await fetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'Delete',
       // body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
       })
      console.log("response stastus method 6 delete : "+ response.status)
      expect(response.status).toEqual(200)
      done();
     }
    ) 
  }



 //4.9 As a candidate I want that the events I attended be added on my profile.
  postevent() {
    const requestBody = {}
    test(`put ${this.base_url}/${this.sharedState.id}/events/:id2/`, async () => {
      const m = await Member.find();
      const m1 = m[0];
      const mid = m1.id;
      const ed = await Events.find();
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


  //as a candidate i want to view tasks so that i can apply for them
  getProjects(){
    test(`get ${this.base_url}`, async () => {
      const mem=await Member.find();
      const mem1=mem[0];
      const memid=mem1.id;
      const response = await fetch(`${this.base_url}/${memid}/getProject`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(response.status).toEqual(200)
  }
    )
  }
  getProjectsFail(){
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c9e5750086c7f40c08183/getProject`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
  }
    )
  }
  //as a candidate i want to view an events so that i can book a place in it
  getEvents(){
    test(`get ${this.base_url}`, async () => {
      const mem=await Member.find();
      const mem1=mem[0];
      const memid=mem1.id;
      const response = await fetch(`${this.base_url}/${memid}/getEvent`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(response.status).toEqual(200)
  }
    )
  }
  getEventsFail(){
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c9e5750086c7f40c08183/getEvent`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
  }
    )
  }
  //as a candidate i want to view my projects
  getMyProjects(){
    test(`get ${this.base_url}`, async () => {
      const mem=await Member.find();
      const mem1=mem[0];
      const memid=mem1.id;
      const response = await fetch(`${this.base_url}/${memid}/ShowMyProjects`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(response.status).toEqual(200)
  }
    )
  }
  getMyProjectsFail(){
    test(`get ${this.base_url}`, async () => {
      
      const response = await fetch(`${this.base_url}/5c9e5750086c7f40c08183/ShowMyProjects`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
  }
    )
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

 bookEvent(){
    
    test(`put ${this.base_url}`, async () => {
      const mem = await Member.find();
      const mem1 = mem[0];
      const memid = mem1.id;
      const ev = await Events.find();
      const ev1 = ev[0];
      const evid = ev1.id;
      const response = await fetch(`${this.base_url}/${memid}/bookEvent/${evid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      expect(response.status).toEqual(200)
    })
  }
   
  bookEventFail(){
    test(`put ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c9e5514086c0c08183d8/bookEvent/5c93e86e61fb9b030dc8e`, {
        method: 'PUT',
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


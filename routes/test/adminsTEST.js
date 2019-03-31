const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Admin = require('../../models/Admin') //require your model
const ObjectId = require('mongoose');
const Member = require('../../models/member')
const Event = require('../../models/Event')
const server = require("../../config/config")
const Notification = require('../../models/Notification')
const Project = require('../../models/Project')
const Application = require('../../models/Application')


class ATest extends AbstractTests {
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
          this.sendFeedBack();
          this.sendRejection();

        })
        resolve()
      })
    } catch (err) {}
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



//testing sending feedback
  sendFeedBack(){
    test(`post ${this.base_url}/adminID/events/eventID/sendFeedBackForm`, async () => {
      const memberList = await Member.find();
      const m1 = memberList[0];
      const m2 = memberList[1];
      const eventList = await Event.find();
      let e1 = eventList[0];
      const adminList = await Admin.find();
      const a1 = adminList[0];
      //adding 2 members to an event attending members list
      var requestBody = {
        bookedMembers:[m1._id,m2._id]
      };
      await fetch(`${server}/api/events/${e1._id}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      });
      e1 = await Event.findById(e1._id);
      console.log(e1.bookedMembers);
      console.log(e1._id);
      requestBody = {
        feedBack:"this is test feedBack link for testing sending feedBackForm"
      };
      const response = await fetch(`${this.base_url}/${a1._id}/events/${e1._id}/sendFeedBackForm`,{
        method:'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      });
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['data']);
      expect(response.status).toEqual(200);
      expect(jsonResponse.data[0].toString()).toEqual(m1._id.toString());
      expect(jsonResponse.data[1].toString()).toEqual(m2._id.toString());
      let allNotifications = await Notification.find();
      allNotifications = allNotifications.filter(
        allNotifications => allNotifications.description === requestBody.feedBack.toString()
      );
      expect(allNotifications[0].NotifiedPerson.toString()).toEqual(m1._id.toString());
      expect(allNotifications[1].NotifiedPerson.toString()).toEqual(m2._id.toString());
      // delete created notifications 
        var i ;
        for(i = 0;i<allNotifications.length;i++){
          await Notification.findByIdAndDelete(allNotifications[i]);
        }
    });
  }

//testing sending rejection notification to non assigned members to a projects
  sendRejection(){
    test(`post ${this.base_url}/adminID/projects/projectID/sendRejection`, async () => {
      const memberList = await Member.find();
      const m1 = memberList[0];
      const m2 = memberList[1];
      const m3 = memberList[2];
      var today = new Date();
      var date =
          today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
      var requestBody = {
        description:"Test description",
        company:"Test Company",
        category:"Test Category",
        want_consultancy:false,
        posted_date:date,
        memberID:m1._id,
        life_cycle:"InProgress",
        required_skills_set:["testSkillSet1","testSkillSet2"]

      };
      let allProjects = await Project.find();
      let filteredProjects = allProjects.filter(allProjects => allProjects.description.toString()=== requestBody.description.toString());
      var i ;
      for(i=0;i<filteredProjects.length;i++){
        await Project.findByIdAndDelete(filteredProjects[i]._id);
      }
      await fetch(`${server}/api/projects`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      });
      allProjects = await Project.find();
      filteredProjects = allProjects.filter(allProjects => allProjects.description.toString()=== requestBody.description.toString());
      const myProject = filteredProjects[0];
      requestBody = {
        applicantId:m1._id,
        applicantName:m1.fname,
        gender:"Male",
        age:35,
        email:"test@gmail.com",
        mobile:"0111111111",
        applyingDate:date,
        skills:"skillTest",
        yearsOfExp:5,
        hasJob:true,
        projectId:myProject._id
      };
      await fetch(`${server}/api/applications`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      });

      requestBody = {
        applicantId:m2._id,
        applicantName:m2.fname,
        gender:"Male",
        age:35,
        email:"test@gmail.com",
        mobile:"0111111111",
        applyingDate:date,
        skills:"skillTest",
        yearsOfExp:5,
        hasJob:true,
        projectId:myProject._id
      };
      await fetch(`${server}/api/applications`, {
        method: 'Post',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      });
      requestBody = {
        applicantId:m3._id,
        applicantName:m3.fname,
        gender:"Male",
        age:35,
        email:"test@gmail.com",
        mobile:"0111111111",
        applyingDate:date,
        skills:"skillTest",
        yearsOfExp:5,
        hasJob:true,
        projectId:myProject._id
      };
      await fetch(`${server}/api/applications`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      });
      const allAdmins = await Admin.find();
      const a1 = allAdmins[0];
      const response = await fetch(`${this.base_url}/${a1._id}/projects/${myProject._id}/sendRejection`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(['data']);
      expect(response.status).toEqual(200);
      const message = "Sorry u were not accepted for project {" + myProject.description.toString() + "}";
      const allNotifications = await Notification.find();
      let filteredNotifications =[];
      for(i=0;i<allNotifications.length;i++){
        if(allNotifications[i].NotifiedPerson.toString()===m1._id.toString()){
          filteredNotifications.push(allNotifications[i]);
        }
      }
      let flag = true;
      if(filteredNotifications.length!==0){
        if(filteredNotifications[filteredNotifications.length-1].description.toString()===message.toString()){
          flag = false;
        }
      }
      expect(flag).toBe(true);
      filteredNotifications =[];
      for(i=0;i<allNotifications.length;i++){
        if(allNotifications[i].NotifiedPerson.toString()===m2._id.toString()){
          filteredNotifications.push(allNotifications[i]);
        }
      }
      expect(filteredNotifications[filteredNotifications.length - 1].date).toEqual(new Date(date));
      expect(filteredNotifications[filteredNotifications.length - 1].description.toString()).toEqual(message.toString());
      await Notification.findByIdAndDelete(filteredNotifications[filteredNotifications.length - 1]._id);
      filteredNotifications =[];
      for(i=0;i<allNotifications.length;i++){
        if(allNotifications[i].NotifiedPerson.toString()===m3._id.toString()){
          filteredNotifications.push(allNotifications[i]);
        }
      }
      expect(filteredNotifications[filteredNotifications.length - 1].date).toEqual(new Date(date));
      expect(filteredNotifications[filteredNotifications.length - 1].description.toString()).toEqual(message.toString());
      await Notification.findByIdAndDelete(filteredNotifications[filteredNotifications.length - 1]._id);
    });
  }





}
module.exports = ATest

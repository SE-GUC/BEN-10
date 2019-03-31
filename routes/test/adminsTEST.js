const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const event = require('../../models/Event')
const eventrequest = require('../../models/EventRequest')
const Admin = require('../../models/Admin')
const Project = require("../../models/Project");
const Member = require('../../models/member')
const ObjectId = require('mongoose');

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
        describe('Making sure Admins routes work', () => {
          this.postRequest()
          this.getRequest()
          this.putRequest()
          this.deleteRequest()
         this.postEvent()
         this.postEventFail  () 
         this.getAllEventRequests()
         this.getAllEventRequestsFail()
          // add all methods
          this.getdescription()
          this.getdescriptionbywrongAdminID()
          this.getdescriptionbynotavalidatedAdminID()
          this.getdescriptionbywrongProjectID()
          this.getdescriptionbynotavalidatedProjectID()
          this.AdminNotifyAcceptedCandidate()
          this.AdminNotifyAcceptedCandidatemissingattribute()
          this.AdminNotifyAcceptedCandidatebywrongAdminID()
          this.AdminNotifyAcceptedCandidatebynotavalidatedAdminID()
          this.AdminNotifyAcceptedCandidatebywrongCandidateID()
          this.AdminNotifyAcceptedCandidatebynotavalidatedCandidateID()
          this.getAllCA()
          this.getAllCAFail()
        })
        resolve()
      })
    } catch (err) {}
  }


  postRequest () {}

  getRequest  () {}
  putRequest  () {}
  deleteRequest  () {}

  //3 --As an admin I want to further check the description of a task/project so that it will be posted for candidates to apply
  getdescription() {
    test(`get ${this.base_url}/${this.sharedState.id}/pdescription/:id/`, async () => {
      const ad = await Admin.find();
      const ad1 = ad[0];
      const adid = ad1.id;
      const pr = await Project.find();
      const pr1 = pr[0];
      const prid = pr1.id;
      const response = await fetch(`${this.base_url}/${adid}/pdescription/${prid}/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(response.status).toEqual(200)
      
    })
  }

//3 --As an admin I want to further check the description of a task/project so that it will be posted for candidates to apply
  getdescriptionbywrongAdminID() {
    test(`get ${this.base_url}/${this.sharedState.id}/pdescription/:id/`, async () => {
      const response = await fetch(`${this.base_url}/5c734be40bc82a5f186ac770/pdescription/5c94436fd0c61339203ad8c7/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)
    })
  }

//3 --As an admin I want to further check the description of a task/project so that it will be posted for candidates to apply
  getdescriptionbynotavalidatedAdminID() {
    test(`get ${this.base_url}/${this.sharedState.id}/pdescription/:id/`, async () => {
      const response = await fetch(`${this.base_url}/5c78be40bc82a5f186ac770/pdescription/5c94436fd0c61339203ad8c7/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)
    })
  }

  //3 --As an admin I want to further check the description of a task/project so that it will be posted for candidates to apply
  getdescriptionbywrongProjectID() {
    test(`get ${this.base_url}/${this.sharedState.id}/pdescription/:id/`, async () => {
      const response = await fetch(`${this.base_url}/5c784be40bc82a5f186ac770/pdescription/5c94436fd0c61339203adc7/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(response.status).toEqual(404)
    })
  }

  //3 --As an admin I want to further check the description of a task/project so that it will be posted for candidates to apply
  getdescriptionbynotavalidatedProjectID() {
    test(`get ${this.base_url}/${this.sharedState.id}/pdescription/:id/`, async () => {
      const response = await fetch(`${this.base_url}/5c784be40bc82a5f186ac770/pdescription/5c98436fd0c61339203ad8c7/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(response.status).toEqual(404)
    })
  }

//3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project
  AdminNotifyAcceptedCandidate() {
    const requestBody = {
    "description": "no description"
  }
  test(`post ${this.base_url}/${this.sharedState.id}/notifications/:id/`, async () => {
    const ad = await Admin.find();
        const ad1 = ad[0];
        const adid = ad1.id;
        const m = await Member.find();
        const m1 = m[0];
        const mid = m1.id;
    const response = await fetch(`${this.base_url}/${adid}/notifications/${mid}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(["msg"])
      expect(response.status).toEqual(200)
    })
  }

//3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project
  AdminNotifyAcceptedCandidatemissingattribute() {
    test(`post ${this.base_url}/${this.sharedState.id}/notifications/:id/`, async () => {
      const requestBody = {}
      const ad = await Admin.find();
      const ad1 = ad[0];
      const adid = ad1.id;
      const m = await Member.find();
      const m1 = m[0];
      const mid = m1.id;
    const response = await fetch(`${this.base_url}/${adid}/notifications/${mid}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(400)
    })
  }

//3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project
  AdminNotifyAcceptedCandidatebywrongAdminID() {
    const requestBody = {
    "description": "no description"
  }
  
  test(`post ${this.base_url}/${this.sharedState.id}/notifications/:id/`, async () => {
    const response = await fetch(`${this.base_url}/5c7a603a0a4938cc1e08e76/notifications/5c93d983f3fe6358b41ccd7a`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }

//3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project
  AdminNotifyAcceptedCandidatebynotavalidatedAdminID() {
    const requestBody = {
    "description": "no description"
  }
  
  test(`post ${this.base_url}/${this.sharedState.id}/notifications/:id/`, async () => {
    const response = await fetch(`${this.base_url}/5c7a603a0a4938ccd1e88e76/notifications/5c93d983f3fe6358b41ccd7a`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }

  //3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project
  AdminNotifyAcceptedCandidatebywrongCandidateID() {
    const requestBody = {
    "description": "no description"
  }
  
  test(`post ${this.base_url}/${this.sharedState.id}/notifications/:id/`, async () => {
    const response = await fetch(`${this.base_url}/5c7a603a0a4938ccd1e08e76/notifications/5c93d983f3fe6358b4ccd7a`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }

  //3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project
  AdminNotifyAcceptedCandidatebynotavalidatedCandidateID() {
    const requestBody = {
    "description": "no description"
  }
  
  test(`post ${this.base_url}/${this.sharedState.id}/notifications/:id/`, async () => {
    const response = await fetch(`${this.base_url}/5c7a603a0a4938ccd1e08e76/notifications/5c93d983f3fe6458b41ccd7a`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }

  getAllCA(){
    test(`get ${this.base_url}`, async () => {
      const ad = await Admin.find();
      const ad1 = ad[0];
      const adid = ad1.id;
      const response = await fetch(`${this.base_url}/${adid}/ShowAllCA`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      //console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      //console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(response.status).toEqual(200)
    })
  }

  
  //as an admin i want to create event
  postEvent  () {
    const requestBody = {
      requestedBy: "no requested by",
    description: "no description",
    eventType: "no type",
    eventLocation: "no event location",
    eventDate:"5/1/2019",
    registPrice: "100",
    remainingPlace: "50",
    topics: "[]",
    speaker: "no speaker",
    regist_start_date: "1/1/2019",
    regist_expiry_date:"2/1/2019",
    requestorId: "5c79260b4328ab820437835c"
    }

    test(`post ${this.base_url}/`, async () => {
      const ad=await Admin.find();
      const ad1=ad[0];
      const adid=ad1.id;
      const response = await fetch(`${this.base_url}/${adid}/addEvent/`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
     // console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      expect(response.status).toEqual(200)
    //   const eRequest = await event.findOne(requestBody).exec()
    //   expect(eRequest.requestedBy).toEqual(requestBody.requestedBy)
    // //   expect(eRequest.eventDate).toBeCloseTo(eventDate)
    //   expect(eRequest.description).toEqual(requestBody.description)
    //   expect(eRequest.eventType).toEqual(requestBody.eventType)
    //   expect(eRequest.eventLocation).toEqual(requestBody.eventLocation)
    //   expect(eRequest.eventDate).toEqual(requestBody.eventDate)
    //   expect(eRequest.registPrice).toEqual(requestBody.registPrice)
    //   expect(eRequest.remainingPlace).toEqual(requestBody.remainingPlace)
    //   expect(eRequest.topics).toEqual(requestBody.topics)
    //   expect(eRequest.speaker).toEqual(requestBody.speaker)
    //   expect(eRequest.regist_start_date).toEqual(requestBody.regist_start_date)
    //   expect(eRequest.regist_expiry_date).toEqual(requestBody.regist_expiry_date)
    //   expect(eRequest.requestorId).toEqual(requestBody.requestorId)
    //   //expect(eRequest.sentAt).toEqual(requestBody.sentAt)
    //  // expect(eRequest.senttoID).toEqual(requestBody.senttoID)
    // //  expect(eRequest.sentByID).toEqual(requestBody.sentByID)
    //  // expect(new String(eRequest.senttoID)).toEqual(requestBody.senttoID)
    //   //expect(new String(eRequest.sentByID)).toEqual(requestBody.sentByID)
    //   this.sharedState.requestedBy =  eRequest.requestedBy
    //   this.sharedState.description =  eRequest.description
    //   this.sharedState.eventType =  eRequest.eventType
    //   this.sharedState.eventLocation =  eRequest.eventLocation
    //   this.sharedState.eventDate =  eRequest.eventDate
    //   this.sharedState.registPrice =  eRequest.registPrice
    //   this.sharedState.remainingPlace =  eRequest.remainingPlace
    //   this.sharedState.topics =  eRequest.topics
    //   this.sharedState.speaker =  eRequest.speaker
    //   this.sharedState.regist_start_date =  eRequest.regist_start_date
    //   this.sharedState.regist_expiry_date =  eRequest.regist_expiry_date
    //   this.sharedState.requestorId =  eRequest.requestorId
      
      
    })
  } 

  postEventFail  () {
    const requestBody = {
      requestedBy: "no requested by",
    description: "no description",
    eventType: "no type",
    eventLocation: "no event location",
    eventDate:"5/1/2019",
    registPrice: "100",
    remainingPlace: "50",
    topics: "[]",
    speaker: "no speaker",
    regist_start_date: "1/1/2019",
    regist_expiry_date:"2/1/2019",
    requestorId: "5c79260b4328ab820437835c"
    }

    test(`post ${this.base_url}/`, async () => {
      const response = await fetch(`${this.base_url}/5c784be40bc82a5f186ac7/addEvent/`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
     // console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    //   const eRequest = await event.findOne(requestBody).exec()
    //   expect(eRequest.requestedBy).toEqual(requestBody.requestedBy)
    // //   expect(eRequest.eventDate).toBeCloseTo(eventDate)
    //   expect(eRequest.description).toEqual(requestBody.description)
    //   expect(eRequest.eventType).toEqual(requestBody.eventType)
    //   expect(eRequest.eventLocation).toEqual(requestBody.eventLocation)
    //   expect(eRequest.eventDate).toEqual(requestBody.eventDate)
    //   expect(eRequest.registPrice).toEqual(requestBody.registPrice)
    //   expect(eRequest.remainingPlace).toEqual(requestBody.remainingPlace)
    //   expect(eRequest.topics).toEqual(requestBody.topics)
    //   expect(eRequest.speaker).toEqual(requestBody.speaker)
    //   expect(eRequest.regist_start_date).toEqual(requestBody.regist_start_date)
    //   expect(eRequest.regist_expiry_date).toEqual(requestBody.regist_expiry_date)
    //   expect(eRequest.requestorId).toEqual(requestBody.requestorId)
    //   //expect(eRequest.sentAt).toEqual(requestBody.sentAt)
    //  // expect(eRequest.senttoID).toEqual(requestBody.senttoID)
    // //  expect(eRequest.sentByID).toEqual(requestBody.sentByID)
    //  // expect(new String(eRequest.senttoID)).toEqual(requestBody.senttoID)
    //   //expect(new String(eRequest.sentByID)).toEqual(requestBody.sentByID)
    //   this.sharedState.requestedBy =  eRequest.requestedBy
    //   this.sharedState.description =  eRequest.description
    //   this.sharedState.eventType =  eRequest.eventType
    //   this.sharedState.eventLocation =  eRequest.eventLocation
    //   this.sharedState.eventDate =  eRequest.eventDate
    //   this.sharedState.registPrice =  eRequest.registPrice
    //   this.sharedState.remainingPlace =  eRequest.remainingPlace
    //   this.sharedState.topics =  eRequest.topics
    //   this.sharedState.speaker =  eRequest.speaker
    //   this.sharedState.regist_start_date =  eRequest.regist_start_date
    //   this.sharedState.regist_expiry_date =  eRequest.regist_expiry_date
    //   this.sharedState.requestorId =  eRequest.requestorId
      
      
    })
  } 
  //as an admin i want to view all eventrequests
  getAllEventRequests(){
    test(`get ${this.base_url}`, async () => {
      const ad=await Admin.find();
      const ad1=ad[0];
      const adid=ad1.id;
      const response = await fetch(`${this.base_url}/${adid}/eventRequests`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
       console.log(jsonResponse)

      expect(Object.keys(jsonResponse).toString()).toEqual(['data'].toString())
      expect(response.status).toEqual(200)
  }
    )
  }
  getAllEventRequestsFail(){
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c784be40bc82a5f186ac7/eventRequests`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
       console.log(jsonResponse)

      expect(Object.keys(jsonResponse).toString()).toEqual(["error"].toString())
      expect(response.status).toEqual(404)
  }
    )
  }


}
getAllCAFail (){//enter invalid admin id
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c7a6797938ccd1e08e7c/ShowAllCA`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      //console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      //console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }


}
module.exports = ATest

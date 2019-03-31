
const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Admin = require('../../models/Admin') //require your model
const project = require('../../models/Project')
const Member = require('../../models/member')
const Events = require('../../models/Event')
const ObjectId = require('mongoose');
const Member  = require('../../models/member')

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
         this.getProjects()
         this.getProjectsFail()
          this.getEvents()
        this.getEventsFail()
         this.getMyProjects()
         this.getMyProjectsFail()
          this.bookEvent()
         this.bookEventFail();

          // add all methods
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


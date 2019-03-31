const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Admin = require('../../models/Admin') //require your model
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
         this.postRequest()
         this.getRequest()
         this.putRequest()
         this.deleteRequest()
         this.getProjects()
         this.getProjectsFail()
          this.getEvents()
        this.getEventsFail()
         this.getMyProjects()
         this.getMyProjectsFail()

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


const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Admin = require('../../models/Admin') //require your model
const project = require('../../models/Project')
const Member = require('../../models/member')
const event = require('../../models/Event')
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
        //  this.getProjects()
         // this.getProjectsFail()
         // this.getEvents()
        // this.getEventsFail()
         // this.getMyProjects()
         this.getMyProjectsFail()
          // add all methods

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

}
module.exports = MTest
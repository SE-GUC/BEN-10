const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Application = require('../../models/Application') //require your model
const ObjectId = require('mongoose');

class ApTest extends AbstractTests {
  constructor (PORT, ROUTE) {
    super(PORT, ROUTE)
    this.sharedState = {
        // enter model attributes an set them to null
        id : null , 
        applicantName :null ,
        gender: null,
        age: null,
        email: null,
        mobile: null,
        applyingDate: null,
        skills: null,
        yearsOfExp: null,
        hasJob: null
    }
  }

  run() {
    super.run()
    try {
      return new Promise((resolve, reject) => {
        describe('Making sure Application routes work', () => {

          this.postRequest()
          this.postRequestFailed()
          this.getRequest()
          this.putRequest()
          this.putRequestFailed()
          this.deleteRequest()
          this.deleteRequestFailed()
          this.getById()
          this.getByIdFailed()
          // add all methods

        })
        resolve()
      })
    } catch (err) {}
  }


  postRequest () {
    const applicationBody = {
       // enter model attributes
       applicantId: "5c79283c92334b03f4b6244f",
       applicantName: "Couti",
       gender: "Male",
       age: 20,
       email: "Couti@email.com",
       mobile: 1118888555 ,
       applyingDate: "5/5/2005",
       skills: "mogrem",
       yearsOfExp:5,
       hasJob: false,
       activeTasks: 0,
       projectId:"5c94f6052b3f7a5c183997bd"
    }

    test(`post ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(applicationBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['msg','data'])
      expect(response.status).toEqual(200)

      const app = await Application.findOne(applicationBody).exec()
      expect(new String(app.applicantId)).toEqual(applicationBody.applicantId)
      expect(app.applicantName).toEqual(applicationBody.applicantName)
      expect(app.gender).toEqual(applicationBody.gender)
      expect(app.age).toEqual(applicationBody.age)
      expect(app.email).toEqual(applicationBody.email)
      expect(app.mobile).toEqual(applicationBody.mobile)
      //expect(app.applyingDate).toEqual(applicationBody.applyingDate)
      expect(app.skills).toEqual(applicationBody.skills)
      expect(app.yearsOfExp).toEqual(applicationBody.yearsOfExp)
      expect(app.hasJob).toEqual(applicationBody.hasJob)

      this.sharedState.id = app.id
      this.sharedState.applicantId =  app.applicantId
      this.sharedState.applicantName =  app.applicantName
      this.sharedState.gender =  app.gender
      this.sharedState.age =  app.age
      this.sharedState.email =  app.email
      this.sharedState.mobile =  app.mobile
      this.sharedState.applyingDate =  app.applyingDate
      this.sharedState.skills =  app.skills
      this.sharedState.yearsOfExp =  app.yearsOfExp
      this.sharedState.hasJob =  app.hasJob
      
    })
  }
  postRequestFailed () {
    const applicationBody = {
       // enter model attributes
       applicantId: "5c79283c92334b03f4b624",
       applicantName: "Alolo",
       gender: "Male",
       age: "20",
       email: "Alolol@email.com",
       mobile: "01118888555",
       applyingDate: "H",
       skills: "mogrem",
       yearsOfExp:"5",
       hasJob: false,
       activeTasks: "0",
       projectId:"5c94f6052b3f7a5c183997bd"
    }

    test(`post ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(applicationBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(400)

    })
  }

  getRequest () {

    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: 'GET',
        //body: JSON.stringify(applicationBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(response.status).toEqual(200)
   
    })
  }

  putRequest () {
    const applicationBody = {
       // enter model attributes  
       //applicantName: "Ali",
       age: 25  
    }

    test(`put ${this.base_url}`, async () => {
      const aps = await Application.find();
      const ap = aps[0];
      const apid = ap.id;
      const response = await fetch(`${this.base_url}/${apid}`, {
        method: 'PUT',
        body: JSON.stringify(applicationBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      expect(response.status).toEqual(200)
 
      const app = await Application.findOne(applicationBody).exec()
      //expect(app.applicantName).toEqual(applicationBody.applicantName)
      expect(app.age).toEqual(applicationBody.age)

      //this.sharedState.applicantName =  app.applicantName
      //this.sharedState.age =  app.age
      
    })
  }

  putRequestFailed () {
    const applicationBody = {
       // enter model attributes  
       //applicantName: "Ali",
       age: "7amada"  
    }

    test(`put ${this.base_url}`, async () => {
      // const aps = await Application.find();
      // const ap = aps[0];
      // const apid = ap.id;
      const response = await fetch(`${this.base_url}/5c935c92331df1144b16ca4`, {
        method: 'PUT',
        body: JSON.stringify(applicationBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)
 
     // const app = await Application.findOne(applicationBody).exec()
      //expect(app.applicantName).toEqual(applicationBody.applicantName)
      //expect(app.age).toEqual(applicationBody.age)

      //this.sharedState.applicantName =  app.applicantName
      //this.sharedState.age =  app.age
      
    })
  }

  deleteRequest () {
    test(`delete ${this.base_url}`, async () => {
      const aps = await Application.find();
      const lastpos = aps.length - 1 ; 
      const ap = aps[lastpos];
      const apid = ap.id;
      const response = await fetch(`${this.base_url}/${apid}`, {
        method: 'DELETE',
       // body: JSON.stringify(applicationBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      expect(Object.keys(jsonResponse)).toEqual(['msg','data'])
      expect(response.status).toEqual(200)

      
    })
  }

  deleteRequestFailed () {
    test(`delete ${this.base_url}`, async () => {
      //const aps = await Application.find();
      //const lastpos = aps.length - 1 ; 
      //const ap = aps[lastpos];
      //const apid = ap.id;
      const response = await fetch(`${this.base_url}/5c9e6128a697d0d30ae2cc`, {
        method: 'DELETE',
       // body: JSON.stringify(applicationBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)

      
    })
  }

  getById  () {
    test(`get ${this.base_url}`, async () => {
      const aps = await Application.find();
      const ap = aps[1];
      const apid = ap.id;
      const response = await fetch(`${this.base_url}/${apid}`, {
        method: 'GET',
       // body: JSON.stringify(applicationBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      //console.log(jsonResponse)
      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(response.status).toEqual(200)

      
    })
  }

  getByIdFailed  () {
    test(`get ${this.base_url}`, async () => {
      //const aps = await Application.find();
      //const ap = aps[0];
      //const apid = ap.id;
      const response = await fetch(`${this.base_url}/5c9e6128a697d0d30ae2cc`, {
        method: 'GET',
       // body: JSON.stringify(applicationBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
     // console.log(jsonResponse)
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)

      
    })
  }
  
}
module.exports = ApTest

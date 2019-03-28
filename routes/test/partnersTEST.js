const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const partner = require('../../models/PartnerInfo')
const project = require('../../models/Project') //require your model
const ObjectId = require('mongoose');

class PARTests extends AbstractTests {
  constructor (PORT, ROUTE) {
    super(PORT, ROUTE)
    this.sharedState = {
      name: null,
      age: null,
      gender: null,
      e_mail: null,
      experience_level: null,
      phone_number:null
    }
  }

  run() {
    super.run()
    try {
      return new Promise((resolve, reject) => {
        describe('Making sure A routes work', () => {
         // this.postRequest()
         //this.postRequestFail()
          //this.getRequest()
          //this.getRequestBYID()
           //this.postProject()
         // this.putRequest()
          //this.putRequestFail()
         // this.deleteRequest()
          // add all methods
          //this.postProjectFail()
         // this.getMyProjects()
          this.putONFinalReview()
          //this.putDisapproveONFinalReview
        })
        resolve()
      })
    } catch (err) {}
  }
  postRequest () {
    const requestBody = {
      name: "name",
      age: 55,
      gender: "gender",
      e_mail: "e_mail",
      experience_level: "experience_level",
      phone_number:"54525452115"
    }

    test(`post ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(['msg','data'])
      expect(response.status).toEqual(200)

      
      const eRequest = await partner.findOne(requestBody).exec()
      expect(eRequest.description).toEqual(requestBody.description)
    //   expect(eRequest.eventDate).toBeCloseTo(eventDate)
      expect(eRequest.name).toEqual(requestBody.name)
      expect(eRequest.age).toEqual(requestBody.age)
      expect(eRequest.gender).toEqual(requestBody.gender)
      expect(eRequest.e_mail).toEqual(requestBody.e_mail)
      expect(eRequest.experience_level).toEqual(requestBody.experience_level)
      expect(eRequest.phone_number).toEqual(requestBody.phone_number)
      this.sharedState.name =  eRequest.name
      this.sharedState.age =  eRequest.age
      this.sharedState.gender =  eRequest.gender
      this.sharedState.e_mail =  eRequest.e_mail
      this.sharedState.experience_level =  eRequest.experience_level
      this.sharedState.phone_number =  eRequest.phone_number
    })
  }
  postRequestFail () {
    const requestBody = {
      name: "name",
      age: "ay haga",
      gender: "gender",
      e_mail: "e_mail",
      experience_level: "experience_level",
      phone_number:"54525452115"
    }

    test(`post ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(400)
    })
  }

  postProject () {
    const requestBody = {
      description: "description",
      company: "company" ,
      category: "category",
      want_consultancy: true,
      posted_date: "1/1/2020",
    }

    test(`post ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c9cd0503c242d1d38b8731a/addProject`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(['msg','data'])
      expect(response.status).toEqual(200)

      
      const eRequest = await project.findOne(requestBody).exec()
      expect(eRequest.description).toEqual(requestBody.description)
      expect(eRequest.company).toEqual(requestBody.company)
      expect(eRequest.category).toEqual(requestBody.category)
      expect(eRequest.want_consultancy).toEqual(requestBody.want_consultancy)
     // expect(eRequest.posted_date).toEqual(requestBody.posted_date)
      this.sharedState.description =  eRequest.description
      this.sharedState.company =  eRequest.company
      this.sharedState.category =  eRequest.category
      this.sharedState.want_consultancy =  eRequest.want_consultancy
      this.sharedState.posted_date =  eRequest.posted_date
    })
  }

  postProjectFail () {
    const requestBody = {
      description: true,
      company: "company" ,
      category: "category",
      want_consultancy: true,
      posted_date: "11/11/2018"
    }

    test(`post ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c9cd0503c242d1d38b8731a/addProject`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(400)
    })
  }

  getRequest  () {
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(response.status).toEqual(200)
    })
  }
  getRequestBYID  () {
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c786899f8a8e026447d212f`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(response.status).toEqual(200)
    })
  }
  putRequest  () {
    const requestBody = {
      name: "kamal",
      age: 70,
      gender: "male",
      e_mail: "dont have",
      experience_level: "beginner",
      phone_number: "010265642362",
    }

    test(`put ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c9cd0503c242d1d38b8731a`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      expect(response.status).toEqual(200)

      
      const eRequest = await partner.findOne(requestBody).exec()
      expect(eRequest.name).toEqual(requestBody.name)
      expect(eRequest.age).toEqual(requestBody.age)
      expect(eRequest.gender).toEqual(requestBody.gender)
      expect(eRequest.e_mail).toEqual(requestBody.e_mail)
      expect(eRequest.experience_level).toEqual(requestBody.experience_level)
      expect(eRequest.phone_number).toEqual(requestBody.phone_number)
      this.sharedState.id = eRequest.id
      this.sharedState.name =  eRequest.name
      this.sharedState.age =  eRequest.age
      this.sharedState.gender =  eRequest.gender
      this.sharedState.e_mail =  eRequest.e_mail
      this.sharedState.experience_level =  eRequest.experience_level
      this.sharedState.phone_number =  eRequest.phone_number
    })
       
  }

  putRequestFail  () {
    const requestBody = {
      name: true,
      age: "70",
      gender: "male",
      e_mail: "dont have",
      experience_level: "beginner",
      phone_number: "010265642362",
    }

    test(`put ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c9cd0503c242d1d38b8731a`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(400)
    })
       
  }  

  deleteRequest  () {
    test(`delete ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c9cd7643c242d1d38b87321`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(['msg','data'])
      expect(response.status).toEqual(200)
    })
  }

   getMyProjects  () {
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c786899f8a8e026447d212f/myProjects`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(response.status).toEqual(200)
    })
  }

  putApproveONFinalReview  () {
    const requestBody = {
    }
    test(`put ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c9cd0503c242d1d38b8731a`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      expect(response.status).toEqual(200)

    })    
  }

  putDisapproveONFinalReview  () {
    const requestBody = {
    }
    test(`put ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c9cd0503c242d1d38b8731a`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      expect(response.status).toEqual(200)

    })    
  }

}
module.exports = PARTests
const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const ConsultancyAgencys = require('../../models/ConsultancyAgency') //require your model
const ObjectId = require('mongoose');

class CATest extends AbstractTests {
  constructor (PORT, ROUTE) {
    super(PORT, ROUTE)
    this.sharedState = {
      id:null,
      name: null,
      telephoneNumber: null,
      email: null,
      location: null,
      yearsOfExperience: null
    }
  }

  run() {
    super.run()
    try {
      return new Promise((resolve, reject) => {
        describe('Making sure A routes work', () => {
        this.postRequest()
        //this.postRequestFailed()
        //this.getRequest()
        // this.putRequest()
         //this.putRequestFailed()
         // this.deleteRequest()
         this.getById();
          // add all methods

        })
        resolve()
      })
    } catch (err) {}
  }


  postRequest () {
    const CAbody = {
      name: "Travel_Agency",
      telephoneNumber: "0104142156",
      email: "Travel_Agency@yahoo.com",
      location: "Nasr_city,cairo,Egypt",
      yearsOfExperience:3 
    }
 

    test(`post ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(CAbody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['msg','data'])
      expect(response.status).toEqual(200)
      
      const eRequest = await ConsultancyAgencys.findOne(CAbody).exec()
      expect(eRequest.name).toEqual(CAbody.name)
      expect(eRequest.telephoneNumber).toEqual(CAbody.telephoneNumber)
      expect(eRequest.email).toEqual(CAbody.email)
      expect(eRequest.location).toEqual(CAbody.location)
      expect(eRequest.yearsOfExperience).toEqual(CAbody.yearsOfExperience)
      this.sharedState.name =  eRequest.name
      this.sharedState.telephoneNumber =  eRequest.telephoneNumber
      this.sharedState.email =  eRequest.email
      this.sharedState.location =  eRequest.location
      this.sharedState.yearsOfExperience =  eRequest.yearsOfExperience
      this.sharedState.isAccepted =  eRequest.isAccepted
      this.sharedState.id =  eRequest.id
    })
  }
  postRequestFailed () {
    const requestBody = {
      name: "Travel_Agency",
      telephoneNumber: "0104142156",
      email: "Travel_Agency@yahoo.com",
      location: "Nasr_city,cairo,Egypt",
      yearsOfExperience:"os" 
    }
 

    test(`post ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(['error'])
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
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(response.status).toEqual(200)

     
      
    })
  }

  putRequest () {
    const CAbody = {
      telephoneNumber: "0101000",
      yearsOfExperience:5 
    }
 

    test(`put ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'PUT',
        body: JSON.stringify(CAbody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      expect(response.status).toEqual(200)
      const eRequest = await ConsultancyAgencys.findOne(CAbody).exec()
      expect(eRequest.telephoneNumber).toEqual(CAbody.telephoneNumber)
      expect(eRequest.yearsOfExperience).toEqual(CAbody.yearsOfExperience)
      this.sharedState.telephoneNumber =  eRequest.telephoneNumber
      this.sharedState.yearsOfExperience =  eRequest.yearsOfExperience
      
    })
  }
  putRequestFailed () {
    const CAbody = {
      telephoneNumber: "010100000",
      yearsOfExperience:"df"
    }
 

    test(`put ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: 'PUT',
        body: JSON.stringify(CAbody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(400)
      const eRequest = await ConsultancyAgencys.findOne(CAbody).exec()
      expect(eRequest.telephoneNumber).toEqual(CAbody.telephoneNumber)
      expect(eRequest.yearsOfExperience).toEqual(CAbody.yearsOfExperience)
      this.sharedState.telephoneNumber =  eRequest.telephoneNumber
      this.sharedState.yearsOfExperience =  eRequest.yearsOfExperience
      
    })
  }

  deleteRequest  () {
    test(`delete ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      expect(Object.keys(jsonResponse)).toEqual(['msg','data'])
      expect(response.status).toEqual(200)
      
      
    })
  }
  getById(){
    
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(response.status).toEqual(200)

     
      
    })
  }
}
module.exports = CATest

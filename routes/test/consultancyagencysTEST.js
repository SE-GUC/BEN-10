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
        //this.postRequest()
       // this.postRequestFail()
        //this.getRequest()
        //this.putRequest()
        //this.putRequestFail()
        //this.deleteRequest()
        // this.deleteRequestFail()
         //this.getById()
        //this.getByIdFail()
           //22 AS a consultancy Agency i want to view my events
            //this.viewMyEvents()
          //  this.viewMyEventsFail()
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
      console.log(jsonResponse)
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
  postRequestFail () {
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
      telephoneNumber: "01010000",
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
  putRequestFail () {
    const CAbody = {
      telephoneNumber: "01010121234000",
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
  deleteRequestFail  () {
    test(`delete ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c79260b4328ab820437d835c23`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)
      
      
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
  getByIdFail(){
    
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}//5c79260b4328ab820437d835c23`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)

     
      
    })
  }
  viewMyEvents(){
    test(`CA view events ${this.base_url}`, async () => {
      const ca =await ConsultancyAgencys.find();
      const ca1 =ca[0];
      const caid=ca1.id
      const response = await fetch(`${this.base_url}/${caid}/ShowMyEvents`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(response.status).toEqual(200)

  })}

  viewMyEventsFail(){
    test(`CA view events fail ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c79260b4328a0437835cds/ShowMyEvents`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)
  
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)
  
  })}
  

}

module.exports = CATest

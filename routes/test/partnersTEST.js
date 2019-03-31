const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Partner = require('../../models/PartnerInfo') //require your model
const Project = require('../../models/Project')
const EventRequest = require('../../models/EventRequest')
const ObjectId = require('mongoose');

class PTest extends AbstractTests {
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
          // this.deleteProject()
           //this.ShowMyEvents() 
           this.SubmitRequest()
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


  deleteProject () {
    test(`delete ${this.base_url}`, async () => {
      const projects = await Project.find()
      const project = projects[0]
      console.log(project.id)
      console.log(project.companyID)
      const response = await fetch(`${this.base_url}/${project.companyID}/deleteProject/${project.id}`, {
        method: 'DELETE',
        //body: JSON.stringify(requestBody),
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


  ShowMyEvents(){
    test(`get ${this.base_url}`, async () => {
      const par = await Partner.find()
      const par1 = par[0]
      const parid = par1.id
      const response = await fetch(`${this.base_url}/${parid}/ShowMyEvents`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      if(jsonResponse.msg =="NO Events to show")
      {
      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      }
      else {
        expect(Object.keys(jsonResponse)).toEqual(['data'])
      }

      expect(response.status).toEqual(200)
  }
    )}
    ShowMyEventsFailure(){
      test(`get ${this.base_url}`, async () => {
        const response = await fetch(`${this.base_url}/1234567890/ShowMyEvents`, {
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
    SubmitRequest(){
      
        
          const requestBody = {
              requestedBy: "reqzz",
              description: "desc",
              eventType: "type",
              eventLocation: "loc",
              eventDate: "1/1/2020",
              isAccepted: false,
              requestorId: "5c784be40bc82a5f186ac770"
    }
    test(`post ${this.base_url}`, async () => {
      const eventrequests = await EventRequest.find()
      const eventrequest = eventrequests[0]
      console.log(eventrequest.id)
      console.log(eventrequest.requestorId)
      const response = await fetch(`${this.base_url}/${eventrequest.requestorId}/submitRequest`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse).toString()).toEqual(['msg'].toString())
      expect(response.status).toEqual(200)
    const eRequest = await EventRequest.findOne(requestBody).exec()

      expect(new String(eRequest.requestedBy)).toEqual(requestBody.requestedBy)
      expect(eRequest.description).toEqual(requestBody.description)
      expect(eRequest.eventType).toEqual(requestBody.eventType)
      expect(eRequest.eventLocation).toEqual(requestBody.eventLocation)
      expect(eRequest.isAccepted).toEqual(requestBody.isAccepted)
      expect(new String(eRequest.requestorId)).toEqual(requestBody.requestorId)

      this.sharedState.requestedBy =  eRequest.requestedBy
      this.sharedState.description =  eRequest.description
      this.sharedState.eventType =  eRequest.eventType
      this.sharedState.eventLocation =  eRequest.eventLocation
      this.sharedState.eventDate =  eRequest.eventDate
      this.sharedState.isAccepted =  eRequest.isAccepted
      this.sharedState.requestorId = eRequest.requestorId
    
    
    })
  }

  SubmitRequestFailure(){
      
        
    const requestBody = {
        requestedBy: "reqzz",
        description: "desc",
        eventType: "type",
        eventLocation: "loc",
        eventDate: "hi",
        isAccepted: false,
        requestorId: "5c784be40bc82a5f186ac770"
}
test(`post ${this.base_url}`, async () => {
const eventrequests = await EventRequest.find()
const eventrequest = eventrequests[0]
console.log(eventrequest.id)
console.log(eventrequest.requestorId)
const response = await fetch(`${this.base_url}/${eventrequest.requestorId}/submitRequest`, {
  method: 'POST',
  body: JSON.stringify(requestBody),
  headers: { 'Content-Type': 'application/json' }
})
console.log("response stastus: "+ response.status)
const jsonResponse = await response.json()
console.log(jsonResponse)

expect(Object.keys(jsonResponse).toString()).toEqual(['msg'].toString())
expect(response.status).toEqual(200)
}
)}
}
    
  
module.exports = PTest
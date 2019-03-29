const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const admin = require('../../models/Admin') //require your model
const event = require('../../models/Event')
const eventrequest = require('../../models/EventRequest')
const ObjectId = require('mongoose');

class adminTest extends AbstractTests {
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
          //this.getRequest()
          //this.putRequest()
          //this.deleteRequest()
         // this.postEvent()
         this.getAllEventRequests()
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
      const ad=await admin.find();
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
  //as an admin i want to view all eventrequests
  getAllEventRequests(){
    test(`get ${this.base_url}`, async () => {
      const ad=await admin.find();
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


}
module.exports = adminTest

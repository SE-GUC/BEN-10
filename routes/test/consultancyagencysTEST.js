const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const ConsultancyAgency = require("../../models/ConsultancyAgency");
const ObjectId = require('mongoose');

class CATest extends AbstractTests {
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
        describe('Making sure CA routes work', () => {
          // this.postRequest()
          // this.getRequest()
          // this.putRequest()
          // this.deleteRequest()
          // add all methods
          this.CARequestEvent()
          this.CARequestEventmissingattribute()
          this.CARequestEventwrongattribute()

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

//2.4 --As a consultancy agency I want to request to organize an event.
  CARequestEvent() {
    const requestBody = {
    "eventDate":"5/1/2019",
    "requestedBy": "no requested by",
    "description": "no description",
    "eventType": "no type",
    "eventLocation": "no event location"
  }
  
  test(`post ${this.base_url}/${this.sharedState.id}/eventrequests/`, async () => {
    const response = await fetch(`${this.base_url}/5c79260b4328ab820437835c/eventrequests/`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      expect(Object.keys(jsonResponse)).toEqual(["msg"])
      expect(response.status).toEqual(200)
    })
  }

//2.4 --As a consultancy agency I want to request to organize an event.
  CARequestEventmissingattribute() {
    const requestBody = {
    "requestedBy": "no requested by",
    "description": "no description",
    "eventType": "no type",
    "eventLocation": "no event location"
    }
    test(`post ${this.base_url}/${this.sharedState.id}/eventrequests/`, async () => {
      const response = await fetch(`${this.base_url}/5c79260b4328ab820437835c/eventrequests/`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(400)
    });
  }

//2.4 --As a consultancy agency I want to request to organize an event.
  CARequestEventwrongattribute() {
    const requestBody = {
      "eventDate":"5/1/2019",
      "requestedBy": "no requested by",
      "description": 4,
      "eventType": "no type",
      "eventLocation": "no event location"
    }
    test(`post ${this.base_url}/${this.sharedState.id}/eventrequests/`, async () => {
      const response = await fetch(`${this.base_url}/5c79260b4328ab820437835c/eventrequests/`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(400)
    });
  }

}
module.exports = CATest

const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Partner = require("../../models/PartnerInfo");
const ObjectId = require('mongoose');

class PaTest extends AbstractTests {
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
          // add all methods
          this.Partnerrequestrating()
          this.PartnerrequestratingbywrongPartnerID()
          this.PartnerrequestratingbynotavalidatedPartnerID()
          this.PartnerrequestratingbywrongEventID()
          this.PartnerrequestratingbynotavalidatedEventID()
          this.PartnerrequestratingbynotanEventsOwner()
        })
        resolve()
      })
    } catch (err) {}
  }


  postRequest () {}
  getRequest  () {}
  putRequest  () {}
  deleteRequest  () {}

  // 10 As a patrner I want to give the attendees a form to rate the event and give a feedback
  Partnerrequestrating(){
    const requestBody = {}
  
  test(`post ${this.base_url}/${this.sharedState.id}/rating/:eid/`, async () => {
    const response = await fetch(`${this.base_url}/5c786899f8a8e026447d212f/rating/5c9cda328acdd615d268e514/`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      expect(response.status).toEqual(200)
    })
  }

  // 10 As a patrner I want to give the attendees a form to rate the event and give a feedback
  PartnerrequestratingbywrongPartnerID(){
    const requestBody = {}
  
  test(`post ${this.base_url}/:pid/rating/:eid/`, async () => {
    const response = await fetch(`${this.base_url}/5c786899f8a8e826447d212f/rating/5c9cda328acdd615d268e514/`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)
    })
  }

  // 10 As a patrner I want to give the attendees a form to rate the event and give a feedback
  PartnerrequestratingbynotavalidatedPartnerID(){
    const requestBody = {}
  
  test(`post ${this.base_url}/:pid/rating/:eid/`, async () => {
    const response = await fetch(`${this.base_url}/5c786899f8a8e26447d212f/rating/5c9cda328acdd615d268e514/`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)
    })
  }

  // 10 As a patrner I want to give the attendees a form to rate the event and give a feedback
  PartnerrequestratingbywrongEventID(){
    const requestBody = {}
  
  test(`post ${this.base_url}/${this.sharedState.id}/rating/:eid/`, async () => {
    const response = await fetch(`${this.base_url}/5c786899f8a8e026447d212f/rating/5c9cda328acdd615d868e514/`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)
    })
  }

  // 10 As a patrner I want to give the attendees a form to rate the event and give a feedback
  PartnerrequestratingbynotavalidatedEventID(){
    const requestBody = {}
  
  test(`post ${this.base_url}/${this.sharedState.id}/rating/:eid/`, async () => {
    const response = await fetch(`${this.base_url}/5c786899f8a8e026447d212f/rating/5c9cda328add615d268e514/`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)
    })
  }

  // 10 As a patrner I want to give the attendees a form to rate the event and give a feedback
  PartnerrequestratingbynotanEventsOwner(){
    const requestBody = {}
  
  test(`post ${this.base_url}/${this.sharedState.id}/rating/:eid/`, async () => {
    const response = await fetch(`${this.base_url}/5c7a5ae73c28ff08583304ee/rating/5c9cda328add615d268e514/`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)
    })
  }

}
module.exports = PaTest
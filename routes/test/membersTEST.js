const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Admin = require('../../models/member')
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
          // add all methods
          // this.postevent()
          // this.posteventbywrongMemberID()
          // this.posteventbynotavalidatedMemberID()
          // this.posteventbywrongEventID()
          // this.posteventbynotavalidatedEventID()
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
      const response = await fetch(`${this.base_url}/5c93d983f3fe6358b41ccd7a/events/5c9ce0e20ddd11042a301e26/`, {
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
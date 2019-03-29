const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Admin = require('../../models/Admin')
const ObjectId = require('mongoose');

class ATest extends AbstractTests {
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
        describe('Making sure Admins routes work', () => {
          // this.postRequest()
          // this.getRequest()
          // this.putRequest()
          // this.deleteRequest()
          // add all methods
          this.getdescription()
          this.getdescriptionbywrongAdminID()
          this.getdescriptionbynotavalidatedAdminID()
          this.getdescriptionbywrongProjectID()
          this.getdescriptionbynotavalidatedProjectID()
          this.AdminNotifyAcceptedCandidate()
          this.AdminNotifyAcceptedCandidatemissingattribute()
          this.AdminNotifyAcceptedCandidatebywrongAdminID()
          this.AdminNotifyAcceptedCandidatebynotavalidatedAdminID()
          this.AdminNotifyAcceptedCandidatebywrongCandidateID()
          this.AdminNotifyAcceptedCandidatebynotavalidatedCandidateID()
        })
        resolve()
      })
    } catch (err) {}
  }


  postRequest () {}

  getRequest  () {}
  putRequest  () {}
  deleteRequest  () {}

  //3 --As an admin I want to further check the description of a task/project so that it will be posted for candidates to apply
  getdescription() {
    test(`get ${this.base_url}/${this.sharedState.id}/pdescription/:id/`, async () => {
      const response = await fetch(`${this.base_url}/5c784be40bc82a5f186ac770/pdescription/5c94436fd0c61339203ad8c7/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(response.status).toEqual(200)
    })
  }

//3 --As an admin I want to further check the description of a task/project so that it will be posted for candidates to apply
  getdescriptionbywrongAdminID() {
    test(`get ${this.base_url}/${this.sharedState.id}/pdescription/:id/`, async () => {
      const response = await fetch(`${this.base_url}/5c734be40bc82a5f186ac770/pdescription/5c94436fd0c61339203ad8c7/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)
    })
  }

//3 --As an admin I want to further check the description of a task/project so that it will be posted for candidates to apply
  getdescriptionbynotavalidatedAdminID() {
    test(`get ${this.base_url}/${this.sharedState.id}/pdescription/:id/`, async () => {
      const response = await fetch(`${this.base_url}/5c78be40bc82a5f186ac770/pdescription/5c94436fd0c61339203ad8c7/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)
    })
  }

  //3 --As an admin I want to further check the description of a task/project so that it will be posted for candidates to apply
  getdescriptionbywrongProjectID() {
    test(`get ${this.base_url}/${this.sharedState.id}/pdescription/:id/`, async () => {
      const response = await fetch(`${this.base_url}/5c784be40bc82a5f186ac770/pdescription/5c94436fd0c61339203adc7/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(response.status).toEqual(404)
    })
  }

  //3 --As an admin I want to further check the description of a task/project so that it will be posted for candidates to apply
  getdescriptionbynotavalidatedProjectID() {
    test(`get ${this.base_url}/${this.sharedState.id}/pdescription/:id/`, async () => {
      const response = await fetch(`${this.base_url}/5c784be40bc82a5f186ac770/pdescription/5c98436fd0c61339203ad8c7/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(response.status).toEqual(404)
    })
  }

//3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project
  AdminNotifyAcceptedCandidate() {
    const requestBody = {
    "description": "no description"
  }
  
  test(`post ${this.base_url}/${this.sharedState.id}/notifications/:id/`, async () => {
    const response = await fetch(`${this.base_url}/5c7a603a0a4938ccd1e08e76/notifications/5c93d983f3fe6358b41ccd7a`, {
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

//3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project
  AdminNotifyAcceptedCandidatemissingattribute() {
    const requestBody = {}
  
  test(`post ${this.base_url}/${this.sharedState.id}/notifications/:id/`, async () => {
    const response = await fetch(`${this.base_url}/5c7a603a0a4938ccd1e08e76/notifications/5c93d983f3fe6358b41ccd7a`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(400)
    })
  }

//3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project
  AdminNotifyAcceptedCandidatebywrongAdminID() {
    const requestBody = {
    "description": "no description"
  }
  
  test(`post ${this.base_url}/${this.sharedState.id}/notifications/:id/`, async () => {
    const response = await fetch(`${this.base_url}/5c7a603a0a4938cc1e08e76/notifications/5c93d983f3fe6358b41ccd7a`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }

//3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project
  AdminNotifyAcceptedCandidatebynotavalidatedAdminID() {
    const requestBody = {
    "description": "no description"
  }
  
  test(`post ${this.base_url}/${this.sharedState.id}/notifications/:id/`, async () => {
    const response = await fetch(`${this.base_url}/5c7a603a0a4938ccd1e88e76/notifications/5c93d983f3fe6358b41ccd7a`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }

  //3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project
  AdminNotifyAcceptedCandidatebywrongCandidateID() {
    const requestBody = {
    "description": "no description"
  }
  
  test(`post ${this.base_url}/${this.sharedState.id}/notifications/:id/`, async () => {
    const response = await fetch(`${this.base_url}/5c7a603a0a4938ccd1e08e76/notifications/5c93d983f3fe6358b4ccd7a`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }

  //3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project
  AdminNotifyAcceptedCandidatebynotavalidatedCandidateID() {
    const requestBody = {
    "description": "no description"
  }
  
  test(`post ${this.base_url}/${this.sharedState.id}/notifications/:id/`, async () => {
    const response = await fetch(`${this.base_url}/5c7a603a0a4938ccd1e08e76/notifications/5c93d983f3fe6458b41ccd7a`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }

}
module.exports = ATest

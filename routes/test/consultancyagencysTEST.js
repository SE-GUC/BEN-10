const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const CAs = require("../../models/ConsultancyAgency");
const Projects = require("../../models/Project");
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
          this.putRequestApprove()
          this.putRequestApprovenotaFinalReviewProject()
          this.putRequestApprovebywrongCAID()
          this.putRequestApprovebynotavalidatedCAID()
          this.putRequestApprovebywrongProjectID()
          this.putRequestApprovebynotavalidatedProjectID()
          this.putRequestApprovebynotaProjectsOwner()
          this.putRequestDisapprove()
          this.putRequestDisapprovenotaFinalReviewProject()
          this.putRequestDisapprovebywrongCAID()
          this.putRequestDisapprovebynotavalidatedCAID()
          this.putRequestDisapprovebywrongProjectID()
          this.putRequestDisapprovebynotavalidatedProjectID()
          this.putRequestDisapprovebynotaProjectsOwner()
        })
        resolve()
      })
    } catch (err) {}
  }


  postRequest () {}

  getRequest  () {}
  putRequest  () {}
  deleteRequest  () {}

//2.4 --As a consultancy agency I want to request to organize an event.
  CARequestEvent() {
    
    test(`post ${this.base_url}/${this.sharedState.id}/eventrequests/`, async () => {
      const ca = await CAs.find();
      const ca1 = ca[0];
      const caid = ca1.id;
      const requestBody = {
        "eventDate":"5/1/2019",
        "requestedBy": "no requested by",
        "description": "no description",
        "eventType": "no type",
        "eventLocation": "no event location"
      }
    const response = await fetch(`${this.base_url}/${caid}/eventrequests/`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
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
      const ca = await CAs.find();
      const ca1 = ca[0];
      const caid = ca1.id;
      const response = await fetch(`${this.base_url}/${caid}/eventrequests/`, {
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
      "eventDate":"cd",
      "requestedBy": "no requested by",
      "description": "no description",
      "eventType": "no type",
      "eventLocation": "no event location"
    }
    test(`post ${this.base_url}/${this.sharedState.id}/eventrequests/`, async () => {
      const ca = await CAs.find();
      const ca1 = ca[0];
      const caid = ca1.id;
      const response = await fetch(`${this.base_url}/${caid}/eventrequests/`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
    });
  }

  // 8 As a CA I wanto to approve the final review of a project
  putRequestApprove() {
    const requestBody = {}
    test(`put ${this.base_url}/${this.sharedState.id}/finalreview/:id2/approve/`, async () => {
      const prs = await Projects.find()
      const cas = await CAs.find()
      var ids =[]
      var i=0
      for(i;i<cas.length;i++){

        ids.push(cas[i].id.toString())        
      }
      var i=0
      var result =[]
      for(i;i<prs.length;i++){
        if(prs[i].consultancyID != null)
          if(ids.includes(prs[i].consultancyID.toString())){
            result.push(prs[i])
          }
      }
      const cid = result[0].consultancyID
      const pr = result[0].id
      await fetch(
        `${this.projects_url}/${pr}/`,
        {
          method: "put",
          body: JSON.stringify({life_cycle : "Final Review"}),
          headers: { "Content-Type": "application/json" }
        }
      );
      const response = await fetch(`${this.base_url}/${cid}/finalreview/${pr}/approve/`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(["msg"])
      expect(response.status).toEqual(200)
    })
  }

  // 8 As a CA I wanto to approve the final review of a project
  putRequestApprovenotaFinalReviewProject() {
    const requestBody = {}
    test(`put ${this.base_url}/${this.sharedState.id}/finalreview/:id2/approve/`, async () => {
      const response = await fetch(`${this.base_url}/5c79260b4328ab820437835c/finalreview/5c9541519e2e790b2bcbbf8e/approve/`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }
  
  // 8 As a CA I wanto to approve the final review of a project
  putRequestApprovebywrongCAID() {
    const requestBody = {}
    test(`put ${this.base_url}/${this.sharedState.id}/finalreview/:id2/approve/`, async () => {
      const response = await fetch(`${this.base_url}/5c79250b4328ab820437835c/finalreview/5c9541519e2e790b2bcbbf8e/approve/`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }

  // 8 As a CA I wanto to approve the final review of a project
  putRequestApprovebynotavalidatedCAID() {
    const requestBody = {}
    test(`put ${this.base_url}/${this.sharedState.id}/finalreview/:id2/approve/`, async () => {
      const response = await fetch(`${this.base_url}/5c79260b4328ab82037835c/finalreview/5c9541519e2e790b2bcbbf8e/approve/`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }

  // 8 As a CA I wanto to approve the final review of a project
  putRequestApprovebywrongProjectID() {
    const requestBody = {}
    test(`put ${this.base_url}/${this.sharedState.id}/finalreview/:id2/approve/`, async () => {
      const response = await fetch(`${this.base_url}/5c79260b4328ab820437835c/finalreview/5c9541519e2e720b2bcbbf8e/approve/`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }

  // 8 As a CA I wanto to approve the final review of a project
  putRequestApprovebynotavalidatedProjectID() {
    const requestBody = {}
    test(`put ${this.base_url}/${this.sharedState.id}/finalreview/:id2/approve/`, async () => {
      const response = await fetch(`${this.base_url}/5c79260b4328ab820437835c/finalreview/5c9541519e2e790b2bcbf8e/approve/`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }

  // 8 As a CA I wanto to approve the final review of a project
  putRequestApprovebynotaProjectsOwner() {
    const requestBody = {}
    test(`put ${this.base_url}/${this.sharedState.id}/finalreview/:id2/approve/`, async () => {
      const response = await fetch(`${this.base_url}/5c94ca61a090f53af42de4a6/finalreview/5c9cadf62ebb340f1324e458/approve/`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }

  // 8 As a CA I wanto to disapprove the final review of a project
  putRequestDisapprove() {
    const requestBody = {}
    test(`put ${this.base_url}/${this.sharedState.id}/finalreview/:id2/disapprove/`, async () => {
      const prs = await Projects.find()
      const cas = await CAs.find()
      var ids =[]
      var i=0
      for(i;i<cas.length;i++){

        ids.push(cas[i].id.toString())        
      }
      var i=0
      var result =[]
      for(i;i<prs.length;i++){
        if(prs[i].consultancyID != null)
          if(ids.includes(prs[i].consultancyID.toString())){
            result.push(prs[i])
          }
      }
      const cid = result[0].consultancyID
      const pr = result[0].id
      if (cid!=null && pr!=null){
        await fetch(
          `${this.projects_url}/${pr}/`,
          {
            method: "put",
            body: JSON.stringify({life_cycle : "Final Review"}),
            headers: { "Content-Type": "application/json" }
          }
        );
      const response = await fetch(`${this.base_url}/${cid}/finalreview/${pr}/disapprove/`, {
          method: 'PUT',
          body: JSON.stringify(requestBody),
          headers: { 'Content-Type': 'application/json' }
        })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(["msg"])
      expect(response.status).toEqual(200)
      }
    })
  }

  // 8 As a CA I wanto to disapprove the final review of a project
  putRequestDisapprovenotaFinalReviewProject() {
    const requestBody = {}
    test(`put ${this.base_url}/${this.sharedState.id}/finalreview/:id2/disapprove/`, async () => {
      const response = await fetch(`${this.base_url}/5c79260b4328ab820437835c/finalreview/5c9541519e2e790b2bcbbf8e/disapprove/`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }
  
  // 8 As a CA I wanto to disapprove the final review of a project
  putRequestDisapprovebywrongCAID() {
    const requestBody = {}
    test(`put ${this.base_url}/${this.sharedState.id}/finalreview/:id2/disapprove/`, async () => {
      const response = await fetch(`${this.base_url}/5c79250b4328ab820437835c/finalreview/5c9541519e2e790b2bcbbf8e/disapprove/`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }

  // 8 As a CA I wanto to disapprove the final review of a project
  putRequestDisapprovebynotavalidatedCAID() {
    const requestBody = {}
    test(`put ${this.base_url}/${this.sharedState.id}/finalreview/:id2/disapprove/`, async () => {
      const response = await fetch(`${this.base_url}/5c79260b4328ab82037835c/finalreview/5c9541519e2e790b2bcbbf8e/disapprove/`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }

  // 8 As a CA I wanto to disapprove the final review of a project
  putRequestDisapprovebywrongProjectID() {
    const requestBody = {}
    test(`put ${this.base_url}/${this.sharedState.id}/finalreview/:id2/disapprove/`, async () => {
      const response = await fetch(`${this.base_url}/5c79260b4328ab820437835c/finalreview/5c9541519e2e720b2bcbbf8e/disapprove/`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }

  // 8 As a CA I wanto to disapprove the final review of a project
  putRequestDisapprovebynotavalidatedProjectID() {
    const requestBody = {}
    test(`put ${this.base_url}/${this.sharedState.id}/finalreview/:id2/disapprove/`, async () => {
      const response = await fetch(`${this.base_url}/5c79260b4328ab820437835c/finalreview/5c9541519e2e790b2bcbf8e/disapprove/`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }

  // 8 As a CA I wanto to disapprove the final review of a project
  putRequestDisapprovebynotaProjectsOwner() {
    const requestBody = {}
    test(`put ${this.base_url}/${this.sharedState.id}/finalreview/:id2/disapprove/`, async () => {
      const response = await fetch(`${this.base_url}/5c94ca61a090f53af42de4a6/finalreview/5c9cadf62ebb340f1324e458/disapprove/`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }


}
module.exports = CATest

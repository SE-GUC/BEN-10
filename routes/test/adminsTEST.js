
const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Admin = require('../../models/Admin')
const Project = require("../../models/Project");
const Member = require('../../models/member')
const ObjectId = require('mongoose');

class ATest extends AbstractTests {
  constructor (PORT, ROUTE) {
    super(PORT, ROUTE)
    this.sharedState = {
      // enter model attributes an set them to null
    };
  }

  run() {
    super.run();
    try {
      return new Promise((resolve, reject) => {
        describe("Making sure Admin routes work", () => {

          this.postRequest()
          this.getRequest()
          this.putRequest()
          this.deleteRequest()
          this.postAProject();
          this.sendFinalDraft();
          this.sendFinalDraftFail();
          this.postAProjectFail();
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
          this.getAllCA()
          this.getAllCAFail()
          this.identifyProject()
          this.identifyProjectFailed()
          this.viewAllEvents()
          this.viewAllEventsFailed()
        })
        resolve()
      })
    } catch (err) {}
  }

  postRequest() {}

  getRequest() {}
  putRequest() {}
  deleteRequest() {}

 getdescription() {
    test(`get ${this.base_url}/${this.sharedState.id}/pdescription/:id/`, async () => {
      const ad = await Admin.find();
      const ad1 = ad[0];
      const adid = ad1.id;
      const pr = await Project.find();
      const pr1 = pr[0];
      const prid = pr1.id;
      const response = await fetch(`${this.base_url}/${adid}/pdescription/${prid}/`, {
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
    const ad = await Admin.find();
        const ad1 = ad[0];
        const adid = ad1.id;
        const m = await Member.find();
        const m1 = m[0];
        const mid = m1.id;
    const response = await fetch(`${this.base_url}/${adid}/notifications/${mid}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(["msg"])
      expect(response.status).toEqual(200)
    })
  }

//3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project
  AdminNotifyAcceptedCandidatemissingattribute() {
    test(`post ${this.base_url}/${this.sharedState.id}/notifications/:id/`, async () => {
      const requestBody = {}
      const ad = await Admin.find();
      const ad1 = ad[0];
      const adid = ad1.id;
      const m = await Member.find();
      const m1 = m[0];
      const mid = m1.id;
    const response = await fetch(`${this.base_url}/${adid}/notifications/${mid}`, {
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
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }

  getAllCA(){
    test(`get ${this.base_url}`, async () => {
      const ad = await Admin.find();
      const ad1 = ad[0];
      const adid = ad1.id;
      const response = await fetch(`${this.base_url}/${adid}/ShowAllCA`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      //console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      //console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(response.status).toEqual(200)
    })
  }

  getAllCAFail (){//enter invalid admin id
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c7a6797938ccd1e08e7c/ShowAllCA`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      //console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      //console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }


  // 3.1- As and admin i want to identify a task/project with a set of attributes so that it defines it
  identifyProject () {
    const identifiedBody = {
       // enter model attributes
       company : "GUCCO" ,
       category : "Education"
    }

    test(`put ${this.base_url}`, async () => {
      const admins = await Admin.find()
      const admin = admins[0]
      const projects = await Project.find()
      const proj = projects[0]
      const response = await fetch(`${this.base_url}/${admin.id}/assignAttributes/${proj.id}`, {
        method: 'PUT',
        body: JSON.stringify(identifiedBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      expect(response.status).toEqual(200)

      this.sharedState.company =  identifiedBody.company
      this.sharedState.category =  identifiedBody.category
      
    })
  }

  identifyProjectFailed() {
    const identifiedBody = {
       // enter model attributes
       company : "GUCCO" ,
       category : "Education"
    }

    test(`put ${this.base_url}`, async () => {
      // const admins = await Admin.find()
      // const admin = admins[0]
      // const projects = await Project.find()
      // const proj = projects[0]
      const response = await fetch(`${this.base_url}/5c79260b4328ab820437835/assignAttributes/5c94436fd0c61339203ad8c`, {
        method: 'PUT',
        body: JSON.stringify(identifiedBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)

      //this.sharedState.company =  identifiedBody.company
      //this.sharedState.category =  identifiedBody.category
      
    })
  }

  viewAllEvents(){
    test(`get ${this.base_url}`, async () => {
      const admins = await Admin.find()
      const admin = admins[0]
      const response = await fetch(`${this.base_url}/${admin.id}/ShowAllEvents`, {
        method: 'GET',
        //body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(response.status).toEqual(200)

     
      
    })
  }

  viewAllEventsFailed(){
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c784be40bc82a5f186ac7/ShowAllEvents`, {
        method: 'GET',
        //body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)

     
      
    })
  }
  
  postAProject() {
    const requestBody = {};

    test(`Admin Post A Project ${
      this.base_url
    }/:aid/postProject/:pid`, async () => {
      const ad = await Admin.find();
      const ad1 = ad[0];
      const adid = ad1.id;
      const pr = await Project.find();
      const pr1 = pr[0];
      const prid = pr1.id;
      const response = await fetch(
        `${this.base_url}/${adid}/postProject/${prid}`,
        {
          method: "put",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["msg"]);
      expect(response.status).toEqual(200);
    });
  }

  sendFinalDraft() {
    const requestBody = {
      final_draft: "TESTDARFT"
    };

    test(`Admin Send Final Draft ${
      this.base_url
    }/:aid/myProjects/:pid/sendDraft`, async () => {
      const ad = await Admin.find();
      const ad1 = ad[0];
      const pr = await Project.find();
      const pr1 = pr[0];
      const response = await fetch(
        `${
          this.base_url
        }/${ad1.id}/myProjects/${pr1.id}/sendDraft`,
        {
          method: "put",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["msg"]);
      expect(response.status).toEqual(200);
    });
  }

  postAProjectFail() {
    const requestBody = {};

    test(`Admin Post A Project Fail${
      this.base_url
    }/:aid/postProject/:pid`, async () => {
      const ad = await Admin.find();
      const ad1 = ad[0];
      const adid = ad1.id;
      const pr = await Project.find();
      const pr1 = pr[0];
      const prid = pr1.id;
      const response = await fetch(
        `${this.base_url}/${adid}/postProject/5c79283c92334b03f4b624f`,
        {
          method: "put",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["error"]);
      expect(response.status).toEqual(404);
    });
  }

  sendFinalDraftFail() {
    const requestBody = {
    };

    test(`Admin Send Final Draft Fail ${
      this.base_url
    }/:aid/myProjects/:pid/sendDraft`, async () => {
      const ad = await Admin.find();
      const ad1 = ad[0];
      const pr = await Project.find();
      const pr1 = pr[0];
      const response = await fetch(
        `${
          this.base_url
        }/${ad1.id}/myProjects/${pr1.id}/sendDraft`,
        {
          method: "put",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["error"]);
      expect(response.status).toEqual(400);
    });
  }
  
}

module.exports = ATest

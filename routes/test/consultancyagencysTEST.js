
const fetch = require("node-fetch");
const AbstractTests = require("./AbstractTests");
const Events = require('../../models/Event') //require your model
const App = require('../../models/Application')
const CAs = require("../../models/ConsultancyAgency");
const Projects = require("../../models/Project");
const ObjectId = require('mongoose');

class CATest extends AbstractTests {
  constructor(PORT, ROUTE) {
    super(PORT, ROUTE);
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
    super.run();
    try {
      return new Promise((resolve, reject) => {
        describe("Making sure CA routes work", () => {

          this.postRequest()
        this.postRequestFail()
        this.getRequest()
        this.getById()
        this.getByIdFail()
        this.putRequest()
        this.putRequestFail()
        this.deleteRequest()
        this.deleteRequestFail()         
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
          this.applyForProject()
          this.applyForProjectFailed()
          this.viewMyProjects()
          this.viewMyProjectsFailed()
          this.assignCandidate();
          this.caRequestRating();
          this.assignCandidateFail();
          this.caRequestRatingFail();
          this.applyingMembers();
          this.applyingMembersFail()
             this.viewMyEvents()
           this.viewMyEventsFail()
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
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['msg','data'])
      expect(response.status).toEqual(200)
      
      const eRequest = await CAs.findOne(CAbody).exec()
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
      const jsonResponse = await response.json()

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
      const jsonResponse = await response.json()

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
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      expect(response.status).toEqual(200)
      const eRequest = await CAs.findOne(CAbody).exec()
      expect(eRequest.telephoneNumber).toEqual(CAbody.telephoneNumber)
      expect(eRequest.yearsOfExperience).toEqual(CAbody.yearsOfExperience)
      this.sharedState.telephoneNumber =  eRequest.telephoneNumber
      this.sharedState.yearsOfExperience =  eRequest.yearsOfExperience
      
    })
  }
  putRequestFail () {
    const CAbody = {
      telephoneNumber: "010104000",
      yearsOfExperience:"o"
    }
 
    test(`put ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'PUT',
        body: JSON.stringify(CAbody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(400)
    })
  }
  deleteRequest  () {
    test(`delete ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
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
      const jsonResponse = await response.json()
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
      const jsonResponse = await response.json()

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
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)

     
      
    })
  }
  viewMyEvents(){
    test(`CA view events ${this.base_url}`, async () => {
      const ca =await CAs.find();
      const ca1 =ca[0];
      const caid=ca1.id
      const response = await fetch(`${this.base_url}/${caid}/ShowMyEvents`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(response.status).toEqual(200)

  })}

  viewMyEventsFail(){
    test(`CA view events fail ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c79260b4328a0437835cds/ShowMyEvents`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
  
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)
  
  })}
  
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


  applyForProject(){
    test(`put ${this.base_url}`, async () => {
      const consultancies = await CAs.find();
      const con = consultancies[0];
      const projects = await Projects.find();
      const proj = projects[0];
      const response = await fetch(`${this.base_url}/${con.id}/caApplyProject/${proj.id}`, {
        method: 'PUT',
        //body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      expect(response.status).toEqual(200)

     

    })
  }

  applyForProjectFailed(){
    test(`put ${this.base_url}`, async () => {
      //const consultancies = await CAs.find();
      //const con = consultancies[0];
      //const projects = await Projects.find();
      //const proj = projects[0];
      const response = await fetch(`${this.base_url}/5c79260b4328ab820437835/caApplyProject/5c94436fd0c61339203ad8`, {
        method: 'PUT',
        //body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)

     

    })
  }

  viewMyProjects(){
    test(`get ${this.base_url}`, async () => {
      const consultancies = await CAs.find()
      const con = consultancies[0]
      const response = await fetch(`${this.base_url}/${con.id}/projects`, {
        method: 'GET',
        //body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(response.status).toEqual(200)

     
      
    })
  }

  viewMyProjectsFailed(){
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c79260b4328ab82043783c/projects`, {
        method: 'GET',
        //body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)

     
      
    })
  }
  
  assignCandidate() {
    const requestBody = {
      // enter model attributes
    };

    test(`assignCandidate ${
      this.base_url
    }/:id/myProjects/:pid/applyingMembers/:mid/assign`, async () => {
      var apps = await App.find()
      var projs = await Projects.find()
      var prid = []
      var i =0

      for(i in  projs){
        prid.push(projs[i].id)
      }
      var app
      var prj
      var ca
      i=0
      for(i in apps){
        if(prid.includes(apps[i].projectId.toString())){
          app=apps[i]
          prj = await Projects.findById(apps[i].projectId)
          if(prj.consultancyID!=null){
            ca = prj.consultancyID
            break
          }
        }
      }

      const response = await fetch(
        `${
          this.base_url
        }/${ca}/myProjects/${app.projectId}/applyingMembers/${app.applicantId}/assign`,
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

  caRequestRating() {
    const requestBody = {
      // enter model attributes
    };

    test(`caRequestRating ${
      this.base_url
    }/:id/rating/:eid`, async () => {

      const events = await Events.find()
      const cas = await CAs.find()
      var ids =[]
      var i=0
      for(i;i<cas.length;i++){

        ids.push(cas[i].id.toString())        
      }
      var i=0
      var result =[]
      for(i;i<events.length;i++){
        if(ids.includes(events[i].requestorId.toString())){
          result.push(events[i])
        }
      }
      const cid = result[0].requestorId
      const eid = result[0].id

      const response = await fetch(
        `${
          this.base_url
        }/${cid}/rating/${eid}`,
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["msg"]);
      expect(response.status).toEqual(200);
    });
  }

  applyingMembers() {
    
    test(`applyingMembers ${
      this.base_url
    }/:id/myProjects/:pid/applyingMembers`, async () => {
      
      var projs = await Projects.find()
      projs = projs.filter(p => p.consultancyID!=null)
      const project = projs[0]
      
      const response = await fetch(
        `${
          this.base_url
        }/${project.consultancyID}/myProjects/${project.id}/applyingMembers`,
        {
          method: "get",
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["data"]);
      expect(response.status).toEqual(200);
    });
  }

  applyingMembersFail() {
    
    test(`applyingMembersFail ${
      this.base_url
    }/:id/myProjects/:pid/applyingMembers`, async () => {
      
      var projs = await Projects.find()
      projs = projs.filter(p => p.consultancyID==null)
      const project = projs[0]
      
      const response = await fetch(
        `${
          this.base_url
        }/${project.consultancyID}/myProjects/5c9446ec609f7c5080979fd/applyingMembers`,
        {
          method: "get",
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["error"]);
      expect(response.status).toEqual(404);
    });
  }

  

  assignCandidateFail() {
    const requestBody = {
      // enter model attributes
    };

    test(`assignCandidateFail ${
      this.base_url
    }/:id/myProjects/:pid/applyingMembers/:mid/assign`, async () => {
      var projs = await Projects.find()
      projs = projs.filter(p => p.applyingCA.length != null && p.consultancyID!=null && p && p.applyingCA.length > 0)
      const project = projs[0]



      const response = await fetch(
        `${
          this.base_url
        }/${project.consultancyID}/myProjects/${project.id}/applyingMembers/5c9446ec609f7c5080979fdb/assign`,
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

  caRequestRatingFail() {
    const requestBody = {
      // enter model attributes
    };

    test(`caRequestRatingFail ${
      this.base_url
    }/:id/rating/:eid`, async () => {

      const events = await Events.find()
      const cas = await CAs.find()
      var ids =[]
      var i=0
      for(i;i<cas.length;i++){

        ids.push(cas[i].id.toString())        
      }
      var i=0
      var result =[]
      for(i;i<events.length;i++){
        if(ids.includes(events[i].requestorId.toString())){
          result.push(events[i])
        }
      }
      const cid = result[0].requestorId
      const eid = result[0].id

      const response = await fetch(
        `${
          this.base_url
        }/${cid}/rating/5c9446ec609f7c5080979fdb`,
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["error"]);
      expect(response.status).toEqual(404);
    });
  }
}


module.exports = CATest

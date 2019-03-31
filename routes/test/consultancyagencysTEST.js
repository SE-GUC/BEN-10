const fetch = require("node-fetch");
const AbstractTests = require("./AbstractTests");
const Events = require('../../models/Event') //require your model
const CAs = require('../../models/ConsultancyAgency')
const App = require('../../models/Application')

const Projects = require("../../models/Project")

const ObjectId = require("mongoose");

class CATest extends AbstractTests {
  constructor(PORT, ROUTE) {
    super(PORT, ROUTE);
    this.sharedState = {
      // enter model attributes an set them to null
    };
  }

  run() {
    super.run();
    try {
      return new Promise((resolve, reject) => {
        describe("Making sure CA routes work", () => {
          this.postRequest()
          this.getRequest()
          this.putRequest()
          this.deleteRequest()
          this.assignCandidate();
          this.caRequestRating();
          this.assignCandidateFail();
          this.caRequestRatingFail();
          this.applyingMembers();
          this.applyingMembersFail()
          // add all methods
        });
        resolve();
      });
    } catch (err) {}
  }

  postRequest() {}

  getRequest() {}
  putRequest() {}
  deleteRequest() {}

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
module.exports = CATest;

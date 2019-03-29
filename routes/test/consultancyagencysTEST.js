const fetch = require("node-fetch");
const AbstractTests = require("./AbstractTests");
const Events = require('../../models/Event') //require your model
const CAs = require('../../models/ConsultancyAgency')
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
          // this.caRequestRating();
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
    }/5c9cd9165cf32c4e4c74ba85/myProjects/5c9541519e2e790b2bcbbf8e/applyingMembers/5c93d9b2f3fe6358b41ccd7b/assign`, async () => {
      var projs = await Projects.find()
      projs = projs.filter(p => p.applyingCA.length != null && p.consultancyID!=null && p && p.applyingCA.length > 0)
      const project = projs[0]



      const response = await fetch(
        `${
          this.base_url
        }/${project.consultancyID}/myProjects/${project.id}/applyingMembers/${project.applyingCA[0]}/assign`,
        {
          method: "put",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      console.log("response stastus: " + response.status);
      const jsonResponse = await response.json();
      console.log(jsonResponse)

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
      console.log("response stastus: " + response.status);
      const jsonResponse = await response.json();
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(["msg"]);
      expect(response.status).toEqual(200);
    });
  }
}
module.exports = CATest;

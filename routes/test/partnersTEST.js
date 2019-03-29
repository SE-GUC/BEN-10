const fetch = require("node-fetch");
const AbstractTests = require("./AbstractTests");
const Partners = require("../../models/PartnerInfo"); //require your model
const Projects = require("../../models/Project")
const ObjectId = require("mongoose");

class PaTest extends AbstractTests {
  constructor(PORT, ROUTE) {
    super(PORT, ROUTE);
    this.sharedState = {
      projects : "projects"
      // enter model attributes an set them to null
    };
  }

  run() {
    super.run();
    try {
      return new Promise((resolve, reject) => {
        describe("Making sure Partner routes work", () => {
          this.postRequest();
          this.getRequest();
          this.putRequest();
          this.deleteRequest();
          this.acceptFinalReview();
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

  acceptFinalReview() {
    const requestBody = {
      // enter model attributes
    };

    test(`acceptFinalReview ${
      this.base_url
    }/:id/myprojects/:pid/finalreview/approve`, async () => {

      const prs = await Projects.find()
      const pr = prs[0]
      await fetch(
        `${this.projects_url}/${pr.id}/`,
        {
          method: "put",
          body: JSON.stringify({life_cycle : "Final Review"}),
          headers: { "Content-Type": "application/json" }
        }
      );


      const response = await fetch(
        `${
          this.base_url
        }/${pr.companyID}/myprojects/${pr.id}/finalreview/approve`,
        {
          method: "put",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      console.log("response stastus: " + response.status);
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["msg"]);
      expect(response.status).toEqual(200);

      
    });
  }
}
module.exports = PaTest;

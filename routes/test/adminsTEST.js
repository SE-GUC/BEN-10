const fetch = require("node-fetch");
const AbstractTests = require("./AbstractTests");
const Admin = require("../../models/Admin"); //require your model
const Project = require("../../models/Project");
const ObjectId = require("mongoose");

class AdminTest extends AbstractTests {
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
        describe("Making sure Admin routes work", () => {
          // this.postRequest()
          // this.getRequest()
          // this.putRequest()
          // this.deleteRequest()
          this.postAProject();
          this.sendFinalDraft();
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
      console.log("response stastus: " + response.status);
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
      console.log("response stastus: " + response.status);
      const jsonResponse = await response.json();
      console.log(jsonResponse);

      expect(Object.keys(jsonResponse)).toEqual(["msg"]);
      expect(response.status).toEqual(200);
    });
  }
}
module.exports = AdminTest;

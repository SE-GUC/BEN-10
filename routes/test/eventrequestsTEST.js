const fetch = require("node-fetch");
const AbstractTests = require("./AbstractTests");
const eventRequest = require("../../models/EventRequest");
const ObjectId = require("mongoose");

//= =---------------------------------------------------= =//
//= =--- UsersTest class
//= =---------------------------------------------------= =//
class ERTest extends AbstractTests {
  constructor(PORT, ROUTE) {
    super(PORT, ROUTE);
    this.sharedState = {
      id: null,
      requestedBy: null,
      description: null,
      eventType: null,
      eventLocation: null,
      eventDate: null,
      isAccepted: null,
      requestorId: null
    };
  }

  runIndependently() {
    super.runIndependently();
    try {
      return new Promise((resolve, reject) => {
        describe("Making sure ER routes work", () => {
          this.postRequest();
          this.getRequest();
          this.getIdRequest();
          this.putRequest();
          this.deleteRequest();
          this.postRequestFail();
          this.getRequestFail();
          this.getIdRequestFail();
          this.putRequestFail();
          this.deleteRequestFail();
        });
        resolve();
      });
    } catch (err) {}
  }

  postRequest() {
    const requestBody = {
      requestedBy: "testreq",
      description: "testdesc",
      eventType: "testtype",
      eventLocation: "testloc",
      eventDate: "1/1/2020",
      isAccepted: false,
      requestorId: "5c784be40bc82a5f186ac770"
    };

    test(`post ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["msg", "data"]);
      expect(response.status).toEqual(200);

      const eRequest = await eventRequest.findOne(requestBody).exec();
      expect(eRequest.description).toEqual(requestBody.description);
      //   expect(eRequest.eventDate).toBeCloseTo(eventDate)
      expect(eRequest.eventLocation).toEqual(requestBody.eventLocation);
      expect(eRequest.eventType).toEqual(requestBody.eventType);
      expect(eRequest.isAccepted).toEqual(requestBody.isAccepted);
      expect(eRequest.requestedBy).toEqual(requestBody.requestedBy);
      expect(new String(eRequest.requestorId)).toEqual(requestBody.requestorId);
      this.sharedState.id = eRequest.id;
      this.sharedState.requestedBy = eRequest.requestedBy;
      this.sharedState.description = eRequest.description;
      this.sharedState.eventType = eRequest.eventType;
      this.sharedState.eventLocation = eRequest.eventLocation;
      this.sharedState.eventDate = eRequest.eventDate;
      this.sharedState.description = eRequest.description;
      this.sharedState.isAccepted = eRequest.isAccepted;
      this.sharedState.requestorId = eRequest.requestorId;
    });
  }

  getRequest() {
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: "get",
        headers: { "Content-Type": "application/json" }
      });
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["data"]);
      expect(response.status).toEqual(200);
    });
  }
  putRequest() {
    const requestBody = {
      description: "testdescupdated"
    };

    test(`put ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/${this.sharedState.id}`, {
        method: "put",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["msg"]);
      expect(response.status).toEqual(200);

      const eRequest = await eventRequest.findOne(requestBody).exec();
      expect(eRequest.description).toEqual(requestBody.description);

      this.sharedState.description = eRequest.description;
    });
  }

  deleteRequest() {
    test(`delete ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/${this.sharedState.id}`, {
        method: "delete",
        headers: { "Content-Type": "application/json" }
      });
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["msg", "data"]);
      expect(response.status).toEqual(200);
    });
  }

  getIdRequest() {
    test(`getId ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/${this.sharedState.id}`, {
        method: "get",
        headers: { "Content-Type": "application/json" }
      });
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["data"]);
      expect(response.status).toEqual(200);
    });
  }

  postRequestFail() {
    const requestBody = {
      requestedBy: "testreq",
      description: "testdesc",
      eventType: "testtype",
      eventLocation: "testloc",
      eventDate: "fail",
      isAccepted: false,
      requestorId: "5c784be40bc82a5f186ac770"
    };

    test(`postFail ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["error"]);
      expect(response.status).toEqual(400);
    });
  }

  getRequestFail() {
    test(`getFail ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c93d983f3fe6358b41ccd7`, {
        method: "get",
        headers: { "Content-Type": "application/json" }
      });
      const jsonResponse = await response.json();

      expect(response.status).toEqual(404);
    });
  }
  putRequestFail() {
    const requestBody = {
      eventDate: "testdescupdated"
    };

    test(`putFail ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/${this.sharedState.id}`, {
        method: "put",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["error"]);
      expect(response.status).toEqual(400);
    });
  }

  deleteRequestFail() {
    test(`deleteFail ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c79283c92334b03f4b6244`, {
        method: "delete",
        headers: { "Content-Type": "application/json" }
      });
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["error"]);
      expect(response.status).toEqual(404);
    });
  }

  getIdRequestFail() {
    test(`getIdFail ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c79283c92334b03f4b6244`, {
        method: "get",
        headers: { "Content-Type": "application/json" }
      });
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["error"]);
      expect(response.status).toEqual(404);
    });
  }
}
module.exports = ERTest;

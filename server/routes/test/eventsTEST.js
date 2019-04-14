const fetch = require("node-fetch");
const AbstractTests = require("./AbstractTests");
const ObjectId = require("mongoose");
const Event = require("../../models/Event");

class ETest extends AbstractTests {
  constructor(PORT, ROUTE) {
    super(PORT, ROUTE);
    this.sharedState = {
      requestorId: null,
      requestedBy: null,
      eventType: null,
      eventLocation: null,
      description: null,
      registPrice: null,
      remainingPlace: null,
      topics: null,
      speaker: null,
      feedback: null,
      regist_start_date: null,
      regist_expiry_date: null,
      request_id: null,
      eventDate: null,
      bookedMembers: null,
      formLink: null
    };
  }

  run() {
    super.run();
    try {
      return new Promise((resolve, reject) => {
        describe("Making sure Eevent routes work", () => {
          this.postRequest();
          this.getRequestById();
          this.getRequest();
          this.putRequest();
          this.deleteRequest();
          // add all methods
        });
        resolve();
      });
    } catch (err) {}
  }

  postRequest() {
    const requestBody = {
      requestedBy: "nada",
      description: "event to enforce young developpers to think creatively",
      eventType: "software",
      eventLocation: "zamalek",
      eventDate: "2019-12-27",
      registPrice: 200,
      remainingPlace: 1000,
      topics: [
        "introductory",
        "software presentations and fields of work",
        "workshop"
      ],
      speaker: "bill gates",
      regist_start_date: "2019-09-27",
      regist_expiry_date: "2019-11-27",
      requestorId: "5c9cd0f23c242d1d38b8731c"
    };

    test(`post ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });
      // //console.lo("response stastus: "+ response.status)
      const jsonResponse = await response.json();
      if (Object.keys(jsonResponse).toString() !== "error") {
        expect(Object.keys(jsonResponse)).toEqual(["msg", "data"]);
        expect(response.status).toEqual(200);

        const event = await Event.findOne(requestBody).exec();
        expect(requestBody.requestedBy).toEqual(event.requestedBy);
        expect(requestBody.description).toEqual(event.description);
        expect(requestBody.eventType).toEqual(event.eventType);
        expect(requestBody.eventLocation).toEqual(event.eventLocation);
        expect(new Date(requestBody.eventDate)).toEqual(
          new Date(event.eventDate)
        );
        expect(requestBody.registPrice).toEqual(event.registPrice);
        expect(requestBody.remainingPlace).toEqual(event.remainingPlace);
        expect(requestBody.topics.toString()).toEqual(event.topics.toString());
        expect(requestBody.speaker).toEqual(event.speaker);
        expect(new Date(requestBody.regist_start_date)).toEqual(
          new Date(event.regist_start_date)
        );
        expect(new Date(requestBody.regist_expiry_date)).toEqual(
          new Date(event.regist_expiry_date)
        );
        expect(requestBody.requestorId.toString()).toEqual(
          event.requestorId.toString()
        );

        this.sharedState.requestedBy = event.requestedBy;
        this.sharedState.description = event.description;
        this.sharedState.eventType = event.eventType;
        this.sharedState.eventLocation = event.eventLocation;
        this.sharedState.eventDate = event.eventDate;
        this.sharedState.registPrice = event.registPrice;
        this.sharedState.remainingPlace = event.remainingPlace;
        this.sharedState.topics = event.topics;
        this.sharedState.speaker = event.speaker;
        this.sharedState.regist_start_date = event.regist_start_date;
        this.sharedState.regist_expiry_date = event.regist_expiry_date;
        this.sharedState.requestorId = event.requestorId;
        this.sharedState._id = event._id;
      } else {
        expect(Object.keys(jsonResponse).toString()).toEqual(
          ["error"].toString()
        );
        expect(response.status).toBe(404);
      }
    });
  }
  // get the posted event recently by its id
  getRequestById() {
    test("fetching a specific event", async () => {
      let response = null;
      if (this.sharedState._id != null) {
        response = await fetch(`${this.base_url}/${this.sharedState._id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
      }

      const jsonResponse = await response.json();

      if (
        Object.keys(jsonResponse).toString() !== "error" ||
        jsonResponse != null
      ) {
        // check if the json response has data not error
        expect(Object.keys(jsonResponse).toString()).toEqual(
          ["data"].toString()
        );
        expect(Object.keys(jsonResponse)).not.toEqual([" error"]);

        expect(jsonResponse.data.requestedBy).toEqual(
          this.sharedState.requestedBy
        );
        expect(jsonResponse.data.description).toEqual(
          this.sharedState.description
        );
        expect(jsonResponse.data.eventType).toEqual(this.sharedState.eventType);
        expect(jsonResponse.data.eventLocation).toEqual(
          this.sharedState.eventLocation
        );
        expect(new Date(jsonResponse.data.eventDate)).toEqual(
          this.sharedState.eventDate
        );
        expect(jsonResponse.data.registPrice).toEqual(
          this.sharedState.registPrice
        );
        expect(jsonResponse.data.remainingPlace).toEqual(
          this.sharedState.remainingPlace
        );
        expect(jsonResponse.data.topics.toString()).toEqual(
          this.sharedState.topics.toString()
        );
        expect(jsonResponse.data.speaker).toEqual(this.sharedState.speaker);
        expect(new Date(jsonResponse.data.regist_start_date)).toEqual(
          this.sharedState.regist_start_date
        );
        expect(new Date(jsonResponse.data.regist_expiry_date)).toEqual(
          this.sharedState.regist_expiry_date
        );
        expect(jsonResponse.data.requestorId.toString()).toEqual(
          this.sharedState.requestorId.toString()
        );
      } else {
        expect(Object.keys(jsonResponse).toString()).toEqual(
          ["error"].toString()
        );
        expect(response.status).toBe(404);
      }
    });
  }
  getRequest() {
    test("fetching all event", async () => {
      const response = await fetch(`${this.base_url}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      const jsonResponse = await response.json();

      // check if the json response has data not error
      expect(Object.keys(jsonResponse).toString()).toEqual(["data"].toString());
      expect(Object.keys(jsonResponse)).not.toEqual([" error"]);
    });
  }

  putRequest() {
    const requestBody = {
      description:
        "the previous project was aimed for software developpers only here this event welcomes everybody",
      eventLocation: "maadi"
    };
    test("updating a specific event", async () => {
      let response = null;
      if (this.sharedState._id != null) {
        response = await fetch(`${this.base_url}/${this.sharedState._id}`, {
          method: "PUT",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        });
      }
      const jsonResponse = await response.json();
      if (
        Object.keys(jsonResponse).toString() !== "error" ||
        jsonResponse != null
      ) {
        expect(Object.keys(jsonResponse).toString()).toEqual(
          ["msg"].toString()
        );
        expect(Object.keys(jsonResponse)).not.toEqual(["error"]);
      } else {
        expect(Object.keys(jsonResponse).toString()).toEqual(
          ["error"].toString()
        );
        expect(response.status).toBe(404);
      }
    });
  }
  deleteRequest() {
    test(`deleting the recent event created`, async () => {
      let response = null;
      if (this.sharedState._id != null) {
        response = await fetch(`${this.base_url}/${this.sharedState._id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        });
      }

      const jsonResponse = await response.json();
      if (
        Object.keys(jsonResponse).toString() !== "error" ||
        jsonResponse != null
      ) {
        // check if the json response has data not error
        expect(Object.keys(jsonResponse).toString()).toEqual(
          ["msg", "data"].toString()
        );
        expect(Object.keys(jsonResponse).toString()).not.toEqual(
          ["error"].toString()
        );

        const checkEvent = await Event.findOne({
          _id: this.sharedState.id
        }).exec();
        expect(checkEvent).toEqual(null);
      } else {
        expect(Object.keys(jsonResponse).toString()).toEqual(
          ["error"].toString()
        );
        expect(response.status).toBe(404);
      }
    });
  }
}
module.exports = ETest;

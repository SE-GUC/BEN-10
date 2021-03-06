const fetch = require("node-fetch");
const AbstractTests = require("./AbstractTests");
const Notification = require("../../models/Notification"); //require your model
const Member = require("../../models/member");
const ObjectId = require("mongoose");

class NTest extends AbstractTests {
  constructor(PORT, ROUTE) {
    super(PORT, ROUTE);
    this.sharedState = {
      // enter model attributes an set them to null
      description: null,
      notifiedPerson: null,
      date: null,
      seen: null
    };
  }

  run() {
    super.run();
    try {
      return new Promise((resolve, reject) => {
        describe("Making sure notifications routes work", () => {
          this.postRequest();
          this.getRequest();
          this.putRequest();
          this.deleteRequest();
          this.getRequestById();
        });
        resolve();
      });
    } catch (err) {}
  }

  postRequest() {
    test(`post ${this.base_url}`, async () => {
      let members = await Member.find();
      const requestBody = {
        description: "test1NotificationDescription",
        notifiedPerson: members[0]._id,
        date: "2019-11-15",
        seen: "false"
      };
      const response = await fetch(`${this.base_url}`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["msg", "data"]);
      expect(response.status).toEqual(200);
      const myNotification = await Notification.findOne(requestBody);
      expect(myNotification.description.toString()).toEqual(
        requestBody.description.toString()
      );
      expect(myNotification.notifiedPerson.toString()).toEqual(
        requestBody.notifiedPerson.toString()
      );
      expect(myNotification.date).toEqual(new Date(requestBody.date));
      expect(myNotification.seen.toString()).toEqual(
        requestBody.seen.toString()
      );
    });
  }

  getRequest() {
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      //console.lo("response status: " + response.status);
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse).toString()).toEqual(["data"].toString());
      expect(response.status).toEqual(200);
    });
  }
  getRequestById() {
    test(`get ${this.base_url}/by an id`, async () => {
      const ns = await Notification.find();
      const n = ns[0];
      const response = await fetch(`${this.base_url}/${n._id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      //console.lo("response status: " + response.status);
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse).toString()).toEqual(["data"].toString());
      expect(response.status).toEqual(200);
      expect(jsonResponse.data.description.toString()).toEqual(
        n.description.toString()
      );
      expect(jsonResponse.data.notifiedPerson.toString()).toEqual(
        n.notifiedPerson.toString()
      );
      expect(new Date(jsonResponse.data.date)).toEqual(new Date(n.date));
      expect(jsonResponse.data.seen.toString()).toEqual(n.seen.toString());
    });
  }

  putRequest() {
    test(`put ${this.base_url}`, async () => {
      const notification = await Notification.find();
      const n1 = notification[0];
      let requestBody = {
        seen: !n1.seen
      };

      //console.lo(this.base_url + "/" + n1._id);
      const response = await fetch(`${this.base_url}/${n1._id}`, {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse).toString()).toEqual(["msg"].toString());
      expect(response.status).toEqual(200);
      const myUpdatedNotification = await Notification.findById(n1._id);
      expect(myUpdatedNotification.seen.toString()).toEqual(
        requestBody.seen.toString()
      );

      //returning the original state of the notification
      requestBody = {
        seen: n1.seen
      };
      await fetch(`${this.base_url}/${n1._id}`, {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });
    });
  }

  deleteRequest() {
    test(`delete ${this.base_url}`, async () => {
      const notification = await Notification.find();
      const n1 = notification[0];
      //console.lo(this.base_url + "/" + n1._id);
      var response = await fetch(`${this.base_url}/${n1._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse).toString()).toEqual(
        ["msg", "data"].toString()
      );
      expect(response.status).toEqual(200);
      const n2 = await Notification.findById(n1._id);
      expect(n2).toBe(null);

      //rePosting the deleted notification
      const newNotification = await Notification.create(jsonResponse.data);
    });
  }
}
module.exports = NTest;

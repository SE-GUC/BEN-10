const fetch = require("node-fetch");
const AbstractTests = require("./AbstractTests");

const event = require("../../models/Event");
const eventrequest = require("../../models/EventRequest");
const Admin = require("../../models/Admin");
const ObjectId = require("mongoose");
const Member = require("../../models/member");
const Event = require("../../models/Event");
const server = require("../../config/config");
const Notification = require("../../models/Notification");
const Project = require("../../models/Project");
const Application = require("../../models/Application");

class ATest extends AbstractTests {
  constructor(PORT, ROUTE) {
    super(PORT, ROUTE);
    this.sharedState = {
      // enter model attributes an set them to null
      name: null,
      gender: null,
      nationality: null,
      maritalStatus: null,
      drivingLicense: null,
      country: null,
      city: null,
      area: null,
      postalCode: null,
      mobileNumber: null,
      email: null,
      password: null,
      birthdate: null
    };
  }

  run() {
    super.run();
    try {
      return new Promise((resolve, reject) => {
        describe("Making sure Admins routes work", () => {
          this.postRequest();
          this.getRequest();
          this.putRequest();
          this.deleteRequest();
          this.getRequestByID();
          this.deleteRequestFailure();
          this.putRequestFailure();
          this.getRequestByIDFailure();
          this.postRequestFailure();
          this.getProjects();
          this.getProjectsFailure();
          this.postEvent();
          this.postEventFail();
          this.getAllEventRequests();
          this.getAllEventRequestsFail();
          this.postAProject();
          this.sendFinalDraft();
          this.sendFinalDraftFail();
          this.postAProjectFail();
          // add all methods
          this.getdescription();
          this.getdescriptionbywrongAdminID();
          this.getdescriptionbynotavalidatedAdminID();
          this.getdescriptionbywrongProjectID();
          this.getdescriptionbynotavalidatedProjectID();
          this.AdminNotifyAcceptedCandidate();
          this.AdminNotifyAcceptedCandidatemissingattribute();
          this.AdminNotifyAcceptedCandidatebywrongAdminID();
          this.AdminNotifyAcceptedCandidatebynotavalidatedAdminID();
          this.AdminNotifyAcceptedCandidatebywrongCandidateID();
          this.AdminNotifyAcceptedCandidatebynotavalidatedCandidateID();
          this.getAllCA();
          this.getAllCAFail();
          this.identifyProject();
          this.identifyProjectFailed();
          this.viewAllEvents();
          this.viewAllEventsFailed();
          this.viewMembers();
          this.viewMembersFail();
          this.AssignCandidateToproject();
          this.DecideEventRequest();
          this.ViewAllApplication();
          this.sendFeedBack();
          this.sendRejection();
        });
        resolve();
      });
    } catch (err) {}
  }

  postRequest() {
    const requestBody = {
      // enter model attributes
      name: "mohamed",
      gender: "false",
      nationality: "egyptian",
      maritalStatus: "single",
      drivingLicense: "qwertyuio",
      country: "egypt",
      city: "cairo",
      area: "tagamoa",
      postalCode: "12211",
      mobileNumber: "0123456789",
      email: "asdfghjkl",
      password: "qwertyuio",
      birthdate: "1998-12-09T22:00:00.000+00:00"
    };

    test(`post ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });
      //console.lo("response stastus: " + response.status);
      const jsonResponse = await response.json();
      //console.lo(jsonResponse);

      expect(Object.keys(jsonResponse).toString()).toEqual(
        ["msg", "data"].toString()
      );
      expect(response.status).toEqual(200);
      const eRequest = await Admin.findOne(requestBody).exec();

      expect(eRequest.name).toEqual(requestBody.name);
      expect(eRequest.gender).toEqual(requestBody.gender);
      expect(eRequest.nationality).toEqual(requestBody.nationality);
      expect(eRequest.maritalStatus).toEqual(requestBody.maritalStatus);
      expect(eRequest.drivingLicense).toEqual(requestBody.drivingLicense);
      expect(eRequest.country).toEqual(requestBody.country);
      expect(eRequest.city).toEqual(requestBody.city);
      expect(eRequest.area).toEqual(requestBody.area);
      expect(eRequest.postalCode).toEqual(requestBody.postalCode);
      expect(eRequest.mobileNumber).toEqual(requestBody.mobileNumber);
      expect(eRequest.email).toEqual(requestBody.email);
      expect(eRequest.password).toEqual(requestBody.password);
      //expect(new String(eRequest.birthdate)).toEqual(requestBody.birthdate)
      // expect(eRequest.birthdate).toEqual(requestBody.birthdate)

      this.sharedState.name = eRequest.name;
      this.sharedState.gender = eRequest.gender;
      this.sharedState.nationality = eRequest.nationality;
      this.sharedState.maritalStatus = eRequest.maritalStatus;
      this.sharedState.drivingLicense = eRequest.drivingLicense;
      this.sharedState.country = eRequest.country;
      this.sharedState.city = eRequest.city;
      this.sharedState.area = eRequest.area;
      this.sharedState.postalCode = eRequest.postalCode;
      this.sharedState.mobileNumber = eRequest.mobileNumber;
      this.sharedState.email = eRequest.email;
      this.sharedState.password = eRequest.password;
      this.sharedState.birthdate = eRequest.birthdate;
    });
  }
  postRequestFailure() {
    const requestBody = {
      // enter model attributes
      name: "mohamed",
      gender: "false",
      nationality: "egyptian",
      maritalStatus: "single",
      drivingLicense: "qwertyuio",
      country: "egypt",
      city: "cairo",
      area: "tagamoa",
      postalCode: "12211",
      mobileNumber: "0123456789",
      email: "asdfghjkl",
      password: "qwertyuio",
      birthdate: "ho"
    };

    test(`post ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });
      //console.lo("response stastus: " + response.status);
      const jsonResponse = await response.json();
      //console.lo(jsonResponse);

      expect(Object.keys(jsonResponse).toString()).toEqual(
        ["error"].toString()
      );
      expect(response.status).toEqual(400);
    });
  }

  getRequest() {
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      //console.lo("response stastus: " + response.status);
      const jsonResponse = await response.json();
      //console.lo(jsonResponse);

      expect(Object.keys(jsonResponse).toString()).toEqual(["data"].toString());
      expect(response.status).toEqual(200);
    });
  }
  getRequestByID() {
    test(`get ${this.base_url}`, async () => {
      const ad = await Admin.find();
      const ad1 = ad[0];
      const adid = ad1.id;
      const response = await fetch(`${this.base_url}/${adid}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      //console.lo("response stastus: " + response.status);
      const jsonResponse = await response.json();
      //console.lo(jsonResponse);

      expect(Object.keys(jsonResponse)).toEqual(["data"]);
      expect(response.status).toEqual(200);
    });
  }

  getRequestByIDFailure() {
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/1234567890`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      //console.lo("response stastus: " + response.status);
      const jsonResponse = await response.json();
      //console.lo(jsonResponse);

      expect(Object.keys(jsonResponse)).toEqual(["error"]);
      expect(response.status).toEqual(404);
    });
  }

  putRequest() {
    const requestBody = {
      // enter model attributes
      name: "mohamed",
      gender: "false",
      nationality: "egyptian",
      maritalStatus: "single",
      drivingLicense: "qwertyuio",
      country: "egypt",
      city: "cairo",
      area: "tagamoa",
      postalCode: "12211",
      mobileNumber: "012345678",
      email: "asdfghjkl",
      password: "qwertyuio",
      birthdate: "1998-12-09T22:00:00.000+00:00"
    };

    test(`put ${this.base_url}`, async () => {
      const ad = await Admin.find();
      const ad1 = ad[0];
      const adid = ad1.id;
      const response = await fetch(`${this.base_url}/${adid}`, {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });
      //console.lo("response stastus: " + response.status);
      const jsonResponse = await response.json();
      // //console.lo(jsonResponse)

      expect(Object.keys(jsonResponse).toString()).toEqual(["msg"].toString());
      expect(response.status).toEqual(200);
      const eRequest = await Admin.findOne(requestBody).exec();

      expect(eRequest.name).toEqual(requestBody.name);
      expect(eRequest.gender).toEqual(requestBody.gender);
      expect(eRequest.nationality).toEqual(requestBody.nationality);
      expect(eRequest.maritalStatus).toEqual(requestBody.maritalStatus);
      expect(eRequest.drivingLicense).toEqual(requestBody.drivingLicense);
      expect(eRequest.country).toEqual(requestBody.country);
      expect(eRequest.city).toEqual(requestBody.city);
      expect(eRequest.area).toEqual(requestBody.area);
      expect(eRequest.postalCode).toEqual(requestBody.postalCode);
      expect(eRequest.mobileNumber).toEqual(requestBody.mobileNumber);
      expect(eRequest.email).toEqual(requestBody.email);
      expect(eRequest.password).toEqual(requestBody.password);
      //expect(new String(eRequest.birthdate)).toEqual(requestBody.birthdate)
      // expect(eRequest.birthdate).toEqual(requestBody.birthdate)

      this.sharedState.name = eRequest.name;
      this.sharedState.gender = eRequest.gender;
      this.sharedState.nationality = eRequest.nationality;
      this.sharedState.maritalStatus = eRequest.maritalStatus;
      this.sharedState.drivingLicense = eRequest.drivingLicense;
      this.sharedState.country = eRequest.country;
      this.sharedState.city = eRequest.city;
      this.sharedState.area = eRequest.area;
      this.sharedState.postalCode = eRequest.postalCode;
      this.sharedState.mobileNumber = eRequest.mobileNumber;
      this.sharedState.email = eRequest.email;
      this.sharedState.password = eRequest.password;
      this.sharedState.birthdate = eRequest.birthdate;
    });
  }
  putRequestFailure() {
    const requestBody = {
      // enter model attributes
      name: "mohamed",
      gender: "false",
      nationality: "egyptian",
      maritalStatus: "single",
      drivingLicense: "qwertyuio",
      country: "egypt",
      city: "cairo",
      area: "tagamoa",
      postalCode: "12211",
      mobileNumber: "012345678",
      email: "asdfghjkl",
      password: "qwertyuio",
      birthdate: "ho"
    };

    test(`put ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/345678asda`, {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });
      //console.lo("response stastus: " + response.status);
      const jsonResponse = await response.json();
      // //console.lo(jsonResponse)

      expect(Object.keys(jsonResponse).toString()).toEqual(
        ["error"].toString()
      );
      expect(response.status).toEqual(404);
    });
  }

  deleteRequest() {
    test(`delete ${this.base_url}`, async () => {
      const ad = await Admin.find();
      const ad1 = ad[0];
      const adid = ad1.id;
      const response = await fetch(`${this.base_url}/${adid}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      //console.lo("response stastus: " + response.status);
      const jsonResponse = await response.json();
      //console.lo(jsonResponse);

      expect(Object.keys(jsonResponse)).toEqual(["msg", "data"]);
      expect(response.status).toEqual(200);
    });
  }

  deleteRequestFailure() {
    test(`delete ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c784be40bc82a5f186ac77`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      //console.lo("response stastus: " + response.status);
      const jsonResponse = await response.json();
      //console.lo(jsonResponse);

      expect(Object.keys(jsonResponse)).toEqual(["error"]);
      expect(response.status).toEqual(404);
    });
  }

  getProjects() {
    test(`get ${this.base_url}`, async () => {
      const ad = await Admin.find();
      const ad1 = ad[0];
      const adid = ad1.id;
      const response = await fetch(`${this.base_url}/${adid}/projects`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      //console.lo("response stastus: " + response.status);
      const jsonResponse = await response.json();
      //console.lo(jsonResponse);

      expect(Object.keys(jsonResponse).toString()).toEqual(["data"].toString());
      expect(response.status).toEqual(200);
    });
  }
  getProjectsFailure() {
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/12345678/projects`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      //console.lo("response stastus: " + response.status);
      const jsonResponse = await response.json();
      //console.lo(jsonResponse);

      expect(Object.keys(jsonResponse).toString()).toEqual(
        ["error"].toString()
      );
      expect(response.status).toEqual(404);
    });
  }

  getdescription() {
    test(`get ${this.base_url}/${
      this.sharedState.id
    }/pdescription/:id/`, async () => {
      const ad = await Admin.find();
      const ad1 = ad[0];
      const adid = ad1.id;
      const pr = await Project.find();
      const pr1 = pr[0];
      const prid = pr1.id;
      const response = await fetch(
        `${this.base_url}/${adid}/pdescription/${prid}/`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();
      expect(response.status).toEqual(200);
    });
  }

  //3 --As an admin I want to further check the description of a task/project so that it will be posted for candidates to apply
  getdescriptionbywrongAdminID() {
    test(`get ${this.base_url}/${
      this.sharedState.id
    }/pdescription/:id/`, async () => {
      const response = await fetch(
        `${
          this.base_url
        }/5c734be40bc82a5f186ac770/pdescription/5c94436fd0c61339203ad8c7/`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["error"]);
      expect(response.status).toEqual(404);
    });
  }

  //3 --As an admin I want to further check the description of a task/project so that it will be posted for candidates to apply
  getdescriptionbynotavalidatedAdminID() {
    test(`get ${this.base_url}/${
      this.sharedState.id
    }/pdescription/:id/`, async () => {
      const response = await fetch(
        `${
          this.base_url
        }/5c78be40bc82a5f186ac770/pdescription/5c94436fd0c61339203ad8c7/`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["error"]);
      expect(response.status).toEqual(404);
    });
  }

  //3 --As an admin I want to further check the description of a task/project so that it will be posted for candidates to apply
  getdescriptionbywrongProjectID() {
    test(`get ${this.base_url}/${
      this.sharedState.id
    }/pdescription/:id/`, async () => {
      const response = await fetch(
        `${
          this.base_url
        }/5c784be40bc82a5f186ac770/pdescription/5c94436fd0c61339203adc7/`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();
      expect(response.status).toEqual(404);
    });
  }

  //3 --As an admin I want to further check the description of a task/project so that it will be posted for candidates to apply
  getdescriptionbynotavalidatedProjectID() {
    test(`get ${this.base_url}/${
      this.sharedState.id
    }/pdescription/:id/`, async () => {
      const response = await fetch(
        `${
          this.base_url
        }/5c784be40bc82a5f186ac770/pdescription/5c98436fd0c61339203ad8c7/`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();
      expect(response.status).toEqual(404);
    });
  }

  //3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project
  AdminNotifyAcceptedCandidate() {
    const requestBody = {
      description: "no description"
    };
    test(`post ${this.base_url}/${
      this.sharedState.id
    }/notifications/:id/`, async () => {
      const ad = await Admin.find();
      const ad1 = ad[0];
      const adid = ad1.id;
      const m = await Member.find();
      const m1 = m[0];
      const mid = m1.id;
      const response = await fetch(
        `${this.base_url}/${adid}/notifications/${mid}`,
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

  //3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project
  AdminNotifyAcceptedCandidatemissingattribute() {
    test(`post ${this.base_url}/${
      this.sharedState.id
    }/notifications/:id/`, async () => {
      const requestBody = {};
      const ad = await Admin.find();
      const ad1 = ad[0];
      const adid = ad1.id;
      const m = await Member.find();
      const m1 = m[0];
      const mid = m1.id;
      const response = await fetch(
        `${this.base_url}/${adid}/notifications/${mid}`,
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["error"]);
      expect(response.status).toEqual(400);
    });
  }

  //3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project
  AdminNotifyAcceptedCandidatebywrongAdminID() {
    const requestBody = {
      description: "no description"
    };

    test(`post ${this.base_url}/${
      this.sharedState.id
    }/notifications/:id/`, async () => {
      const response = await fetch(
        `${
          this.base_url
        }/5c7a603a0a4938cc1e08e76/notifications/5c93d983f3fe6358b41ccd7a`,
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

  //3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project
  AdminNotifyAcceptedCandidatebynotavalidatedAdminID() {
    const requestBody = {
      description: "no description"
    };

    test(`post ${this.base_url}/${
      this.sharedState.id
    }/notifications/:id/`, async () => {
      const response = await fetch(
        `${
          this.base_url
        }/5c7a603a0a4938ccd1e88e76/notifications/5c93d983f3fe6358b41ccd7a`,
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

  //3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project
  AdminNotifyAcceptedCandidatebywrongCandidateID() {
    const requestBody = {
      description: "no description"
    };

    test(`post ${this.base_url}/${
      this.sharedState.id
    }/notifications/:id/`, async () => {
      const response = await fetch(
        `${
          this.base_url
        }/5c7a603a0a4938ccd1e08e76/notifications/5c93d983f3fe6358b4ccd7a`,
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

  //3.5 --As an admin I want to notify accepted candidates that he was accepted for a task/project
  AdminNotifyAcceptedCandidatebynotavalidatedCandidateID() {
    const requestBody = {
      description: "no description"
    };

    test(`post ${this.base_url}/${
      this.sharedState.id
    }/notifications/:id/`, async () => {
      const response = await fetch(
        `${
          this.base_url
        }/5c7a603a0a4938ccd1e08e76/notifications/5c93d983f3fe6458b41ccd7a`,
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

  getAllCA() {
    test(`get ${this.base_url}`, async () => {
      const ad = await Admin.find();
      const ad1 = ad[0];
      const adid = ad1.id;
      const response = await fetch(`${this.base_url}/${adid}/ShowAllCA`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      ////console.lo("response stastus: "+ response.status)
      const jsonResponse = await response.json();
      ////console.lo(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(["data"]);
      expect(response.status).toEqual(200);
    });
  }

  //as an admin i want to create event
  postEvent() {
    const requestBody = {
      requestedBy: "no requested by",
      description: "no description",
      eventType: "no type",
      eventLocation: "no event location",
      eventDate: "5/1/2019",
      registPrice: "100",
      remainingPlace: "50",
      topics: "[]",
      speaker: "no speaker",
      regist_start_date: "1/1/2019",
      regist_expiry_date: "2/1/2019",
      requestorId: "5c79260b4328ab820437835c"
    };

    test(`post ${this.base_url}/`, async () => {
      const ad = await Admin.find();
      const ad1 = ad[0];
      const adid = ad1.id;
      const response = await fetch(`${this.base_url}/${adid}/addEvent/`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });
      //console.lo("response stastus: " + response.status);
      const jsonResponse = await response.json();
      // //console.lo(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(["msg"]);
      expect(response.status).toEqual(200);
      //   const eRequest = await event.findOne(requestBody).exec()
      //   expect(eRequest.requestedBy).toEqual(requestBody.requestedBy)
      // //   expect(eRequest.eventDate).toBeCloseTo(eventDate)
      //   expect(eRequest.description).toEqual(requestBody.description)
      //   expect(eRequest.eventType).toEqual(requestBody.eventType)
      //   expect(eRequest.eventLocation).toEqual(requestBody.eventLocation)
      //   expect(eRequest.eventDate).toEqual(requestBody.eventDate)
      //   expect(eRequest.registPrice).toEqual(requestBody.registPrice)
      //   expect(eRequest.remainingPlace).toEqual(requestBody.remainingPlace)
      //   expect(eRequest.topics).toEqual(requestBody.topics)
      //   expect(eRequest.speaker).toEqual(requestBody.speaker)
      //   expect(eRequest.regist_start_date).toEqual(requestBody.regist_start_date)
      //   expect(eRequest.regist_expiry_date).toEqual(requestBody.regist_expiry_date)
      //   expect(eRequest.requestorId).toEqual(requestBody.requestorId)
      //   //expect(eRequest.sentAt).toEqual(requestBody.sentAt)
      //  // expect(eRequest.senttoID).toEqual(requestBody.senttoID)
      // //  expect(eRequest.sentByID).toEqual(requestBody.sentByID)
      //  // expect(new String(eRequest.senttoID)).toEqual(requestBody.senttoID)
      //   //expect(new String(eRequest.sentByID)).toEqual(requestBody.sentByID)
      //   this.sharedState.requestedBy =  eRequest.requestedBy
      //   this.sharedState.description =  eRequest.description
      //   this.sharedState.eventType =  eRequest.eventType
      //   this.sharedState.eventLocation =  eRequest.eventLocation
      //   this.sharedState.eventDate =  eRequest.eventDate
      //   this.sharedState.registPrice =  eRequest.registPrice
      //   this.sharedState.remainingPlace =  eRequest.remainingPlace
      //   this.sharedState.topics =  eRequest.topics
      //   this.sharedState.speaker =  eRequest.speaker
      //   this.sharedState.regist_start_date =  eRequest.regist_start_date
      //   this.sharedState.regist_expiry_date =  eRequest.regist_expiry_date
      //   this.sharedState.requestorId =  eRequest.requestorId
    });
  }

  postEventFail() {
    const requestBody = {
      requestedBy: "no requested by",
      description: "no description",
      eventType: "no type",
      eventLocation: "no event location",
      eventDate: "5/1/2019",
      registPrice: "100",
      remainingPlace: "50",
      topics: "[]",
      speaker: "no speaker",
      regist_start_date: "1/1/2019",
      regist_expiry_date: "2/1/2019",
      requestorId: "5c79260b4328ab820437835c"
    };

    test(`post ${this.base_url}/`, async () => {
      const response = await fetch(
        `${this.base_url}/5c784be40bc82a5f186ac7/addEvent/`,
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      //console.lo("response stastus: " + response.status);
      const jsonResponse = await response.json();
      // //console.lo(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(["error"]);
      expect(response.status).toEqual(404);
      //   const eRequest = await event.findOne(requestBody).exec()
      //   expect(eRequest.requestedBy).toEqual(requestBody.requestedBy)
      // //   expect(eRequest.eventDate).toBeCloseTo(eventDate)
      //   expect(eRequest.description).toEqual(requestBody.description)
      //   expect(eRequest.eventType).toEqual(requestBody.eventType)
      //   expect(eRequest.eventLocation).toEqual(requestBody.eventLocation)
      //   expect(eRequest.eventDate).toEqual(requestBody.eventDate)
      //   expect(eRequest.registPrice).toEqual(requestBody.registPrice)
      //   expect(eRequest.remainingPlace).toEqual(requestBody.remainingPlace)
      //   expect(eRequest.topics).toEqual(requestBody.topics)
      //   expect(eRequest.speaker).toEqual(requestBody.speaker)
      //   expect(eRequest.regist_start_date).toEqual(requestBody.regist_start_date)
      //   expect(eRequest.regist_expiry_date).toEqual(requestBody.regist_expiry_date)
      //   expect(eRequest.requestorId).toEqual(requestBody.requestorId)
      //   //expect(eRequest.sentAt).toEqual(requestBody.sentAt)
      //  // expect(eRequest.senttoID).toEqual(requestBody.senttoID)
      // //  expect(eRequest.sentByID).toEqual(requestBody.sentByID)
      //  // expect(new String(eRequest.senttoID)).toEqual(requestBody.senttoID)
      //   //expect(new String(eRequest.sentByID)).toEqual(requestBody.sentByID)
      //   this.sharedState.requestedBy =  eRequest.requestedBy
      //   this.sharedState.description =  eRequest.description
      //   this.sharedState.eventType =  eRequest.eventType
      //   this.sharedState.eventLocation =  eRequest.eventLocation
      //   this.sharedState.eventDate =  eRequest.eventDate
      //   this.sharedState.registPrice =  eRequest.registPrice
      //   this.sharedState.remainingPlace =  eRequest.remainingPlace
      //   this.sharedState.topics =  eRequest.topics
      //   this.sharedState.speaker =  eRequest.speaker
      //   this.sharedState.regist_start_date =  eRequest.regist_start_date
      //   this.sharedState.regist_expiry_date =  eRequest.regist_expiry_date
      //   this.sharedState.requestorId =  eRequest.requestorId
    });
  }
  //as an admin i want to view all eventrequests
  getAllEventRequests() {
    test(`get ${this.base_url}`, async () => {
      const ad = await Admin.find();
      const ad1 = ad[0];
      const adid = ad1.id;
      const response = await fetch(`${this.base_url}/${adid}/eventRequests`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      //console.lo("response stastus: " + response.status);
      const jsonResponse = await response.json();
      //console.lo(jsonResponse);

      expect(Object.keys(jsonResponse).toString()).toEqual(["data"].toString());
      expect(response.status).toEqual(200);
    });
  }
  getAllEventRequestsFail() {
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(
        `${this.base_url}/5c784be40bc82a5f186ac7/eventRequests`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );
      //console.lo("response stastus: " + response.status);
      const jsonResponse = await response.json();
      //console.lo(jsonResponse);

      expect(Object.keys(jsonResponse).toString()).toEqual(
        ["error"].toString()
      );
      expect(response.status).toEqual(404);
    });
  }

  getAllCAFail() {
    //enter invalid admin id
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(
        `${this.base_url}/5c7a6797938ccd1e08e7c/ShowAllCA`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );
      ////console.lo("response stastus: "+ response.status)
      const jsonResponse = await response.json();
      ////console.lo(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(["error"]);
      expect(response.status).toEqual(404);
    });
  }

  // 3.1- As and admin i want to identify a task/project with a set of attributes so that it defines it
  identifyProject() {
    const identifiedBody = {
      // enter model attributes
      company: "GUCCO",
      category: "Education"
    };

    test(`put ${this.base_url}`, async () => {
      const admins = await Admin.find();
      const admin = admins[0];
      const projects = await Project.find();
      const proj = projects[0];
      const response = await fetch(
        `${this.base_url}/${admin.id}/assignAttributes/${proj.id}`,
        {
          method: "PUT",
          body: JSON.stringify(identifiedBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      //console.lo("response stastus: " + response.status);
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["msg"]);
      expect(response.status).toEqual(200);

      this.sharedState.company = identifiedBody.company;
      this.sharedState.category = identifiedBody.category;
    });
  }

  identifyProjectFailed() {
    const identifiedBody = {
      // enter model attributes
      company: "GUCCO",
      category: "Education"
    };

    test(`put ${this.base_url}`, async () => {
      // const admins = await Admin.find()
      // const admin = admins[0]
      // const projects = await Project.find()
      // const proj = projects[0]
      const response = await fetch(
        `${
          this.base_url
        }/5c79260b4328ab820437835/assignAttributes/5c94436fd0c61339203ad8c`,
        {
          method: "PUT",
          body: JSON.stringify(identifiedBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      //console.lo("response stastus: " + response.status);
      const jsonResponse = await response.json();
      //console.lo(jsonResponse);

      expect(Object.keys(jsonResponse)).toEqual(["error"]);
      expect(response.status).toEqual(404);

      //this.sharedState.company =  identifiedBody.company
      //this.sharedState.category =  identifiedBody.category
    });
  }

  viewAllEvents() {
    test(`get ${this.base_url}`, async () => {
      const admins = await Admin.find();
      const admin = admins[0];
      const response = await fetch(
        `${this.base_url}/${admin.id}/ShowAllEvents`,
        {
          method: "GET",
          //body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      //console.lo("response stastus: " + response.status);
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["data"]);
      expect(response.status).toEqual(200);
    });
  }

  viewAllEventsFailed() {
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(
        `${this.base_url}/5c784be40bc82a5f186ac7/ShowAllEvents`,
        {
          method: "GET",
          //body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      //console.lo("response stastus: " + response.status);
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["error"]);
      expect(response.status).toEqual(404);
    });
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

  //Monda sprint 2 =>3.4 as admin i want to assign one of the candidate who applied for a task
  AssignCandidateToproject() {
    const aid = "5c784be40bc82a5f186ac770";
    const mid = "5c943ce710d91e0877f299b9";
    const pid = "5c9446ec609f7c5080979fdb";
    test(`assign one of candidates to one of the projects he applied on`, async done => {
      //console.lo(" dakhl el test");
      const response = await fetch(
        `${this.base_url}/${aid}/assign/${pid}/to/${mid}`,
        {
          method: "PUT",
          body: JSON.stringify({ memberID: mid }),
          headers: { "Content-Type": "application/json" }
        }
      );
      //console.lo("response to story 3.4 : " + response.status);
      const j = await response.json();
      //console.lo(j);
      if (
        j.msg == "invalid inputs" ||
        j.msg == "no application found" ||
        j.msg == "Error in catch block"
      )
        expect(response.status).toEqual(404);
      else expect(response.status).toEqual(200);
      done();
    });
  }

  //testing sending feedback
  sendFeedBack() {
    test(`post ${
      this.base_url
    }/adminID/events/eventID/sendFeedBackForm`, async () => {
      const memberList = await Member.find();
      const m1 = memberList[0];
      const m2 = memberList[1];
      const eventList = await Event.find();
      let e1 = eventList[0];
      const adminList = await Admin.find();
      const a1 = adminList[0];
      //adding 2 members to an event attending members list
      var requestBody = {
        bookedMembers: [m1._id, m2._id]
      };
      await fetch(`${server}/api/events/${e1._id}`, {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });
      e1 = await Event.findById(e1._id);
      //console.lo(e1.bookedMembers);
      //console.lo(e1._id);
      requestBody = {
        feedBack: "this is test feedBack link for testing sending feedBackForm"
      };
      const response = await fetch(
        `${this.base_url}/${a1._id}/events/${e1._id}/sendFeedBackForm`,
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["data"]);
      expect(response.status).toEqual(200);
      expect(jsonResponse.data[0].toString()).toEqual(m1._id.toString());
      expect(jsonResponse.data[1].toString()).toEqual(m2._id.toString());
      let allNotifications = await Notification.find();
      allNotifications = allNotifications.filter(
        allNotifications =>
          allNotifications.description === requestBody.feedBack.toString()
      );
      expect(allNotifications[0].notifiedPerson.toString()).toEqual(
        m1._id.toString()
      );
      expect(allNotifications[1].notifiedPerson.toString()).toEqual(
        m2._id.toString()
      );
      // delete created notifications
      var i;
      for (i = 0; i < allNotifications.length; i++) {
        await Notification.findByIdAndDelete(allNotifications[i]);
      }
    });
  }

  //testing sending rejection notification to non assigned members to a projects
  sendRejection() {
    test(`post ${
      this.base_url
    }/adminID/projects/projectID/sendRejection`, async () => {
      const memberList = await Member.find();
      const m1 = memberList[0];
      const m2 = memberList[1];
      const m3 = memberList[2];
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var requestBody = {
        description: "Test description",
        company: "Test Company",
        category: "Test Category",
        wantConsultancy: false,
        posted_date: date,
        memberID: m1._id,
        lifeCycle: "InProgress",
        required_skills_set: ["testSkillSet1", "testSkillSet2"]
      };
      let allProjects = await Project.find();
      let filteredProjects = allProjects.filter(
        allProjects =>
          allProjects.description.toString() ===
          requestBody.description.toString()
      );
      var i;
      for (i = 0; i < filteredProjects.length; i++) {
        await Project.findByIdAndDelete(filteredProjects[i]._id);
      }
      await fetch(`${server}/api/projects`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });
      allProjects = await Project.find();
      filteredProjects = allProjects.filter(
        allProjects =>
          allProjects.description.toString() ===
          requestBody.description.toString()
      );
      const myProject = filteredProjects[0];
      requestBody = {
        applicantId: m1._id,
        applicantName: m1.fname,
        gender: "Male",
        age: 35,
        email: "test@gmail.com",
        mobile: "0111111111",
        applyingDate: date,
        skills: "skillTest",
        yearsOfExp: 5,
        hasJob: true,
        projectId: myProject._id
      };
      await fetch(`${server}/api/applications`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });

      requestBody = {
        applicantId: m2._id,
        applicantName: m2.fname,
        gender: "Male",
        age: 35,
        email: "test@gmail.com",
        mobile: "0111111111",
        applyingDate: date,
        skills: "skillTest",
        yearsOfExp: 5,
        hasJob: true,
        projectId: myProject._id
      };
      await fetch(`${server}/api/applications`, {
        method: "Post",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });
      requestBody = {
        applicantId: m3._id,
        applicantName: m3.fname,
        gender: "Male",
        age: 35,
        email: "test@gmail.com",
        mobile: "0111111111",
        applyingDate: date,
        skills: "skillTest",
        yearsOfExp: 5,
        hasJob: true,
        projectId: myProject._id
      };
      await fetch(`${server}/api/applications`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });
      const allAdmins = await Admin.find();
      const a1 = allAdmins[0];
      const response = await fetch(
        `${this.base_url}/${a1._id}/projects/${myProject._id}/sendRejection`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["data"]);
      expect(response.status).toEqual(200);
      const message =
        "Sorry u were not accepted for project {" +
        myProject.description.toString() +
        "}";
      const allNotifications = await Notification.find();
      let filteredNotifications = [];
      for (i = 0; i < allNotifications.length; i++) {
        if (
          allNotifications[i].notifiedPerson.toString() === m1._id.toString()
        ) {
          filteredNotifications.push(allNotifications[i]);
        }
      }
      let flag = true;
      if (filteredNotifications.length !== 0) {
        if (
          filteredNotifications[
            filteredNotifications.length - 1
          ].description.toString() === message.toString()
        ) {
          flag = false;
        }
      }
      expect(flag).toBe(true);
      filteredNotifications = [];
      for (i = 0; i < allNotifications.length; i++) {
        if (
          allNotifications[i].notifiedPerson.toString() === m2._id.toString()
        ) {
          filteredNotifications.push(allNotifications[i]);
        }
      }
      expect(
        filteredNotifications[filteredNotifications.length - 1].date
      ).toEqual(new Date(date));
      expect(
        filteredNotifications[
          filteredNotifications.length - 1
        ].description.toString()
      ).toEqual(message.toString());
      await Notification.findByIdAndDelete(
        filteredNotifications[filteredNotifications.length - 1]._id
      );
      filteredNotifications = [];
      for (i = 0; i < allNotifications.length; i++) {
        if (
          allNotifications[i].notifiedPerson.toString() === m3._id.toString()
        ) {
          filteredNotifications.push(allNotifications[i]);
        }
      }
      expect(
        filteredNotifications[filteredNotifications.length - 1].date
      ).toEqual(new Date(date));
      expect(
        filteredNotifications[
          filteredNotifications.length - 1
        ].description.toString()
      ).toEqual(message.toString());
      await Notification.findByIdAndDelete(
        filteredNotifications[filteredNotifications.length - 1]._id
      );
    });
  }

  //Monda sprint 2 =>2.7 as admin i want to accept/reject event request
  DecideEventRequest() {
    const aid = "5c784be40bc82a5f186ac770";
    const eid = "5c9ccecc81f9461d58909374";
    const flag = true;
    test("decide event request", async done => {
      const response = await fetch(
        `${this.base_url}/${aid}/EventRequest/${eid}/${flag}`,
        {
          method: "PUT",
          body: JSON.stringify({ isAccepted: flag }),
          headers: { "Content-Type": "application/json" }
        }
      );
      //console.lo("response to story 2.7 " + response.status);
      const j = await response.json();
      // //console.lo(j)
      if (
        j.msg == "invalid inputs" ||
        j.error == "Request does not exist" ||
        j.error == "Event Request does not exist"
      )
        expect(response.status).toEqual(404);
      else expect(response.status).toEqual(200);
      done();
    });
  }
  // sprint 3 => as admin i want to view all applications
  ViewAllApplication() {
    const aid = "5c7a603f0a4938ccd1e08e77";
    test(" view all application for an admin", async done => {
      const response = await fetch(`${this.base_url}/${aid}/applications`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      //console.lo("response to story 5" + response.status);
      const j = await response.json();
      if (j.msg == "admin not found" || j.msg == "not found")
        expect(response.status).toEqual(404);
      else expect(response.status).toEqual(200);
      done();
    });
  }

  sendFinalDraft() {
    const requestBody = {
      finalDraft: "TESTDARFT"
    };
    test(`Admin Send Final Draft ${
      this.base_url
    }/:aid/myProjects/:pid/sendDraft`, async () => {
      const ad = await Admin.find();
      const ad1 = ad[0];
      const pr = await Project.find();
      const pr1 = pr[0];
      const response = await fetch(
        `${this.base_url}/${ad1.id}/myProjects/${pr1.id}/sendDraft`,
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
  viewMembers() {
    test(`get ${this.base_url}`, async () => {
      const ad = await Admin.find();
      const ad1 = ad[0];
      const adid = ad1.id;
      const response = await fetch(`${this.base_url}/${adid}/ShowAllMembers`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["data"]);
      expect(response.status).toEqual(200);
    });
  }
  viewMembersFail() {
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(
        `${this.base_url}/5c784be40bc82vdsa186ac770ds/ShowAllMembers`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["error"]);
      expect(response.status).toEqual(404);
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
    const requestBody = {};

    test(`Admin Send Final Draft Fail ${
      this.base_url
    }/:aid/myProjects/:pid/sendDraft`, async () => {
      const ad = await Admin.find();
      const ad1 = ad[0];
      const pr = await Project.find();
      const pr1 = pr[0];
      const response = await fetch(
        `${this.base_url}/${ad1.id}/myProjects/${pr1.id}/sendDraft`,
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

module.exports = ATest;

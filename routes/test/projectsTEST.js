const fetch = require("node-fetch");
const AbstractTests = require("./AbstractTests");
const Project = require("../../models/Project");
const ObjectId = require("mongoose");

class PrTEST extends AbstractTests {
  constructor(PORT, ROUTE) {
    super(PORT, ROUTE);
    this.sharedState = {
      id: null,
      description: null,
      company: null,
      category: null,
      want_consultancy: null,
      posted_date: null,
      lifeCycle: null,
      required_skills_set: null
    };
  }

  run() {
    super.run();
    try {
      return new Promise((resolve, reject) => {
        describe("Making sure Project routes work", () => {
          this.postRequest();
          this.postRequestmissingattribute();
          this.postRequestwrongattribute();
          this.getRequest();
          this.getRequestbyID();
          this.getRequestbywrongID();
          this.getRequestbynotavalidatedID();
          this.putRequest();
          this.putRequestbywrongID();
          this.putRequestbynotavalidatedID();
          this.putRequestmissingattribute();
          this.deleteRequest();
          this.deleteRequestbywrongID();
          this.deleteRequestbynotavalidatedID();
          // add all methods
        });
        resolve();
      });
    } catch (err) {}
  }

  postRequest() {
    const requestBody = {
      description: "no description",
      company: "no company",
      category: "no category",
      want_consultancy: false,
      posted_date: "1/1/2019",
      lifeCycle: "posted",
      required_skills_set: "[]"
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
      const pRequest = await Project.findOne(requestBody).exec();
      expect(pRequest.description).toEqual(requestBody.description);
      expect(pRequest.company).toEqual(requestBody.company);
      expect(pRequest.category).toEqual(requestBody.category);
      expect(pRequest.want_consultancy).toEqual(requestBody.want_consultancy);
      // expect(new Date(pRequest.posted_date)).toEqual(new Date((posted_date)))
      expect(pRequest.life_cycle).toEqual(requestBody.life_cycle);
      expect(pRequest.required_skills_set.toString()).toEqual(
        requestBody.required_skills_set.toString()
      );

      this.sharedState.id = pRequest.id;
      this.sharedState.description = pRequest.description;
      this.sharedState.company = pRequest.company;
      this.sharedState.category = pRequest.category;
      this.sharedState.want_consultancy = pRequest.want_consultancy;
      this.sharedState.posted_date = pRequest.posted_date;
      this.sharedState.life_cycle = pRequest.life_cycle;
      this.sharedState.required_skills_set = pRequest.required_skills_set;
    });
  }

  postRequestmissingattribute() {
    const requestBody = {
      company: "no company",
      category: "no category",
      want_consultancy: false,
      posted_date: "1/1/2019",
      life_cycle: "posted",
      required_skills_set: "[]"
    };
    test(`post ${this.base_url}`, async () => {
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

  postRequestwrongattribute() {
    const requestBody = {
      description: 20,
      company: "no company",
      category: "no category",
      want_consultancy: false,
      posted_date: "1/1/2019",
      life_cycle: "posted",
      required_skills_set: "[]"
    };
    test(`post ${this.base_url}`, async () => {
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

  getRequest() {
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      expect(response.status).toEqual(200);
    });
  }

  getRequestbyID() {
    test(`get ${this.base_url}/${this.sharedState.id}`, async () => {
      const response = await fetch(`${this.base_url}/${this.sharedState.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      expect(response.status).toEqual(200);
    });
  }

  getRequestbywrongID() {
    test(`get ${this.base_url}/:id`, async () => {
      const response = await fetch(
        `${this.base_url}/5c94376f029c042e280b0fb0`,
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

  getRequestbynotavalidatedID() {
    test(`get ${this.base_url}/:id`, async () => {
      const response = await fetch(`${this.base_url}/5c94376f09c042e280b0fb0`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["error"]);
      expect(response.status).toEqual(404);
    });
  }

  putRequest() {
    const requestBody = {
      description: "description"
    };

    test(`put ${this.base_url}/${this.sharedState.id}`, async () => {
      const response = await fetch(`${this.base_url}/${this.sharedState.id}`, {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });
      expect(response.status).toEqual(200);
      this.sharedState.description = requestBody.description;
    });
  }

  putRequestbywrongID() {
    const requestBody = {
      description: "description"
    };

    test(`put ${this.base_url}/:id`, async () => {
      const response = await fetch(
        `${this.base_url}/5c94376f029c042e280b0fb0`,
        {
          method: "PUT",
          body: JSON.stringify(requestBody),
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();
      // expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404);
    });
  }

  putRequestbynotavalidatedID() {
    const requestBody = {
      description: "description"
    };

    test(`put ${this.base_url}/:id`, async () => {
      const response = await fetch(`${this.base_url}/5c94376f09c042e280b0fb0`, {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });
      const jsonResponse = await response.json();
      // expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404);
    });
  }

  putRequestmissingattribute() {
    const requestBody = {
      description: 20
    };

    test(`put ${this.base_url}/:id`, async () => {
      const response = await fetch(`${this.base_url}/5c94376f09c042e280b0fb0`, {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });
      const jsonResponse = await response.json();
      // expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404);
    });
  }

  deleteRequest() {
    test(`delete ${this.base_url}/${this.sharedState.id}`, async () => {
      const response = await fetch(`${this.base_url}/${this.sharedState.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      expect(response.status).toEqual(200);
    });
  }

  deleteRequestbywrongID() {
    test(`delete ${this.base_url}/:id`, async () => {
      const response = await fetch(
        `${this.base_url}/5c94376f029c042e280b0fb0`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        }
      );
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["error"]);
      expect(response.status).toEqual(400);
    });
  }

  deleteRequestbynotavalidatedID() {
    test(`delete ${this.base_url}/:id`, async () => {
      const response = await fetch(`${this.base_url}/5c94376f09c042e280b0fb0`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["error"]);
      expect(response.status).toEqual(404);
    });
  }
}

module.exports = PrTEST;

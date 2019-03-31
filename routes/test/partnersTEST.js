const fetch = require("node-fetch");
const AbstractTests = require("./AbstractTests");
const Projects = require("../../models/Project")
const ObjectId = require("mongoose");
// const consultancyagency = require('../../models/consultancyagency')//require your model
const Partners = require("../../models/PartnerInfo");
const Events = require('../../models/Event')
class PaTest extends AbstractTests {
  constructor(PORT, ROUTE) {
    super(PORT, ROUTE);
    this.sharedState = {

      name: null,
      age: null,
      gender: null,
      e_mail: null,
      experience_level: null,
      phone_number:null
    }
  }

  run() {
    super.run();
    try {
      return new Promise((resolve, reject) => {

        describe('Making sure Partner routes work', () => {
          this.postRequest()
         this.postRequestFail()
          this.getRequest()
          this.getRequestBYID()
          this.getRequestBYIDFail()
           this.putRequest()
          this.putRequestFail()
           this.deleteRequest()
           this.deleteRequestFail()
           // add all methods 
           this.postProject()
         this.postProjectFail()
          this.getMyProjects()
          this.getMyProjectsFail()
          this.putApproveONFinalDraft()
          this.putApproveONFinalDraftFail()
          this.putApproveONFinalDraftFail()
          this.putDisapproveONFinalDraft()
         this.putDisapproveONFinalDraftFail()
          this.AssignCAtoProj()
         this.AssignCAtoProjFail()
          this.Partnerrequestrating()
          this.PartnerrequestratingbywrongPartnerID()
          this.PartnerrequestratingbynotavalidatedPartnerID()
          this.PartnerrequestratingbywrongEventID()
          this.PartnerrequestratingbynotavalidatedEventID()
          this.PartnerrequestratingbynotanEventsOwner()
          this.acceptFinalReview();
          this.declineFinalReview();
          this.declineFinalReviewFail();
          this.acceptFinalReviewFail();

        })
        resolve()
      })
    } catch (err) {}
  }
postRequest () {
    const requestBody = {
      name: "Partners's name",
      age: 55,
      gender: "gender",
      e_mail: "Partners's e_mail",
      experience_level: "experience_level",
      phone_number:"54525452115"
    }

    test(`post ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      //console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      //console.log(jsonResponse)
      expect(Object.keys(jsonResponse)).toEqual(['msg','data'])
      expect(response.status).toEqual(200)

      
      const eRequest = await Partners.findOne(requestBody).exec()
      expect(eRequest.name).toEqual(requestBody.name)
      expect(eRequest.age).toEqual(requestBody.age)
      expect(eRequest.gender).toEqual(requestBody.gender)
      expect(eRequest.e_mail).toEqual(requestBody.e_mail)
      expect(eRequest.experience_level).toEqual(requestBody.experience_level)
      expect(eRequest.phone_number).toEqual(requestBody.phone_number)
      this.sharedState.name =  eRequest.name
      this.sharedState.age =  eRequest.age
      this.sharedState.gender =  eRequest.gender
      this.sharedState.e_mail =  eRequest.e_mail
      this.sharedState.experience_level =  eRequest.experience_level
      this.sharedState.phone_number =  eRequest.phone_number
    })
  }
  postRequestFail () { //entring the age as a string 
    const requestBody = {
      name: "name",
      age: "String",
      gender: "gender",
      e_mail: "e_mail",
      experience_level: "experience_level",
      phone_number:"54525452115"
    }

    test(`post ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      //console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      //console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(400)
    })
  }

  getRequest  () {
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      //console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      //console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(response.status).toEqual(200)
    })
  }

  getRequestBYID  () {
    test(`get ${this.base_url}`, async () => {
      const par = await Partners.find();
      const par1 = par[0];
      const parid = par1.id;
      const response = await fetch(`${this.base_url}/${parid}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      //console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      //console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(response.status).toEqual(200)
    })
  }

  getRequestBYIDFail  () { //enter invalid id 
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c786899f8e026447d212f`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      //console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      //console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      expect(response.status).toEqual(400)
    })
  }

  putRequest  () {
    const requestBody = {
      name: "Mariam",
      age: 30,
      gender: "Female",
      e_mail: "dont have",
      experience_level: "beginner",
      phone_number: "010265642362",
    }

    test(`put ${this.base_url}`, async () => {
      const par = await Partners.find();
      const par1 = par[1];
      const parid = par1.id;
      const response = await fetch(`${this.base_url}/${parid}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      //console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      //console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      expect(response.status).toEqual(200)

      
      const eRequest = await Partners.findOne(requestBody).exec()
      expect(eRequest.name).toEqual(requestBody.name)
      expect(eRequest.age).toEqual(requestBody.age)
      expect(eRequest.gender).toEqual(requestBody.gender)
      expect(eRequest.e_mail).toEqual(requestBody.e_mail)
      expect(eRequest.experience_level).toEqual(requestBody.experience_level)
      expect(eRequest.phone_number).toEqual(requestBody.phone_number)
      this.sharedState.id = eRequest.id
      this.sharedState.name =  eRequest.name
      this.sharedState.age =  eRequest.age
      this.sharedState.gender =  eRequest.gender
      this.sharedState.e_mail =  eRequest.e_mail
      this.sharedState.experience_level =  eRequest.experience_level
      this.sharedState.phone_number =  eRequest.phone_number
    })
       
  }

  putRequestFail  () {//enter the name as a boolean 
    const requestBody = {
      name: true,
      age: "70",
      gender: "male",
      e_mail: "dont have",
      experience_level: "beginner",
      phone_number: "010265642362",
    }

    test(`put ${this.base_url}`, async () => { 
      const par = await Partners.find();
      const par1 = par[1];
      const parid = par1.id;
      const response = await fetch(`${this.base_url}/${parid}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      //console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      //console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(400)
    })
       
  }  

  deleteRequest  () {
    test(`delete ${this.base_url}`, async () => {
      const par = await Partners.find();
      const par1 = par[2];
      const parid = par1.id;
      const response = await fetch(`${this.base_url}/${parid}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      //console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      //console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(['msg','data'])
      expect(response.status).toEqual(200)
    })
  }

  deleteRequestFail  () {//enter wrong ID
    test(`delete ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c786899f8e026447d212f`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      //console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      //console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }

  postProject () {
    const requestBody = {
      description: "New Project description",
      company: "Dell" ,
      category: "category",
      want_consultancy: true,
      posted_date: "1/1/2020",
    }

    test(`post ${this.base_url}`, async () => {
      const par = await Partners.find();
      const par1 = par[0];
      const parid = par1.id;
      const response = await fetch(`${this.base_url}/${parid}/addProject`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      //console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      //console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      expect(response.status).toEqual(200)

      
      const eRequest = await Projects.findOne(requestBody).exec()
      expect(eRequest.description).toEqual(requestBody.description)
      expect(eRequest.company).toEqual(requestBody.company)
      expect(eRequest.category).toEqual(requestBody.category)
      expect(eRequest.want_consultancy).toEqual(requestBody.want_consultancy)
      expect(new Date(eRequest.posted_date)).toEqual(new Date(requestBody.posted_date))
      this.sharedState.description =  eRequest.description
      this.sharedState.company =  eRequest.company
      this.sharedState.category =  eRequest.category
      this.sharedState.want_consultancy =  eRequest.want_consultancy
      this.sharedState.posted_date =  eRequest.posted_date
    })
  }

  postProjectFail () {//enter an invalid id 
    const requestBody = {
      description: "description",
      company: "company" ,
      category: "category",
      want_consultancy: true,
      posted_date: "11/11/2018"
    }

    test(`post ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c9cd0503c24d38b8731a/addProject`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      //console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      //console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }

   getMyProjects  () {
    test(`get ${this.base_url}`, async () => {
      const par = await Partners.find();
      const par1 = par[0];
      const parid = par1.id;
      const response = await fetch(`${this.base_url}/${parid}/myProjects`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      //console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      //console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(response.status).toEqual(200)
    })
  }

  getMyProjectsFail () {//enter wrong id
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c786899f8a26447d212f/myProjects`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      //console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      //console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
    })
  }

  putApproveONFinalDraft  () {
    const requestBody = {
    }
    test(`put ${this.base_url}`, async () => {
      const par = await Partners.find();
      const par1 = par[0];
      const parid = par1.id;
      var projs = await Projects.find()
      projs = projs.filter(p => p.companyID == parid  && p.want_consultancy==false)
      const proj = projs[0];
      await fetch(
        `${this.projects_url}/${proj.id}/`,
        {
          method: "put",
          body: JSON.stringify({life_cycle : "Final Draft"}),
          headers: { "Content-Type": "application/json" }
        }
      );
      const projid = proj.id;
      //console.log(parid)
      //console.log(projid)
      const response = await fetch(`${this.base_url}/${parid}/myprojects/${projid}/finaldraft/approve`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      //console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      //console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      expect(response.status).toEqual(200)
    })    
  }

  putApproveONFinalDraftFail  () {//enter invalid Projects id
    const requestBody = {
    }
    test(`put ${this.base_url}`, async () => {
      const par = await Partners.find();
      const par1 = par[0];
      const parid = par1.id;
      const response = await fetch(`${this.base_url}/${parid}/myprojects/5c94436fc61339203ad8c7/finaldraft/approve`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      //console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      //console.log(jsonResponse)
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)

    })    
  }

  putDisapproveONFinalDraft() {
    const requestBody = {
    }
    test(`put ${this.base_url}`, async () => {
      const par = await Partners.find();
      const par1 = par[0];
      const parid = par1.id;
      var projs = await Projects.find()
      projs = projs.filter(p => p.companyID == parid  && p.want_consultancy==false)
      const proj = projs[0]
      await fetch(
        `${this.projects_url}/${proj.id}/`,
        {
          method: "put",
          body: JSON.stringify({life_cycle : "Final Draft"}),
          headers: { "Content-Type": "application/json" }
        }
      );
      const projid = proj.id;
      //console.log(projid)
      //console.log(parid)
      const response = await fetch(`${this.base_url}/${parid}/myprojects/${projid}/finaldraft/disapprove`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      //console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      //console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      expect(response.status).toEqual(200)

    })    
  }

  putDisapproveONFinalDraftFail () { //enter wrong Projects id 
    const requestBody = {
    }
    test(`put ${this.base_url}`, async () => {
      const par = await Partners.find();
      const par1 = par[0];
      const parid = par1.id;
      const response = await fetch(`${this.base_url}/${parid}/myprojects/5c94436fd0c339203ad8c7/finaldraft/disapprove`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      //console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      //console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)

    })    
  }

  AssignCAtoProj() {
    const requestBody = {
    }
    test(`put ${this.base_url}`, async () => {
      const par = await Partners.find();
      const par1 = par[0];
      const parid = par1.id;
      var projs = await Projects.find()
      projs = projs.filter(p => p.companyID == parid  && p.want_consultancy==true)
      var k=0
      for(k;k<projs.length;k++){
      await fetch(
        `${this.projects_url}/${projs[k].id}/`,
        {
          method: "put",
          body: JSON.stringify({consultancyID : null }),
          headers: { "Content-Type": "application/json" }
        }
      );
    }
      const cas = await ConsultancyAgency.find()
      var ids =[]
      var i=0
      for(i;i<cas.length;i++){

        ids.push(cas[i].id.toString())        
      }
      var i=0
      var j=0
      var result =[]
      var result2 =  []
      for(i;i<projs.length;i++){
        for(j; j<projs[i].applyingCA.length; j++){
        if(ids.includes(projs[i].applyingCA[j].toString())){
          result.push(projs[i].applyingCA[j])
          result2.push(projs[i].id)
        }
      }
    }
      const consul = result[0]
      ////console.log(consul)
      const proj = result2[0]
      ////console.log(proj)
      const response = await fetch(`${this.base_url}/${parid}/project/${proj}/AssignCAtoProject/${consul}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      ////console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      ////console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      expect(response.status).toEqual(200)
    })    
  }
  AssignCAtoProjFail() {//enter wrong id for consultancy agency 
    const requestBody = {
    }
    test(`put ${this.base_url}`, async () => {
      const par = await Partners.find();
      const par1 = par[0];
      const parid = par1.id;
      var projs = await Projects.find()
      projs = projs.filter(p => p.companyID == parid  && p.want_consultancy==true && p.consultancyID == null )
      const proj = projs[0]
      const projid = proj.id
      const response = await fetch(`${this.base_url}/${parid}/project/${projid}/AssignCAtoProject/5c7a6797938ccd1e08e7c`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      //console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      //console.log(jsonResponse )
      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)

    })    
  }

  // 10 As a patrner I want to give the attendees a form to rate the event and give a feedback
  Partnerrequestrating(){
    const requestBody = {}
  
  test(`post ${this.base_url}/:id/rating/:eid/`, async () => {
    const events = await Events.find()
    const pas = await Partners.find()
    var ids =[]
    var i=0
    for(i;i<pas.length;i++){
      ids.push(pas[i].id.toString())        
    }
    var i=0
    var result =[]
    for(i;i<events.length;i++){
      if(ids.includes(events[i].requestorId.toString())){
        result.push(events[i])
      }
    }
    const pid = result[0].requestorId
    const eid = result[0].id
    const response = await fetch(`${this.base_url}/${pid}/rating/${eid}/`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      expect(response.status).toEqual(200)
    })
  }

  // 10 As a patrner I want to give the attendees a form to rate the event and give a feedback
  PartnerrequestratingbywrongPartnerID(){
    const requestBody = {}
  
  test(`post ${this.base_url}/:pid/rating/:eid/`, async () => {
    const response = await fetch(`${this.base_url}/5c786899f8a8e826447d212f/rating/5c9cda328acdd615d268e514/`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)
    })
  }

  // 10 As a patrner I want to give the attendees a form to rate the event and give a feedback
  PartnerrequestratingbynotavalidatedPartnerID(){
    const requestBody = {}
  
  test(`post ${this.base_url}/:pid/rating/:eid/`, async () => {
    const response = await fetch(`${this.base_url}/5c786899f8a8e26447d212f/rating/5c9cda328acdd615d268e514/`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)
    })
  }

  // 10 As a patrner I want to give the attendees a form to rate the event and give a feedback
  PartnerrequestratingbywrongEventID(){
    const requestBody = {}
  
  test(`post ${this.base_url}/:pid/rating/:eid/`, async () => {
    const response = await fetch(`${this.base_url}/5c786899f8a8e026447d212f/rating/5c9cda328acdd615d868e514/`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)
    })
  }

  // 10 As a patrner I want to give the attendees a form to rate the event and give a feedback
  PartnerrequestratingbynotavalidatedEventID(){
    const requestBody = {}
  
  test(`post ${this.base_url}/:pid/rating/:eid/`, async () => {
    const response = await fetch(`${this.base_url}/5c786899f8a8e026447d212f/rating/5c9cda328add615d268e514/`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)
    })
  }

  // 10 As a patrner I want to give the attendees a form to rate the event and give a feedback
  PartnerrequestratingbynotanEventsOwner(){
    const requestBody = {}
  
  test(`post ${this.base_url}/:pid/rating/:eid/`, async () => {
    const response = await fetch(`${this.base_url}/5c7a5ae73c28ff08583304ee/rating/5c9cda328add615d268e514/`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)
    })
  }
  
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
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["msg"]);
      expect(response.status).toEqual(200);

      
    });
  }

  declineFinalReview() {
    const requestBody = {
      // enter model attributes
    };

    test(`declineFinalReview ${
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
        }/${pr.companyID}/myprojects/${pr.id}/finalreview/decline`,
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

  acceptFinalReviewFail() {
    const requestBody = {
      // enter model attributes
    };

    test(`acceptFinalReviewFail ${
      this.base_url
    }/:id/myprojects/:pid/finalreview/approve`, async () => {

      const prs = await Projects.find()
      const pr = prs[0]
      await fetch(
        `${this.projects_url}/${pr.id}/`,
        {
          method: "put",
          body: JSON.stringify({life_cycle : "In Progress"}),
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
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(["error"]);
      expect(response.status).toEqual(400);

      
    });
  }

  declineFinalReviewFail() {
    const requestBody = {
      // enter model attributes
    };

    test(`declineFinalReviewFail ${
      this.base_url
    }/:id/myprojects/:pid/finalreview/approve`, async () => {

      const prs = await Projects.find()
      const pr = prs[0]
      await fetch(
        `${this.projects_url}/${pr.id}/`,
        {
          method: "put",
          body: JSON.stringify({life_cycle : "In Progress"}),
          headers: { "Content-Type": "application/json" }
        }
      );


      const response = await fetch(
        `${
          this.base_url
        }/${pr.companyID}/myprojects/${pr.id}/finalreview/decline`,
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

module.exports = PaTest

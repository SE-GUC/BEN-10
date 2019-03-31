const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Partner = require('../../models/PartnerInfo') //require your model
const Project = require('../../models/Project')
const ObjectId = require('mongoose');

class PTest extends AbstractTests {
  constructor (PORT, ROUTE) {
    super(PORT, ROUTE)
    this.sharedState = {
        // enter model attributes an set them to null
    }
  }

  run() {
    super.run()
    try {
      return new Promise((resolve, reject) => {
        describe('Making sure A routes work', () => {
          // this.postRequest()
          // this.getRequest()
          // this.putRequest()
          // this.deleteRequest()
          this.deleteProject()
          this.editProject()
          //  this.ShowMyEvents() 
          // add all methods

        })
        resolve()
      })
    } catch (err) {}
  }


  postRequest () {
    const requestBody = {
       // enter model attributes
    }

    test(`post ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['msg','data'])
      expect(response.status).toEqual(200)

     
      
    })
  }


  deleteProject () {
    test(`delete ${this.base_url}`, async () => {
      const partners = await Partner.find()
      const partner = partners[0]
      // console.log(partner._id)
      const body ={
                    "required_skills_set": [],
                    "applyingCA": [],
                    "description": "i was hereeeeee",
                    "company": "GUCCO",
                    "companyID": partner._id,
                    "category": "Education",
                    "want_consultancy": true,
                    "posted_date": "1998-02-09T22:00:00.000Z",
                    "life_cycle": "Negotiation",
                    "memberID": "5c9300a7676da108728b0df0",
                    "final_draft": "TESTDARFT",
                    "consultancyID": "5c79283c92334b03f4b6244f"
                  }
      const pr = await fetch(`${this.projects_url}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      })
      const result = await pr.json()
      const response = await fetch(`${this.base_url}/${result.data.companyID}/deleteProject/${result.data._id}`, {
        method: 'DELETE',
        //body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      expect(response.status).toEqual(200)
   
      
    })
  }

  editProject () {
    test(`edit ${this.base_url}`, async () => {
      const partners = await Partner.find()
      const partner = partners[0]
      // console.log(partner._id)
      const body ={
                    "required_skills_set": [],
                    "applyingCA": [],
                    "description": "i was hereeeeee",
                    "company": "GUCCO",
                    "companyID": partner._id,
                    "category": "Education",
                    "want_consultancy": true,
                    "posted_date": "1998-02-09T22:00:00.000Z",
                    "life_cycle": "Negotiation",
                    "memberID": "5c9300a7676da108728b0df0",
                    "final_draft": "TESTDARFT",
                    "consultancyID": "5c79283c92334b03f4b6244f"
                  }
      const pr = await fetch(`${this.projects_url}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      })
      const result = await pr.json()
      const response = await fetch(`${this.base_url}/${result.data.companyID}/editProject/${result.data._id}`, {
        method: 'put',
        body: JSON.stringify({"category": "History"}),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      expect(response.status).toEqual(200)
   
      
    })
  }

  
  getRequest  () {}
  putRequest  () {}
  deleteRequest  () {}


  ShowMyEvents(){
    test(`get ${this.base_url}`, async () => {
      const par = await Partner.find()
      const par1 = par[0]
      const parid = par1.id
      const response = await fetch(`${this.base_url}/${parid}/ShowMyEvents`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      if(jsonResponse.msg =="NO Events to show")
      {
      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      }
      else {
        expect(Object.keys(jsonResponse)).toEqual(['data'])
      }

      expect(response.status).toEqual(200)
  }
    )}
    ShowMyEventsFailure(){
      test(`get ${this.base_url}`, async () => {
        const response = await fetch(`${this.base_url}/1234567890/ShowMyEvents`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
        console.log("response stastus: "+ response.status)
        const jsonResponse = await response.json()
        console.log(jsonResponse)
        
        expect(Object.keys(jsonResponse).toString()).toEqual(["error"].toString())
        expect(response.status).toEqual(404)
    }
      )
    }

}
module.exports = PTest
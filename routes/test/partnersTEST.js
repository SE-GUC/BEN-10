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
          // this.deleteProject()
           //this.ShowMyEvents() 
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
      const projects = await Project.find()
      const project = projects[0]
      console.log(project.id)
      console.log(project.companyID)
      const response = await fetch(`${this.base_url}/${project.companyID}/deleteProject/${project.id}`, {
        method: 'DELETE',
        //body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['msg','data'])
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
    SubmitRequest(){
      const requestBody = {
        // enter model attributes
             requestorId: "qw",
             gender: "false",
             nationality: "egyptian",
             maritalStatus: "single",
             militaryStatus: "excempt",
             drivingLicense: "qwertyuio",
             country: "egypt",
             city: "cairo",
             area: "tagamoa",
             postalCode: "12211",
             mobileNumber: "0123456789",
             email: "asdfghjkl",
             password: "qwertyuio",
             birthdate: "1998-12-09T22:00:00.000+00:00"
    }
    

}
module.exports = PTest
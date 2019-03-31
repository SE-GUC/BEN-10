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
      const projects = await Project.find()
      const partner = partners[0]
      const project = projects[0]
      const response = await fetch(`${this.base_url}/${partner.id}/deleteProject/${project.id}`, {
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

}
module.exports = PTest
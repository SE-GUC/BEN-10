const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Admin = require('../../models/admins') //require your model
const ObjectId = require('mongoose');

class PaTest extends AbstractTests {
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
          this.postRequest()
          this.getRequest()
          this.putRequest()
          this.deleteRequest()
           //1.5 AS a partner i want to review the final work of the candidate who is working on my task/project.
           this.getMyProjects()
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

  getRequest  () {}
  putRequest  () {}
  deleteRequest  () {}

  getMyProjects(){
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c786899f8a8e026447d212f/ShowFinalDraft`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(response.status).toEqual(200)
  
    })
  }

}
module.exports = Patest
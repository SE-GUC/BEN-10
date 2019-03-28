const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Admin = require('../../models/Admin') //require your model
const ObjectId = require('mongoose');

class AdminTest extends AbstractTests {
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
          //this.getRequest()
          //this.putRequest()
          //this.deleteRequest()

          // 3.1- As an admin i want to identify a task/project with a set of attributes so that it defines it
          //this.identifyProject()

          // 21- As an admin i want to view all event 
          this.viewAllEvents()
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

  // As and admin i want to identify a task/project with a set of attributes so that it defines it
  identifyProject () {
    const identifiedBody = {
       // enter model attributes
       company : "GUCCO" ,
       category : "Education"
    }

    test(`put ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c784be40bc82a5f186ac770/assignAttributes/5c9ca5c5367be50ab879e417`, {
        method: 'PUT',
        body: JSON.stringify(identifiedBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      expect(response.status).toEqual(200)

      this.sharedState.company =  identifiedBody.company
      this.sharedState.category =  identifiedBody.category
      
    })
  }

  viewAllEvents(){
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c784be40bc82a5f186ac770/ShowAllEvents`, {
        method: 'GET',
        //body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(response.status).toEqual(200)

     
      
    })
  }
}
module.exports = AdminTest

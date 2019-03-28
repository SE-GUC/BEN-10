const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const ConsultancyAgencys = require('../../models/ConsultancyAgency') //require your model
const ObjectId = require('mongoose');

class CATest extends AbstractTests {
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
          //this.postRequest()
          //this.getRequest()
          //this.putRequest()
          //this.deleteRequest()
          
          // 2.1 As a consultancy agency i want to apply for task/project
          //this.applyForProject()


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

  applyForProject(){
    test(`put ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c7a67970a4938ccd1e08e7c/caApplyProject/5c94436fd0c61339203ad8c7`, {
        method: 'PUT',
        //body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      expect(response.status).toEqual(200)

     
      
    })
  }

}
module.exports = CATest

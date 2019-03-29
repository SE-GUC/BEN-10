const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Admin = require('../../models/member')
const ObjectId = require('mongoose');

class MTest extends AbstractTests {
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
          // this.postevent()
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

  postevent() {
    const requestBody = {}
    test(`put ${this.base_url}/${this.sharedState.id}/events/:id2/`, async () => {
      const response = await fetch(`${this.base_url}/5c93d983f3fe6358b41ccd7a/events/5c9ce0e20ddd11042a301e26/`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toEqual(200)
      // const pRequest = await Project.findbyid(requestBody).exec()
      // expect(pRequest.description).toEqual(requestBody.description)

      // this.sharedState.description =  pRequest.description
    })
  }
}

module.exports = MTest
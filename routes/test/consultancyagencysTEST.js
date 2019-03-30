const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Admin = require('../../models/admins') //require your model
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
          this.postRequest()
          this.getRequest()
          this.putRequest()
          this.deleteRequest()
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


// monda sprint 2 = > 2.3 as ca i want to view all of my projects in final review state 
// i.e : do review of final work  
DoFinalReview(){
  const caid = '5c79260b4328ab820437835c'
  test('showing projects in final review for that ca',async (done) => {
      const response = await fetch(`get ${this.base_url}/${caid}/reviewprojects`,{
        method : 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response to story 2.3 "+response.status)
      expect(response.status).toEqual(200)
      done(); 
  
  })
}
}
module.exports = CAtest

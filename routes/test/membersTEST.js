const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Member = require('../../models/member') //require your model
const event= require('../../models/Event')
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
          //4.8//As a candidate I want to book a place in an event (based on the event’s type).
        this.bookEvent()
         this.bookEventFail();
         // this.bookEventFail()
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
 
 bookEvent(){
    
    test(`put ${this.base_url}`, async () => {
      const mem = await Member.find();
      const mem1 = mem[0];
      const memid = mem1.id;
      const ev = await event.find();
      const ev1 = ev[0];
      const evid = ev1.id;
      const response = await fetch(`${this.base_url}/${memid}/bookEvent/${evid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      expect(Object.keys(jsonResponse)).toEqual(['msg'])
      expect(response.status).toEqual(200)
    })
  }
   
  bookEventFail(){
    test(`put ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c9e5514086c0c08183d8/bookEvent/5c93e86e61fb9b030dc8e`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      expect(response.status).toEqual(404)
    })
  }

}
module.exports = MTest
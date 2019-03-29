const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const eventRequest = require('../../models/EventRequest')
const ObjectId = require('mongoose');

class ERTest extends AbstractTests {
  constructor (PORT, ROUTE) {
    super(PORT, ROUTE)
    this.sharedState = {
        requestedBy: null,
        description: null,
        eventType: null,
        eventLocation: null,
        eventDate: null,
        isAccepted: null,
        requestorId: null
    }
  }

  run() {
    super.run()
    try {
      return new Promise((resolve, reject) => {
        describe('Making sure ER routes work', () => {
          this.postRequest()
          this.getRequest()
          this.putRequest()
          this.deleteRequest()

        })
        resolve()
      })
    } catch (err) {}
  }


  postRequest () {
    const requestBody = {
        requestedBy: "testreq",
        description: "testdesc",
        eventType: "testtype",
        eventLocation: "testloc",
        eventDate: "1/1/2020",
        isAccepted: false,
        requestorId: "5c784be40bc82a5f186ac770"
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

      const eRequest = await eventRequest.findOne(requestBody).exec()
      expect(eRequest.description).toEqual(requestBody.description)
    //   expect(eRequest.eventDate).toBeCloseTo(eventDate)
      expect(eRequest.eventLocation).toEqual(requestBody.eventLocation)
      expect(eRequest.eventType).toEqual(requestBody.eventType)
      expect(eRequest.isAccepted).toEqual(requestBody.isAccepted)
      expect(eRequest.requestedBy).toEqual(requestBody.requestedBy)
      expect(new String(eRequest.requestorId)).toEqual(requestBody.requestorId)
      this.sharedState.requestedBy =  eRequest.requestedBy
      this.sharedState.description =  eRequest.description
      this.sharedState.eventType =  eRequest.eventType
      this.sharedState.eventLocation =  eRequest.eventLocation
      this.sharedState.eventDate =  eRequest.eventDate
      this.sharedState.description =  eRequest.description
      this.sharedState.isAccepted =  eRequest.isAccepted
      this.sharedState.requestorId =  eRequest.requestorId
    })
  }

  getRequest  () {}
  putRequest  () {}
  deleteRequest  () {}

}
module.exports = ERTest
const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const eventRequest = require('../../models/EventRequest')
const ObjectId = require('mongoose');

//= =---------------------------------------------------= =//
//= =--- UsersTest class
//= =---------------------------------------------------= =//
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

  runIndependently () {
    super.runIndependently()
    try {
      return new Promise((resolve, reject) => {
        describe('Making sure independent ER routes work', () => {
          this.postRequestIndependently()
          this.getRequestIndependently()
          this.putRequestIndependently()
          this.deleteRequestIndependently()
        })
        resolve()
      })
    } catch (err) {}
  }

  // runDependently () {
  //   super.runDependently()
  //   try {
  //     return new Promise((resolve, reject) => {
  //       describe('Making sure dependent ER routes work', () => {
  //         this.postRequestDependently()
  //         this.getRequestDependently()
  //         this.putRequestDependently()
  //         this.deleteRequestDependently()
  //       })
  //       resolve()
  //     })
  //   } catch (err) {}
  // }

  postRequestIndependently () {
    const requestBody = {
        requestedBy: "testreq",
        description: "testdesc",
        eventType: "testtype",
        eventLocation: "testloc",
        eventDate: "1/1/2020",
        isAccepted: false,
        requestorId: "5c784be40bc82a5f186ac770"
    }

    test(`Randomly creating a new eventrequest,\t\t[=> POST\t${this.base_url}\t`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()

      // check if the json response has data not error
      expect(Object.keys(jsonResponse)).toEqual(['msg','data'])
      expect(response.status).toEqual(200)

      // go check in the mongo database
      const eRequest = await eventRequest.findOne(requestBody).exec()
    //   expect(eRequest).toMatchObject(requestBody)
      expect(eRequest.description).toEqual(requestBody.description)
    //   expect(eRequest.eventDate).toBeCloseTo(eventDate)
      expect(eRequest.eventLocation).toEqual(requestBody.eventLocation)
      expect(eRequest.eventType).toEqual(requestBody.eventType)
      expect(eRequest.isAccepted).toEqual(requestBody.isAccepted)
      expect(eRequest.requestedBy).toEqual(requestBody.requestedBy)
      expect(new String(eRequest.requestorId)).toEqual(requestBody.requestorId)
    //   this.sharedState.id = user.id
    //   this.sharedState.name = user.name
    //   this.sharedState.birthdate = user.birthdate
    //   this.sharedState.gender = user.gender
    })
  }

  getRequestIndependently () {}
  putRequestIndependently () {}
  deleteRequestIndependently () {}
  // getRequestDependently () {}
  // putRequestDependently () {}
  // deleteRequestDependently () {}
  // postRequestDependently () {}


}
module.exports = ERTest
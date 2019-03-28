const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const ObjectId = require('mongoose');
const Event = require("../../models/Event");

class ETest extends AbstractTests {
  constructor (PORT, ROUTE) {
    super(PORT, ROUTE)
    this.sharedState = {
    requestorId:null,
    requestedBy:null,
    eventType:null,
    eventLocation:null,
    description:null,
    registPrice:null,
    remainingPlace:null,
    topics:null,
    speaker:null,
    feedback:null,
    regist_start_date:null,
    regist_expiry_date:null,
    request_id:null,
    eventDate:null,
    bookedMembers: null,
    formLink:null

    }
  }

  run() {
    super.run()
    try {
      return new Promise((resolve, reject) => {
        describe('Making sure Eevent routes work', () => {
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
      requestedBy:"nada",
      description:"event to enforce young developpers to think creatively",
      eventType:"software",
      eventLocation:"zamalek",
      eventDate:"27-12-2019",
      registPrice:200,
      remainingPlace:1000,
      topics:["introductory","software presentations and fields of work","workshop"],
      speaker:"bill gates",
      regist_start_date:"27-9-2019",
      regist_expiry_date:"27-11-2019",
      requestorId:"5c9cd0f23c242d1d38b8731c"
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

      const event=await Event.findOne(requestBody).exec();
      expect(event).toMatchObject(requestBody)
      this.sharedState.requestedBy=event.requestedBy
      this.sharedState.description=event.description
      this.sharedState.eventType=event.eventType
      this.sharedState.eventLocation=event.eventLocation
      this.sharedState.eventDate=event.eventDate
      this.sharedState.registPrice=event.registPrice
      this.sharedState.remainingPlace=event.remainingPlace
      this.sharedState.topics=event.topics
      this.sharedState.speaker=event.speaker
      this.regist_start_date=event.regist_start_date
      this.regist_expiry_date=event.regist_expiry_date
      this.sharedState.requestorId=event.requestorId
    })
  }

  getRequest  () {}
  putRequest  () {}
  deleteRequest  () {}

}
module.exports = ETest
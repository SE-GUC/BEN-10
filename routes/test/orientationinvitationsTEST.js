const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const OrientationInvitation = require('../../models/OrientationInvitation') //require your model
const ObjectId = require('mongoose');

class OITest extends AbstractTests {
  constructor (PORT, ROUTE) {
    super(PORT, ROUTE)
    this.sharedState = {
            sentto:null,
            description:null,
            sentBy:null,
            sentAt:null,
            senttoID:null,
            sentByID:null
        
    }
  }

  run() {
    super.run()
    try {
      return new Promise((resolve, reject) => {
        describe('Making sure A routes work', () => {
          //this.postRequest()
         // this.postRequestFail()
          //this.getRequest()
          //this.putRequest()
         // this.deleteRequest()
          //this.getRequestByid()

          // add all methods

        })
        resolve()
      })
    } catch (err) {}
  }


  
  postRequest () {
    const requestBody = {
      sentto:"ahmed",
      description:"ay haga ",
      sentBy:"hisham",
      sentAt:"2019-03-27T22:00:00.000+00:00",
      senttoID:"5c93d983f3fe6358b41ccd7a",
      sentByID:"5c96711e683cf704874a3052"
    }

    test(`post ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(['msg','data'])
      expect(response.status).toEqual(200)
      const eRequest = await OrientationInvitation.findOne(requestBody).exec()
      expect(eRequest.description).toEqual(requestBody.description)
    //   expect(eRequest.eventDate).toBeCloseTo(eventDate)
      expect(eRequest.sentto).toEqual(requestBody.sentto)
      expect(eRequest.description).toEqual(requestBody.description)
      expect(eRequest.sentBy).toEqual(requestBody.sentBy)
      //expect(eRequest.sentAt).toEqual(requestBody.sentAt)
     // expect(eRequest.senttoID).toEqual(requestBody.senttoID)
    //  expect(eRequest.sentByID).toEqual(requestBody.sentByID)
      expect(new String(eRequest.senttoID)).toEqual(requestBody.senttoID)
      expect(new String(eRequest.sentByID)).toEqual(requestBody.sentByID)
      this.sharedState.sentto =  eRequest.sentto
      this.sharedState.description =  eRequest.description
      this.sharedState.sentBy =  eRequest.sentBy
      this.sharedState.sentAt =  eRequest.sentAt
      this.sharedState.senttoID =  eRequest.senttoID
      this.sharedState.sentByID =  eRequest.sentByID
      
    })
  } postRequestFail () {
    const requestBody = {
      sentto:"karim",
      description:"ay haga ",
      sentBy:"hisham",
      sentAt:"19",
      senttoID:"5c93d983f3fe6358b41ccd7a",
      sentByID:"5c96711e683cf704874a3052"
    }

    test(`post ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response status: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      // expect(Object.keys(jsonResponse)).toEqual([error])
      expect(response.status).toEqual(400)      
    })
  }
  getRequest  () {
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(response.status).toEqual(200)
  })}
  getRequestByid () {
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c78704be62b6f286cdd5418`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(response.status).toEqual(200)
  }
    )}
  putRequest  () {
    const requestBody = {
      sentto:"ahmed",
      description:"ay NELA ",
      sentBy:"hisham",
      sentAt:"2019-03-27T22:00:00.000+00:00",
      senttoID:"5c93d983f3fe6358b41ccd7a",
      sentByID:"5c96711e683cf704874a3052"
    }

    test(`put ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c78704be62b6f286cdd5418`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(['msg'])

      expect(response.status).toEqual(200)
      const eRequest = await OrientationInvitation.findOne(requestBody).exec()
      expect(eRequest.description).toEqual(requestBody.description)
    //   expect(eRequest.eventDate).toBeCloseTo(eventDate)
      expect(eRequest.sentto).toEqual(requestBody.sentto)
      expect(eRequest.description).toEqual(requestBody.description)
      expect(eRequest.sentBy).toEqual(requestBody.sentBy)
      //expect(eRequest.sentAt).toEqual(requestBody.sentAt)
     // expect(eRequest.senttoID).toEqual(requestBody.senttoID)
    //  expect(eRequest.sentByID).toEqual(requestBody.sentByID)
      expect(new String(eRequest.senttoID)).toEqual(requestBody.senttoID)
      expect(new String(eRequest.sentByID)).toEqual(requestBody.sentByID)
      this.sharedState.sentto =  eRequest.sentto
      this.sharedState.description =  eRequest.description
      this.sharedState.sentBy =  eRequest.sentBy
      this.sharedState.sentAt =  eRequest.sentAt
      this.sharedState.senttoID =  eRequest.senttoID
      this.sharedState.sentByID =  eRequest.sentByID
      this.sharedState.id=eRequest.id      
  }
    )
  }
  deleteRequest  () {
    test(`delete ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c9cdbfdb20a5c2184aa25e2`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(['msg','data'])
      expect(response.status).toEqual(200)
  }
    )
  }

}
module.exports = OITest
const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Admin = require('../../models/Admin') //require your model
const ObjectId = require('mongoose');

class ATest extends AbstractTests {
  constructor (PORT, ROUTE) {
    super(PORT, ROUTE)
    this.sharedState = {
        // enter model attributes an set them to null
            name: null,
            gender: null,
            nationality: null,
            maritalStatus: null,
            militaryStatus: null,
            drivingLicense: null,
            country: null,
            city: null,
            area: null,
            postalCode: null,
            mobileNumber: null,
            email: null,
            password: null,
            birthdate: null
    }
  }

  run() {
    super.run()
    try {
      return new Promise((resolve, reject) => {
        describe('Making sure A routes work', () => {
          //this.postRequest()
          //this.getRequest()
         // this.putRequest()
          //this.deleteRequest()
          //this.getRequestByID()
          //this.deleteRequestFailure()
          //this.putRequestFailure()
          //this.getRequestByIDFailure()
          //this.postRequestFailure()
          // add all methods

        })
        resolve()
      })
    } catch (err) {}
  }


  postRequest () {
    const requestBody = {
       // enter model attributes
            name: "mohamed",
            gender: "false",
            nationality: "egyptian",
            maritalStatus: "single",
            militaryStatus: "excempt",
            drivingLicense: "qwertyuio",
            country: "egypt",
            city: "cairo",
            area: "tagamoa",
            postalCode: "12211",
            mobileNumber: "0123456789",
            email: "asdfghjkl",
            password: "qwertyuio",
            birthdate: "1998-12-09T22:00:00.000+00:00"

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

        expect(Object.keys(jsonResponse).toString()).toEqual(['msg','data'].toString())
        expect(response.status).toEqual(200)
      const eRequest = await Admin.findOne(requestBody).exec()

      expect(eRequest.name).toEqual(requestBody.name)
      expect(eRequest.gender).toEqual(requestBody.gender)
      expect(eRequest.nationality).toEqual(requestBody.nationality)
      expect(eRequest.maritalStatus).toEqual(requestBody.maritalStatus)
      expect(eRequest.militaryStatus).toEqual(requestBody.militaryStatus)
      expect(eRequest.drivingLicense).toEqual(requestBody.drivingLicense)
      expect(eRequest.country).toEqual(requestBody.country)
      expect(eRequest.city).toEqual(requestBody.city)
      expect(eRequest.area).toEqual(requestBody.area)
      expect(eRequest.postalCode).toEqual(requestBody.postalCode)
      expect(eRequest.mobileNumber).toEqual(requestBody.mobileNumber)
      expect(eRequest.email).toEqual(requestBody.email)
      expect(eRequest.password).toEqual(requestBody.password)
      //expect(new String(eRequest.birthdate)).toEqual(requestBody.birthdate)
     // expect(eRequest.birthdate).toEqual(requestBody.birthdate)
    
      this.sharedState.name =  eRequest.name
      this.sharedState.gender =  eRequest.gender
      this.sharedState.nationality =  eRequest.nationality
      this.sharedState.maritalStatus =  eRequest.maritalStatus
      this.sharedState.militaryStatus =  eRequest.militaryStatus
      this.sharedState.drivingLicense =  eRequest.drivingLicense
      this.sharedState.country =  eRequest.country
      this.sharedState.city =  eRequest.city
      this.sharedState.area =  eRequest.area
      this.sharedState.postalCode =  eRequest.postalCode
      this.sharedState.mobileNumber =  eRequest.mobileNumber
      this.sharedState.email =  eRequest.email
      this.sharedState.password =  eRequest.password
      this.sharedState.birthdate =  eRequest.birthdate


     
      
    })
  }
  postRequestFailure() {
    const requestBody = {
       // enter model attributes
            name: "mohamed",
            gender: "false",
            nationality: "egyptian",
            maritalStatus: "single",
            militaryStatus: "excempt",
            drivingLicense: "qwertyuio",
            country: "egypt",
            city: "cairo",
            area: "tagamoa",
            postalCode: "12211",
            mobileNumber: "0123456789",
            email: "asdfghjkl",
            password: "qwertyuio",
            birthdate: "ho"

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

        expect(Object.keys(jsonResponse).toString()).toEqual(["error"].toString())
        expect(response.status).toEqual(400)
     }
     
      )}

        
  getRequest  () {
    test(`get ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse).toString()).toEqual(['data'].toString())
      expect(response.status).toEqual(200)
  }
    )}
    getRequestByID(){
      test(`get ${this.base_url}`, async () => {
        const ad = await Admin.find()
        const ad1 = ad[0]
        const adid = ad1.id
        const response = await fetch(`${this.base_url}/${adid}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
        console.log("response stastus: "+ response.status)
        const jsonResponse = await response.json()
        console.log(jsonResponse)
  
        expect(Object.keys(jsonResponse)).toEqual(['data'])
        expect(response.status).toEqual(200)
    }
      )
    }

    getRequestByIDFailure(){
      test(`get ${this.base_url}`, async () => {
        const response = await fetch(`${this.base_url}/1234567890`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
        console.log("response stastus: "+ response.status)
        const jsonResponse = await response.json()
        console.log(jsonResponse)
  
        expect(Object.keys(jsonResponse).toString()).toEqual(["error"].toString())
        expect(response.status).toEqual(404)
    }
      )
    }

  putRequest  () {const requestBody = {
    // enter model attributes
         name: "mohamed",
         gender: "false",
         nationality: "egyptian",
         maritalStatus: "single",
         militaryStatus: "excempt",
         drivingLicense: "qwertyuio",
         country: "egypt",
         city: "cairo",
         area: "tagamoa",
         postalCode: "12211",
         mobileNumber: "012345678",
         email: "asdfghjkl",
         password: "qwertyuio",
         birthdate: "1998-12-09T22:00:00.000+00:00"

 }

   test(`put ${this.base_url}`, async () => {
    const ad = await Admin.find()
    const ad1 = ad[0]
    const adid = ad1.id
     const response = await fetch(`${this.base_url}/${adid}`, {
       method: 'PUT',
       body: JSON.stringify(requestBody),
       headers: { 'Content-Type': 'application/json' }
     })
     console.log("response stastus: "+ response.status)
     const jsonResponse = await response.json()
    // console.log(jsonResponse)

     expect(Object.keys(jsonResponse).toString()).toEqual(['msg'].toString())
     expect(response.status).toEqual(200)
   const eRequest = await Admin.findOne(requestBody).exec()

   expect(eRequest.name).toEqual(requestBody.name)
   expect(eRequest.gender).toEqual(requestBody.gender)
   expect(eRequest.nationality).toEqual(requestBody.nationality)
   expect(eRequest.maritalStatus).toEqual(requestBody.maritalStatus)
   expect(eRequest.militaryStatus).toEqual(requestBody.militaryStatus)
   expect(eRequest.drivingLicense).toEqual(requestBody.drivingLicense)
   expect(eRequest.country).toEqual(requestBody.country)
   expect(eRequest.city).toEqual(requestBody.city)
   expect(eRequest.area).toEqual(requestBody.area)
   expect(eRequest.postalCode).toEqual(requestBody.postalCode)
   expect(eRequest.mobileNumber).toEqual(requestBody.mobileNumber)
   expect(eRequest.email).toEqual(requestBody.email)
   expect(eRequest.password).toEqual(requestBody.password)
   //expect(new String(eRequest.birthdate)).toEqual(requestBody.birthdate)
  // expect(eRequest.birthdate).toEqual(requestBody.birthdate)
 
   this.sharedState.name =  eRequest.name
   this.sharedState.gender =  eRequest.gender
   this.sharedState.nationality =  eRequest.nationality
   this.sharedState.maritalStatus =  eRequest.maritalStatus
   this.sharedState.militaryStatus =  eRequest.militaryStatus
   this.sharedState.drivingLicense =  eRequest.drivingLicense
   this.sharedState.country =  eRequest.country
   this.sharedState.city =  eRequest.city
   this.sharedState.area =  eRequest.area
   this.sharedState.postalCode =  eRequest.postalCode
   this.sharedState.mobileNumber =  eRequest.mobileNumber
   this.sharedState.email =  eRequest.email
   this.sharedState.password =  eRequest.password
   this.sharedState.birthdate =  eRequest.birthdate


  
   
 })
 
}
putRequestFailure  () {const requestBody = {
  // enter model attributes
       name: "mohamed",
       gender: "false",
       nationality: "egyptian",
       maritalStatus: "single",
       militaryStatus: "excempt",
       drivingLicense: "qwertyuio",
       country: "egypt",
       city: "cairo",
       area: "tagamoa",
       postalCode: "12211",
       mobileNumber: "012345678",
       email: "asdfghjkl",
       password: "qwertyuio",
       birthdate: "ho"

}

 test(`put ${this.base_url}`, async () => {
   const response = await fetch(`${this.base_url}/345678asda`, {
     method: 'PUT',
     body: JSON.stringify(requestBody),
     headers: { 'Content-Type': 'application/json' }
   })
   console.log("response stastus: "+ response.status)
   const jsonResponse = await response.json()
  // console.log(jsonResponse)
 
   expect(Object.keys(jsonResponse).toString()).toEqual(["error"].toString())
   expect(response.status).toEqual(404)
}

 )}



  deleteRequest  () {
    test(`delete ${this.base_url}`, async () => {
      const ad = await Admin.find()
      const ad1 = ad[0]
      const adid = ad1.id
      const response = await fetch(`${this.base_url}/${adid}`, {
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

  deleteRequestFailure  () {
    test(`delete ${this.base_url}`, async () => {
      const response = await fetch(`${this.base_url}/5c784be40bc82a5f186ac77`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus: "+ response.status)
      const jsonResponse = await response.json()
      console.log(jsonResponse)

      expect(Object.keys(jsonResponse)).toEqual(["error"])
      expect(response.status).toEqual(404)
  }
    )
  }


}
module.exports = ATest

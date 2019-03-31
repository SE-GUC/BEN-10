
const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
//const Admin = require('../../models/member') //require your model
const ObjectId = require('mongoose');
const Member  = require('../../models/member')

class MTest extends AbstractTests {
  constructor (PORT, ROUTE) {
    super(PORT, ROUTE)
    this.sharedState = {
      fname: null,
      mname : null,
     lname:null,
     SSN : null,
     birthdate:null,
     Gender:null,
     Nationality:null,
     Marital_status:null,
     Military_status: null,
     Driving_license: null,
     Country:null,
     City: null,
     email:null,
     password:null,
     Mobile_number:null
    }
  }

  run() {
    super.run()
    try {
      return new Promise((resolve, reject) => {
        describe('Making sure A routes work', () => {
          this.postRequest()
          this.postRequestBadRequest()
          this.getRequest()
          this.getRequestbyId()
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
      fname: "ahmed",
      mname : "mohamed",
     lname: "abdel-aal",
     SSN :12455698 ,
     birthdate:"1/1/1998",
     Gender:true,
     Nationality:"egyptian",
     Marital_status:"single",
     Military_status: "not yet",
     Driving_license: "yes",
     Country:"Egypt",
     City: "cairo",
     email:"a7med_201196@yahoo.com",
     password:"12345678AaAa",
     Mobile_number:"01119461010"
    }

    test(`post ${this.base_url}`, async (done) => {
      const response = await fetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus method 1 post: "+ response.status)
      const PostedMember = await Member.findOne(requestBody).exec()
      this.sharedState.id=PostedMember.id
      expect(response.status).toEqual(200)
      done();
    }
    )
  }
  postRequestBadRequest () {
    const requestBody = {
      fname: "ahmed",
      mname : "mohamed",
     lname: "abdel-aal",
     SSN :12455698 ,
     Gender:true,
     Marital_status:"single",
     Military_status: "not yet",
     Driving_license: "yes",
     Country:"Egypt",
     City: "cairo",
     email:"a7med_201196@yahoo.com",
     password:"12345678AaAa",
     Mobile_number:"01119461010"
    }

    test(`post ${this.base_url}`, async (done) => {
      const response = await fetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("response stastus method 2 post bad: "+ response.status)
      expect(response.status).toEqual(400)
      done();
    }
    )
  }


  getRequest  () {
    test(`get ${this.base_url}`, async (done) => {
      const response = await fetch(`${this.base_url}/`, {
        method: 'GET',
       // body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
       })
      console.log("response stastus method 3 get: "+ response.status)
      expect(response.status).toEqual(200)
      done();
     }
    )  
    }
  

  getRequestbyId  () {
    test(`get ${this.base_url}/${this.sharedState.id}`, async (done) => {
      const response = await fetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'GET',
       // body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
       })
      console.log("response stastus method 4 get by id: "+ response.status)
      expect(response.status).toEqual(200)
      done();
     }
    )  

  }
  putRequest  () {
    const requestBody = {
      fname: "ahmed 2 ",
      mname : "mohamed 2",
     lname: "abdel-aal 2",
    }
    test(`put ${this.base_url}/${this.sharedState.id}`, async (done) => {
      const response = await fetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
       })
      console.log("response stastus method 5 put: "+ response.status)
      expect(response.status).toEqual(200)
      done();
     }
    )  
  }
  deleteRequest  () {
    test(`delete ${this.base_url}/${this.sharedState.id}`, async (done) => {
      const response = await fetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'Delete',
       // body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
       })
      console.log("response stastus method 6 delete : "+ response.status)
      expect(response.status).toEqual(200)
      done();
     }
    ) 
  }



 }



module.exports = MTest
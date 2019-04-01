const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const CAs = require("../../models/ConsultancyAgency");
const Projects = require("../../models/Project");

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
         // this.postRequest()
         // this.getRequest()
         // this.putRequest()
         // this.deleteRequest()
          // add all methods
          this.DecideProject()

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

  DecideProject(){
    test(`approve a project = > put ${this.base_url}`, async (done) => {
      const projects = await Project.find()
      const project = projects[0]
      const cas = await ConsultancyAgency.find()
      const ca = cas[0]
      const caid = ca.id
      const flag = true
      console.log(caid)
      console.log(project.id)
      // console.log(project.id)
      // console.log(project.companyID)
      var requestBody={}
      console.log(`${this.base_url}/${caid}/decide/${project.id}/${flag}`)
      const response = await fetch(`${this.base_url}/${caid}/decide/${project.id}/${flag}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
       headers: { 'Content-Type': 'application/json' }
      })
    //  console.log("response stastus: "+ response.status)
    //  const jsonResponse = await response.json()
    //  if(jsonResponse.msg =='inValid inputs'||jsonResponse.msg=='Project does not exist'
    // ||jsonResponse.msg==''||jsonResponse.msg=='not a project id'){
     //   expect(response.status).toEqual(404)
    //  }
     // else{
     //   expect(response.status).toEqual(200)
    // }
      done();
  }
 
    )}
 
}
module.exports = CATest

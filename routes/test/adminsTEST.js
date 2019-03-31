const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Admin = require('../../models/admin') //require your model
const ObjectId = require('mongoose');

class ATest extends AbstractTests {
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
        //  this.postRequest()
        //  this.getRequest()
        //  this.putRequest()
        //  this.deleteRequest()
          //monda 3.4  sprint 2*/
           this. AssignCandidateToproject()
          // monda 2.7 sprint 2
           this.DecideEventRequest()
          // add all methods
          this.ViewAllApplication()

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

  
 //Monda sprint 2 =>3.4 as admin i want to assign one of the candidate who applied for a task 
 AssignCandidateToproject(){
  const aid = '5c784be40bc82a5f186ac770'; 
  const mid = '5c943ce710d91e0877f299b9' ;
  const pid = '5c9446ec609f7c5080979fdb' ;
 test(`assign one of candidates to one of the projects he applied on`,async (done)=>{
   console.log(" dakhl el test")
   const response = await fetch(`${this.base_url}/${aid}/assign/${pid}/to/${mid}`,{
     method : 'PUT', 
     body : JSON.stringify({ memberID: mid }),
     headers: { 'Content-Type': 'application/json' }
   })
   console.log("response to story 3.4 : "+response.status)
   const j = await response.json()
   console.log(j)
   if(j.msg=='invalid inputs'||j.msg=='no application found')
   expect(response.status).toEqual(404)
   else
     expect(response.status).toEqual(200)
   done();
 })

}

//Monda sprint 2 =>2.7 as admin i want to accept/reject event request
DecideEventRequest(){
  const aid = '5c784be40bc82a5f186ac770';
  const eid = '5c9ccecc81f9461d58909374';
  const flag = true;
  test('decide event request',async (done)=>{
    const response = await fetch(`${this.base_url}/${aid}/EventRequest/${eid}/${flag}`,{
      method : 'PUT',
      body :JSON.stringify({ isAccepted: flag }),
      headers: { 'Content-Type': 'application/json' }
    })
    console.log("response to story 2.7 "+response.status)
    const j = await response.json()
  // console.log(j)
  if(j.msg =='invalid inputs'||j.error=='Request does not exist'||j.error=='Event Request does not exist')
  expect(response.status).toEqual(404)
  else
   expect(response.status).toEqual(200)
    done()
  })
}
// sprint 3 => as admin i want to view all applications
ViewAllApplication(){
  const aid='5c7a603f0a4938ccd1e08e77';
  test(' view all application for an admin',async (done)=>{
    const response = await fetch(`${this.base_url}/${aid}/applications`,{
      method : 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    console.log("response to story 5"+response.status)
    const j = await response.json()
   if(j.msg =='admin not found' || j.msg =='not found')
   expect(response.status).toEqual(404)
   else
     expect(response.status).toEqual(200)
    done()
  })
}

}
module.exports = ATest

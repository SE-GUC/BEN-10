const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Admin = require('../../models/admins') //require your model
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
          this.postRequest()
          this.getRequest()
          this.putRequest()
          this.deleteRequest()
          //monda 3.4  sprint 2*/
            AssignCandidateToproject()
          // monda 2.7 sprint 2
            DecideEventRequest()
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

  
 //Monda sprint 2 =>3.4 as admin i want to assign one of the candidate who applied for a task 
 AssignCandidateToproject(){
  const aid = '5c784be40bc82a5f186ac770'; 
  const mid = '5c943ce710d91e0877f299b9' ;
  const pid = '5c9446ec609f7c5080979fdb' ;
 test(`assign one of candidates to one of the projects he applied on`,async (done)=>{
   const response = await fetch(`use${this.base_url}/${aid}/assign/${pid}/to/${mid}`,{
     method : 'PUT', 
     body : JSON.stringify({ memberID: mid }),
     headers: { 'Content-Type': 'application/json' }
   })
   console.log("response to story 3.4 : "+response.status)
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
    const response = await fetch(`"use${this.base_url}/${aid}/EventRequest/${eid}/${falg}`,{
      method : 'PUT',
      body :JSON.stringify({ isAccepted: flag }),
      headers: { 'Content-Type': 'application/json' }
    })
    console.log("response to story 2.7"+response.status)
    expect(response.status).toEqual(200)
    done(); 
  })
}
}
module.exports = Atest

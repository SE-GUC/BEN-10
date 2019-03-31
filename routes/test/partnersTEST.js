const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Admin = require('../../models/partnerInfo') //require your model
const ObjectId = require('mongoose');

class PaTest extends AbstractTests {
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
          this.sentTaskOrientationInvitation()
          this.cancelProject()

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
sentTaskOrientationInvitation(){
  const partnerid='5c786899f8a8e026447d212f';
  const projectid='5c9e6b9eadb1480c0bf2f14e';
  test('send invitation for the members applying on that project',async (done)=>{
    const response = await fetch(`${this.base_url}/${partnerid}/sendOrientationInvitations/${projectid}`,{
      method : 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    console.log("response to story 9"+response.status)
    const j = await response.json()
    console.log(j.msg)
   if(j.msg == ('Task Orientations are sent successfully')){
    expect(response.status).toEqual(200)
  }
  else if(j.msg == ('Project has already started')
       || j.msg == ('inavalid inputs')) {
    expect(response.status).toEqual(404)
  }
  else
   expect(response.status).toEqual(400)
    done()
  })
}

cancelProject(){
  const partnerid='5c786899f8a8e026447d212f';
  const projectid='5c9446ec609f7c5080979fdb';
  test('partner cancel un posted project',async (done)=>{
    const response = await fetch(`${this.base_url}/${partnerid}/cancelproject/${projectid}`,{
      method : 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    console.log("response to story 5"+response.status)
    const j = await response.json()
    console.log(j.msg)
   if(j.msg == ('canceled and removed from array')){
    expect(response.status).toEqual(200)
  }
  else if(j.error == ('you cannot cancel this project')
       || j.error == ('this project doesnot belong to you')
       || j.error == ('invalid inputs') 
       ) {
    expect(response.status).toEqual(404)
  }
  else
   expect(response.status).toEqual(400)
    done()
  })

}

}
module.exports = PaTest
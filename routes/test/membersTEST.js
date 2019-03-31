const fetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Admin = require('../../models/Admin') //require your model
const ObjectId = require('mongoose');
const Member = require('../../models/member')
const Event = require('../../models/Event')
const server = require("../../config/config")
const Notification = require('../../models/Notification')
const Project = require('../../models/Project')
const Application = require('../../models/Application')
class MTest extends AbstractTests {
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
          this.matchSkillSetWithProjects();

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




  matchSkillSetWithProjects(){
    test(`post ${this.base_url}/memberID/recommendations`, async () => {
      const allMembers = await Member.find();
      let myMember = allMembers[0];
      var today = new Date();
      var date =
          today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
      let requestBody = {
        skill_set:["skill1","skill2"]
      };
      await fetch(`${server}/api/member/${myMember._id}`, {
        method: 'PUT',
        body:JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      });
      requestBody = {
        description:"Test description1",
        company:"Test Company",
        category:"Test Category",
        want_consultancy:false,
        posted_date:date,
        life_cycle:"InProgress",
        required_skills_set:["skill1"]

      };
      await fetch(`${server}/api/projects/`, {
        method: 'POST',
        body:JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      });
      
      
      requestBody = {
        description:"Test description2",
        company:"Test Company",
        category:"Test Category",
        want_consultancy:false,
        posted_date:date,
        life_cycle:"InProgress",
        required_skills_set:["skill1","skill2"]

      };
      await fetch(`${server}/api/projects/`, {
        method: 'POST',
        body:JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      });

      requestBody = {
        description:"Test description3",
        company:"Test Company",
        category:"Test Category",
        want_consultancy:false,
        posted_date:date,
        life_cycle:"InProgress",
        required_skills_set:["skill1","skill2","skill3"]

      };
      await fetch(`${server}/api/projects/`, {
        method: 'POST',
        body:JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await fetch(`${this.base_url}/${myMember._id}/recommendations`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const jsonResponse = await response.json();

      expect(Object.keys(jsonResponse)).toEqual(['data']);
      expect(response.status).toEqual(200);
      let flag = true;
      var i;
      var j;
      for(i = 0;i<jsonResponse.data.length;i++){
        for(j = 0;j<jsonResponse.data[i].required_skills_set.length;j++){
          if(jsonResponse.data[i].required_skills_set[j].toString()!=="skill1"&&jsonResponse.data[i].required_skills_set[j].toString()!=="skill2"){
            flag = false;
          }
        }
      }
      expect(flag).toBe(true);

    });
  }







}
module.exports = MTest
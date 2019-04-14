//  DOOOOOOODIE'S WORLD
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ContainedButtons from "./ApplyButton"



const member={
    events: [],
    projects: [],
    skillSet: [
        "SQL",
        "MERN stack"
    ],
    _id: "5caf263ccd0abb05d910fbf5",
    firstName: "Ziad",
    lastName: "abdel-aal",
    SSN: "12455698",
    birthDate: "1998-01-01T00:00:00.000Z",
    gender: true,
    nationality: "English",
    maritalStatus: "single",
    drivingLicense: true,
    country: "England",
    city: "Liverpool",
    email: "a7med_201196@yahoo.com",
    password: "12345678AaAa",
    mobileNumber: "01119461010"
  }
  const ca={
    rating: 0,
          reports: [
              "Become a professional android app developer with Android 7 Nougat by building real apps! Submit your apps to Google Play and generate revenue with Google Pay and Google Ads.",
              "Learn Android development, Java programming, and Android studio from scratch! Create fun, engaging and real world Android apps using Java that you can show to the world. Learn how to work with APIs, web services and advanced databases and a lot more from your own desk.",
              "In this tutorial, we’ll show you how to implement this common use case in an Android application. The sample app we will build first asks the user if they are the driver or the passenger. If a user is a driver, their current location will be published to a channel, updated every 5 seconds (in this sample), or however many times your app requires."
          ],
          partners: [],
          projects: [],
          events: [],
          _id: "5caf2959cd0abb05d910fbf7",
          name: "mariooma agency",
          about: "our company gives consultancy for startups of android consultancy",
          telephoneNumber: "01065538464",
          email: "mariam.bakhaty@hotmail.com",
          password: "mariooma@12345",
          location: "Egypt cairo tagmoa5",
          yearsOfExperience: 5
  }
  const project={
    requiredSkillsSet: [
      "MERN stack",
      "SQL"
  ],
  applyingCA: [],
  _id: "5caf27d8cd0abb05d910fbf6",
  description: "project to help young developpers navigate through software",
  companyId: "5c786899f8a8e026447d212f",
  category: "software",
  wantConsultancy: true,
  postedDate: "2019-04-12T00:00:00.000Z",
  estimatedEffort: "Normal",
  estimatedTime: "weekly",
  experienceLevelNeeded: "Intermediate"
  }
  
export default class ApplyOnProject extends Component{
    constructor(props){
        super(props);
        this.state={
            member_id:member._id,
            project_id:project._id

        }
    }

    render(){
        return(
            <div>
                <ContainedButtons member_id={this.state.member_id} project_id={this.state.project_id}  />
            </div>
        )
        
    }


}

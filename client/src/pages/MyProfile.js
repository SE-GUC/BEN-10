
import React, { Component } from 'react';
import fetch from "node-fetch";
import axios from "axios";
import MyProfileComponent from "../components/Profile"


class MyProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
    id: this.props.partner_id,  
    name: null,
    age: 0,
    gender: "",
    e_mail: "",
    experience_level: "",
    phone_number: "",
    events: [],
    projects: [],
    partners: []

    }
  }
  // componentDidMount(){
  //   fetch(`http://localhost:5000/api/partners/${this.state.id}`).then(res=>{
  //     return res.json()
  //   })
  //   .then(partner=>{this.setState({
  //     firstName: partner.data.firstName,
  //     name:partner.data.firstName,
  //     lastName: partner.data.lastName,
  //     SSN: partner.data.SSN,
  //     birthdate: partner.data.birthdate,
  //     gender: partner.data.gender,
  //     nationality: partner.data.nationality,
  //     maritalStatus: partner.data.maritalStatus,
  //     militaryStatus: partner.data.militaryStatus,
  //     drivingLicense: partner.data.drivingLicense,
  //     country: partner.data.country,
  //     city: partner.data.city,
  //     area: partner.data.area,
  //     postalCode: partner.data.postalCode,
  //     email: partner.data.email,
  //     password: partner.data.password,
  //     mobileNumber: partner.data.mobileNumber,
  //     alternativeMobileNumber: partner.data.alternativeMobileNumber,
  //     events: partner.data.events,
  //     projects: partner.data.projects,
  //     partners: partner.data.partners
  //   })})
  // }
  // componentDidMount(){
  //   fetch(`http://localhost:5000/api/consultancyagency/${this.state.id}`).then(res=>{
  //     return res.json()
  //   })
  //   .then(ca=>{this.setState({
  //     name: ca.data.name,
  //     about: ca.data.about,
  //     telephoneNumber: ca.data.telephoneNumber,
  //     email: ca.data.email,
  //     password: ca.data.password,
  //     location: ca.data.location,
  //     yearsOfExperience: ca.data.yearsOfExperience,
  //     rating: ca.data.rating,
  //     reports: ca.data.reports,
  //     partners: ca.data.partners,
  //     projects: ca.data.projects,
  //     events: ca.data.events
  //   })})
  // }

  componentDidMount(){
    console.log(this.state.id)
    fetch(`http://localhost:5000/api/members/${this.state.id}`).then(res=>{
      return res.json()
    })
    .then(member=>{this.setState({
      firstName: member.data.firstName,
      name:member.data.firstName,
      lastName: member.data.lastName,
      SSN: member.data.SSN,
      birthDate: member.data.birthDate,
      gender: member.data.gender,
      nationality: member.data.nationality,
      maritalStatus: member.data.maritalStatus,
      drivingLicense: member.data.drivingLicense,
      country: member.data.country,
      city: member.data.city,
      area: member.data.area,
      postalCode: member.data.postalCode,
      email: member.data.email,
      password: member.data.password,
      mobileNumber: member.data.mobileNumber,
      alternativeMobileNumber: member.data.alternativeMobileNumber,
      events: member.data.events,
      projects: member.data.projects,
      skillSet: member.data.skillSet
    })})
  }
  render(){
    if (this.state.name === null) {
      return (
        <div className="App">
          <label>Loading....</label>
        </div>
      );
    } else {
      return (
        <div className="App">

          <MyProfileComponent name ={this.state.name} 
                     age= {this.state.age}
                     gender= {this.state.gender}
                     e_mail= {this.state.e_mail}
                     experience_level= {this.state.experience_level}
                     phone_number= {this.state.phone_number}
                     events= {this.state.events}
                     projects= {this.state.projects}
                     partners= {this.state.partners}
                      />

    
      
          
        </div>
      );
    
    
  }
 
}
}

export default MyProfile;

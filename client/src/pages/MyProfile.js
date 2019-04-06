import React, { Component } from 'react';
import fetch from "node-fetch";
import axios from "axios";


class MyProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
    name: "",
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
  componentDidMount(){
    fetch('http://localhost:5000/api/partners/5c786899f8a8e026447d212f').then(res=>{
      return res.json()
    })
    .then(partner=>{this.setState({
      name: partner.data.name,
      age: partner.data.age,
      gender: partner.data.gender,
      e_mail: partner.data.e_mail,
      experience_level: partner.data.experience_level,
      phone_number: partner.data.phone_number,
      events: partner.data.events,
      projects: partner.data.projects,
      partners: partner.data.partners

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
          
    <h1> {this.state.name} </h1>
    <h1> {this.state.age} </h1>
    <h1> {this.state.gender} </h1>
    <h1> {this.state.e_mail} </h1>
    <h1> {this.state.experience_level} </h1>
    <h1> {this.state.phone_number} </h1>
    <h1> {this.state.events} </h1>
    <h1> {this.state.projects} </h1>
    <h1> {this.state.partners} </h1>
      
          
        </div>
      );
    
    
  }
 
}
}

export default MyProfile;

import React, { Component } from 'react';
import fetch from "node-fetch";
import axios from "axios";
import MyProfileComponent from "../components/Profile"


class MyProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
    id: this.props.match.params.id,  
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
  componentDidMount(){
    fetch(`http://localhost:5000/api/partners/${this.state.id}`).then(res=>{
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

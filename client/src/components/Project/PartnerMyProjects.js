import React, { Component } from 'react';
import MyProjectCard from './MyProjectCard'
// const axios = require('axios');
import TestBar from "./testBar"
import { LinearProgress } from '@material-ui/core';
const server = require("../../config");

class PartnerMyProjects extends Component {

  constructor(props){
    super(props);
    this.state = {
      Project: null,
      partnerId:this.props.id,
      filter :"all"
    }
  }
  componentDidMount(){
    fetch(`/api/partners/${this.state.partnerId}/myProjects`).then(res=>res.json())
    .then(projects=>this.setState({Project:projects.data}))
      
  }
  render() {
    if(this.state.Project===null){
        return (
            <div className="App">
            <LinearProgress/>
            </div>
          );
    }
    else{
    return (
      <div className="App">
          <TestBar projects={this.state.Project} edit={true}/>
      </div>
    );
  
}
}
}

export default PartnerMyProjects;

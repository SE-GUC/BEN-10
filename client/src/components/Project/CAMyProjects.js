import React, { Component } from 'react';
import MyProjectCard from './MyProjectCard'
// const axios = require('axios');
import TestBar from "./testBar"


class CAMyProjects extends Component {

  constructor(props){
    super(props);
    this.state = {
      Project: null,
      caId:this.props.id,
      filter :"all"
    }
  }
  componentDidMount(){
    fetch(`http://localhost:5000/api/consultancyagency/${this.state.caId}/projects`).then(res=>res.json())
    .then(projects=>this.setState({Project:projects.data}))
    
  }
  render() {
    if(this.state.Project===null){
        return (
            <div className="App">
              <label>Loading....</label>
            </div>
          );
    }
    else{
    return (
      <div className="App">
      <TestBar projects={this.state.Project}/>
      </div>
    );
  
}
}
}

export default CAMyProjects;

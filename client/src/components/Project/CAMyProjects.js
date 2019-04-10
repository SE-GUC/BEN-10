import React, { Component } from 'react';
import MyProjectCard from './MyProjectCard'
// const axios = require('axios');

class CAMyProjects extends Component {

  constructor(props){
    super(props);
    this.state = {
      Project: null,
      caId:this.props.id
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
      <h1>My Projects </h1>
      {this.state.Project.map((Project,i)=><MyProjectCard key={i} project={Project} />)}
      </div>
    );
  
}
}
}

export default CAMyProjects;

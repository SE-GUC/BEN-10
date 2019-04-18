import React, { Component } from 'react';
import MyProjectCard from './MyProjectCard'
// const axios = require('axios');
import TestBar from "./testBar"
const server = require("../../config");

class MemberMyProjects extends Component {

  constructor(props){
    super(props);
    this.state = {
      Project: null,
      memId:this.props.id,
      filter :"all"
    }
  }
  async componentDidMount(){
    console.log(this.props.id)
    await fetch(`http://localhost:5000/api/members/${this.state.memId}/myProjects`).then(res=>res.json())
    .then(projects=>this.setState({Project:projects.data}))
    
  }
  render() {
    if(this.state.Project===null){
        return (
            <div className="App">
              <label>Loading....</label>
            </div>
          );
    }else if(this.state.Project && this.state.Project.length===0){
      return (
        <div className="App">
        You Do Not Have Any Projects
        </div>
      );
    }
    else{
    return (
      <div className="App">
       <TestBar projects={this.state.Project} edit={false}/>
      </div>
    );
  
}
}
}

export default MemberMyProjects;

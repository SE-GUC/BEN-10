import React, { Component } from 'react';
import MyProjectCard from './MyProjectCard'
// const axios = require('axios');
import TestBar from "./testBar"

class MemberMyProjects extends Component {

  constructor(props){
    super(props);
    this.state = {
      Project: null,
      memId:this.props.id,
      filter :"all"
    }
  }
  componentDidMount(){
    console.log(this.props.id)
    fetch(`http://localhost:5000/api/members/${this.state.memId}/ShowMyProjects`).then(res=>res.json())
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

export default MemberMyProjects;

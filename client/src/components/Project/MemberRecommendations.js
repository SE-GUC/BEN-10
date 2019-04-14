import React, { Component } from 'react';
import MyProjectCard from './MyProjectCard'
// const axios = require('axios');

class MemberMyProjects extends Component {

  constructor(props){
    super(props);
    this.state = {
      Project: null,
      partnerId:this.props.id
    }
  }
  componentDidMount(){
    fetch(`http://localhost:5000/api/members/${this.state.partnerId}/recommendations`).then(res=>res.json())
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
      <h1>Recommendations</h1> 
       {this.state.Project.map((Project,i)=><MyProjectCard key={i} project={Project} edit={false} />)} 
      </div>
    );
  
}
}
}

export default MemberMyProjects;
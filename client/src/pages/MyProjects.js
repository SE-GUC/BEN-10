import React, { Component } from "react";
import Project from "../components/Project";
//import axios from "axios";
import { BrowserRouter  ,Route } from "react-router-dom";

class MyProjects extends Component {
  constructor(props){
    super(props)
    this.state = {
    projects: null,
    partner_id:props.partner_id
  };
}

  componentDidMount(){
    fetch(`http://localhost:5000/api/partners/${this.state.partner_id}/myProjects`).then(res=>res.json())
    .then(projects=>{
      this.setState({projects:projects.data})
  })
  }

  render() {   
    if (this.state.projects === null) {
      return (
        <div className="App">
          <label>Loading....</label>
        </div>
      );
    } else {
      return (
        <div className="App">
            {this.state.projects.map(i => (
        
           <Project project={i} key={i._id} />         
             
            ))}
          
        </div>
      );
    }
  }
}

export default MyProjects;
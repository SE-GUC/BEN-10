import React, { Component } from "react";
import Project from "../components/Project";
import axios from "axios";

import  PropTypes from 'prop-types'; 
import { BrowserRouter as Router , Route } from "react-router-dom";
import MyProjectId from './MyProjectsId';


import { BrowserRouter  ,Route } from "react-router-dom";

class MyProjects extends Component {
  constructor(props){
    super(props)
    this.state = {
    projects: null,
    partner_id:props.partner_id
  };
}

  // componentDidMount() {
  //   axios
  //     .get("http://localhost:5000/api/projects")
  //     .then(res => {
  //       return res.data;
  //     })
  //     .then(a => this.setState({ projects: a.data }));
  // }
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/projects")
      .then(res => {
        return  res.data;
        
      })
      .then(a => this.setState({ projects: a.data  }));
  // componentDidMount() {
  //   axios
  //     .get("http://localhost:5000/api/projects")
  //     .then(res => {
  //       return res.data;
  //     })
  //     .then(a => this.setState({ projects: a.data }));
  // }
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
          <ul>
            {this.state.projects.map(i => (

              <Project project={i} key={i._id}/>

              // <Project project={i} partner_id={this.state.partner_id} />
              
              <BrowserRouter>
             <Route path="/" render={(props) => <Project project={i} {...props} partner_id={this.state.partner_id} />}/>         
             </BrowserRouter>
            ))}
          </ul>
          
        </div>
      );
    }
  }
}

export default MyProjects;
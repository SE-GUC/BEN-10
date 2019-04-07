import React, { Component } from "react";
import Project from "../components/Project";
import fetch from "node-fetch";
import axios from "axios";
import  PropTypes from 'prop-types'; 
import { BrowserRouter as Router , Route } from "react-router-dom";
import MyProjectId from './MyProjectsId';


class MyProjects extends Component {
  state = {
    projects: null
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/projects")
      .then(res => {
        return  res.data;
        
      })
      .then(a => this.setState({ projects: a.data  }));
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
            ))}
          </ul>
          
        </div>
      );
    }
  }
}

export default MyProjects;

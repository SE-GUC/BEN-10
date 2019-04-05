import React, { Component } from 'react';
import './myProjects.css';
// const axios = require('axios');
class MyProjects extends Component {

  constructor(props){
    super(props);
    this.state = {
      Project: []
    }
  }
  componentDidMount(){
    fetch('http://localhost:5000/api/partners/5c786899f8a8e026447d212f/myProjects').then(res=>res.json())
    .then(projects=>this.setState({Project:projects.data}))
    
  }
  render() {
    return (
      <div className="App">
      <h1>My Projects</h1>
      <ul>
        {this.state.Project.map(Project=><li key={Project._id}>Company name:{Project.company} <br></br>
          description: {Project.description}<br></br>
          category:{Project.category}<br></br>
          want consultancy:{Project.want_consultancy}<br></br>
          posted_date: {Project.posted_date}<br></br>
          life_cycle:{Project.life_cycle}<br></br>
          <button id = 'btnShowProject' type="button"  class="btn btn-primary">View Project</button>
          </li>)
        }
      </ul>
      </div>
    );
  }
}

export default MyProjects;
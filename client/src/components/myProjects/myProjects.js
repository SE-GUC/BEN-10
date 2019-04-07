import React, { Component } from 'react';
import './myProjects.css';
import {Button,Card} from "react-bootstrap";
// import MyProjectsId from "./pages/MyProjectsId";
// const axios = require('axios');
class MyProjects extends Component {

  constructor(props){
    super(props);
    this.state = {
      Project: null,
      partnerID : props.id
    }
  }
  componentDidMount(){
    console.log(this.props.id)
    fetch(`http://localhost:5000/api/partners/${this.state.partnerID}/myProjects`).then(res=>res.json())
    .then(projects=>{
      this.setState({Project:projects.data})
  })
  }
  handleClicksz  = (x)=>{
    let path = `/MyProject/${x}`;
    this.props.history.push({
      pathname : path,
    });
  }
  render() {
    if(this.state.Project===null)
    {
      return(<div>Loading.......</div>);
    }else{
      console.log(this.state.Project)
      return (
        <div className="myProjects">
        <h1>My Projects </h1>
        <ul>
        <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Text>
    {this.state.Project.map(Project=><li key={Project._id}>Company name:{Project.company} <br></br>
    description: {Project.description}<br></br>
    category:{Project.category}<br></br>
    life_cycle:{Project.life_cycle}<br></br>
    <button onClick={this.handleClicksz(Project._id)} className = "Primary">View Project</button>
                </li>)
          }
    </Card.Text>
  </Card.Body>
   </Card>
        </ul>
        </div>
      );
    }
  }
}

export default MyProjects;


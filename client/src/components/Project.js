import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {Link } from "react-router-dom";
import axios from "axios";
import { BrowserRouter as Router , Route , withRouter } from "react-router-dom";
import MyProjectsId from '../pages/MyProjectsId';
import EditMyProject from '../pages/EditMyProject';

import ReactDOM from 'react-dom';



class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: props.project
    };
    
  }
  goToEditPage  = ()=>{
    let path = `/MyProject/edit/${this.state.project._id}`;
    this.props.history.push({
      pathname : path,
    });
  }
  handleClicksz  = ()=>{
    let path = `/myProjects/${this.state.project._id}`;
    this.props.history.push({
      pathname : path,
    });
  }
  render() {
  //  const{_id}= this.props.project._id;
    return (
      <div>
        <Card border="success" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{this.state.project.company}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">nihal</Card.Subtitle>
            <Card.Text>{this.state.project.description}</Card.Text>
            <Button variant="primary">View</Button>
            <Button onClick={this.goToEditPage}>Edit</Button>
            <Card.Title>Company name : {this.state.project.company}</Card.Title>
            <Card.Title>Category: {this.state.project.category}</Card.Title>
            <Card.Title>Life_Cycle:{this.state.project.life_cycle}</Card.Title>
            <Card.Text>Description:{this.state.project.description}</Card.Text>
            <Button onClick={this.handleClicksz} variant="primary" >View</Button>
          </Card.Body>
        </Card>
        <br />
      </div>
    );
  }
}

export default withRouter(Project);

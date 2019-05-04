
    
import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {Link } from "react-router-dom";
import axios from "axios";
import { BrowserRouter as Router , Route , withRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
const server = require("../../config");


class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: props.project,
      
    };
    
  }
  DeletePage  = ()=>{
    const requestOptions = {
      method: 'DELETE'
    };
    fetch(`https://lirtenben.herokuapp.com/api/partners/${this.state.project.companyID}/deleteProject/${this.state.project._id}` , requestOptions).then((response) => {
      return response.json();
    }).then((result) => {
      console.log(result)
      if(result.status===404)
      alert(result.error)
      if(result.status===200){
      alert(result.msg);
      }
      if(result.status===400)
      alert(result)
      else
      alert(result.msg)
    });
  }

  goToEditPage  = ()=>{
    let path = `/MyProject/edit/${this.state.project._id}`;
    this.props.history.push({
      pathname : path,
    });
  }
  handleClicksz  = ()=>{
    let path = `/Projects/${this.state.project._id}`;
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
            <Button onClick={this.goToEditPage}>Edit</Button>
            <Button variant="danger" onClick={this.DeletePage}>Delete</Button>
            <Button onClick={this.handleClicksz} variant="primary" >View</Button>
          </Card.Body>
        </Card>
        <br />
      </div>
    );
  }
}

export default withRouter(Project);


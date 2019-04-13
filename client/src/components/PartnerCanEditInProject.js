import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {Link } from "react-router-dom";
import axios from "axios";
import { BrowserRouter as Router , Route , withRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import { createHashHistory } from 'history'
export const history = createHashHistory()


class PartnerCanEditInProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: props.project
    };
    
  }

  render() {
  //  const{_id}= this.props.project._id;
    return (
      <div>
        <Card border="success" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{this.state.project.company}</Card.Title>
         description:   <Card.Text>{this.state.project.description}</Card.Text>
          Category  <Card.Text>{this.state.project.category}</Card.Text>
          life_cycle  <Card.Text>{this.state.project.life_cycle}</Card.Text>
          estimated_effort  <Card.Text>{this.state.project.estimated_effort}</Card.Text>
          estimated_time  <Card.Text>{this.state.project.estimated_time}</Card.Text>
          experience_level_needed  <Card.Text>{this.state.project.experience_level_needed}</Card.Text>
           required_skill_set <Card.Text>{this.state.project.required_skill_set}</Card.Text>

          </Card.Body>
        </Card>
        <br />
      </div>
    );
  }
}

export default withRouter(PartnerCanEditInProject);
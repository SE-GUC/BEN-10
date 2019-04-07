import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: props.project
    };
  }
  handleClicksz  = ()=>{
    let path = `/myProjects/${this.state.project._id}`;
    this.props.history.push({
      pathname : path,
    });
  }
  render() {
    return (
      <div>
        <Card border="success" style={{ width: "18rem" }}>
          <Card.Body>
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
export default Project;

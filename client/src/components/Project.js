import React, { Component } from "react";
import { Card } from "react-bootstrap";

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: props.project
    };
  }
  render() {
    return (
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{this.state.project.company}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">nihal</Card.Subtitle>
            <Card.Text>{this.state.project.description}</Card.Text>
            <Card.Link href="#">View</Card.Link>
            <Card.Link href="#">Delete</Card.Link>
          </Card.Body>
        </Card>
        <br />
      </div>
    );
  }
}
export default Project;

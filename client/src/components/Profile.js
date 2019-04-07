import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      age: props.age,
      gender: props.gender,
      e_mail: props.e_mail,
      experience_level: props.experience_level,
      phone_number: props.phone_number,
      events: props.events,
      projects: props.projects,
      partners: props.partners


    };
  }
  render() {
    return (
      <div>
        <Card border="success" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{this.state.project.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">nihal</Card.Subtitle>
            <Card.Text>{this.state.project.description}</Card.Text>
            <Button variant="primary">View</Button>
          </Card.Body>
        </Card>
        <br />
      </div>
    );
  }
}
export default Project;

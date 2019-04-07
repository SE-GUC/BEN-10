import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: props.event
    };
    
  }
  render() {
    return (
      <div>
        <Card border="success" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{this.state.event.eventType}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">H</Card.Subtitle>
            <Card.Text>{this.state.event.description}</Card.Text>
            <Button variant="primary">View</Button>
          </Card.Body>
        </Card>
        <br />
      </div>
    );
  }
}
export default Event;

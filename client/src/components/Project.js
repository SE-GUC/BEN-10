import React from "react";
import { Card, Button} from 'react-bootstrap';

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
        <Card border="success" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{this.state.project.company}</Card.Title>
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

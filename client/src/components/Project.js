import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import MyProjectsId from "../pages/MyProjectsId";
import ReactDOM from 'react-dom';

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: props.project,
      partner_id:props.partner_id
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e){
    ReactDOM.render(<MyProjectsId id={this.state.project._id} partner_id={this.state.partner_id}/>, document.getElementById('root'));

  }
  render() { 
    
   
    return (
     
      <div>
        
        <Card border="success" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{this.state.project.company}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">nihal</Card.Subtitle>
            <Card.Text>{this.state.project.description}</Card.Text>
            <Button variant="primary" onClick={this.handleClick}>View</Button>
          </Card.Body>
        </Card>
        <br />
      </div>
    );
  }
}
export default Project;

import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router , Route , withRouter } from "react-router-dom";

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
  viewProjects  = ()=>{
    let path = `/MyProjects`;
    this.props.history.push({
      pathname : path,
    });
  }

    viewEvents  = ()=>{
      let path = `/MyEvents`;
      this.props.history.push({
        pathname : path,
      });
    }
  
  render() {
    return (
      <div>
        <Card border="success" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{this.state.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{this.state.e_mail}</Card.Subtitle>
            
            <Card.Text><div>{this.state.age} <br />
             {this.state.gender} <br /> 
             {this.state.experience_level} <br /> 
             {this.state.phone_number} <br /> 
             {this.state.events} <br /> 
             {this.state.projects} <br /> 
             {this.state.partners} </div> </Card.Text>
             <Button variant="primary"
             onClick={this.viewEvents}>View Events</Button>
             <Button variant="primary"
             onClick={this.viewProjects} >View Projects</Button>
          </Card.Body>
        </Card>
        <br />
      </div>
    );
  }
}
export default withRouter(Profile);
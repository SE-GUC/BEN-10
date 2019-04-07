import React, { Component } from "react";
import { Button, Spinner,Card } from "react-bootstrap";
import ToggleDisplay from "react-toggle-display";
import "./myEvents.css";
// const axios = require('axios');
export class myEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Event: null,
      isLoaded: false,
      show: false,
      partnerID : props.id
    };
    this.onClicking = this.onClicking.bind(this);
  }
  componentDidMount() {
    fetch(
      `http://localhost:5000/api/partners/${this.state.partnerID}/ShowMyEvents`
    )
      .then(res => res.json())
      .then(events => this.setState({ Event: events.data, isLoaded: true }));
  }
  onClicking() {
    this.setState({
      show: !this.state.show
    });
    console.log("hello");
  }
  render() {
    if (this.state.isLoaded) {
      console.log(this.state.Event);
      return (
      <div className="App">
        
       
    <Card.Title text = "sucess">My Events</Card.Title>
    <ul>
            {this.state.Event.map(Event => (
               <Card bg="dark" text="white" style={{ width: '18rem' }}>
               <Card.Body>
              <li key={Event._id}>
                requestorId: {Event.requestorId}
                <br />
                requestedBy:{Event.requestedBy}
                <br />
                <ToggleDisplay if={this.state.show}>
                  eventType:{Event.eventLocation}
                  <br />
                  description: {Event.description}
                  <br />
                  remainingPlace:{Event.remainingPlace}
                  <br />
                  topics: {Event.topics}
                  <br />
                  speaker:{Event.speaker}
                  <br />
                  feedback: {Event.feedback}
                  <br />
                  topics: {Event.topics}
                  <br />
                  speaker:{Event.speaker}
                  <br />
                  feedback: {Event.feedback}
                  <br />
                  regist_start_date: {Event.regist_start_date}
                  <br />
                  regist_expiry_date:{Event.regist_expiry_date}
                  <br />
                  request_id: {Event.request_id}
                  <br />
                  eventDate: {Event.eventDate}
                  <br />
                  bookedMembers:{Event.bookedMembers}
                  <br />
                  formLink: {Event.formLink}
                  <br />
                  registPrice:{Event.registPrice}
                </ToggleDisplay>
                <Button onClick={this.onClicking} variant="primary">
              Show more
            </Button>
              </li>
              </Card.Body>
</Card>
            ))}
          </ul>
  
          
          
          {/* <button onClick={this.onClicking}></button> */}
        </div>
      );
    } else {
      return (
        <Spinner animation="grow" role="danger">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
  }
}

export default myEvents;

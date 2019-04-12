import React, { Component } from "react";
import {
  Button,
  Spinner,
  Card
} from "react-bootstrap";
import axios from "axios";
//import {withRouter} from "react-router-dom";

class feedBackSending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: null,
      owner: null,
      submitClicked: false,
      showMessage:null,
      eventId:this.props.id
    };
  }
  async sendClicked() {
    await axios
      .post(
        `http://localhost:5000/api/partners/${this.state.Owner._id}/rating/${
          this.state.items._id
        }`
      )
      .then(res => {
        console.log(res);
        return res.data;
      })
      .then(json =>
        this.setState({
          showMessage: json.data
        })
      );
        alert("Attendees are notified");


  }

  async componentDidMount() {
    await axios
      .get(`http://localhost:5000/api/events/5c93e86e61fb9b030dc88b9e`)
      .then(res => {
        console.log(res);
        return res.data;
      })
      .then(json =>
        this.setState({
          items: json.data
        })
      );
    await axios
      .get(`http://localhost:5000/api/partners/${this.state.items.requestorId}`)
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .then(json =>
        this.setState({
          Owner: json.data,
          isLoaded: true
        })
      );
  }
  returnClicked  = ()=>{
    let path = `/myProfile/${this.state.Owner._id}`;
    this.props.history.push({
      pathname : path
    });
  }
  render() {
    if (this.state.isLoaded) {
      return (
        <div>
          <Card className={"text-center"} style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Requested By: {this.state.Owner.name}</Card.Title>
              <Card.Text>Type: {this.state.items.eventType}</Card.Text>
              <Card.Text>Description: {this.state.items.description}</Card.Text>
              <Card.Text>Speaker: {this.state.items.speaker}</Card.Text>
              <Card.Text>Date: {this.state.items.eventDate}</Card.Text>
              <Button onClick={this.sendClicked.bind(this)} variant="primary">
                Send FeedBack
              </Button>
              <Button onClick={this.returnClicked.bind(this)} variant="danger">
                return to My Profile
              </Button>
            </Card.Body>
          </Card>
        </div>
      );
    } else {
      return (
        <div>
          <Card className={"text-center"} style={{ width: "32rem" }}>
            <Card.Body>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Card.Body>
          </Card>
        </div>
      );
    }
  }
}
export default (feedBackSending);

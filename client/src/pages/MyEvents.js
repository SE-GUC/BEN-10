import React, { Component } from "react";
import EventRequest from "../components/EventRequest";
import fetch from "node-fetch";
import axios from "axios";
import Project from "../components/Project";

class myEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: true,
      events: null
    };
  }

  
  componentDidUpdate() {
    if (this.state.reload) {
      axios
        .get(
          `http://localhost:5000/api/partners/${this.props.partner_id}/ShowMyEvents`
        )
        .then(res => {
          return res.data;
        })
        .then(a => this.setState({ events: a.data, reload: false }));
    }
  }

  render() {
    return (
      <div className="App">
        <EventRequest requestorId={this.props.partner_id} requestedBy={this.props.partner_name} />
      </div>
    );
  }
}

export default myEvents;

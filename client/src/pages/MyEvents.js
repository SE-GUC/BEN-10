import React, { Component } from "react";
import EventRequestForm from "../components/EventRequestForm";


class myEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: true
    };
  }

  render() {
    return (
      <div className="App">
        <EventRequestForm requestorId={this.props.partner_id} requestedBy={this.props.partner_name} />
      </div>
    );
  }
}

export default myEvents;

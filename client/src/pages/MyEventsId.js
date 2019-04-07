import React, { Component } from "react";
import FeedBackSending from "../components/feedBackSending";
import Event from "../components/viewAnEvent/viewAnEvent";
class MyEventsId extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: this.props.match.params.id
    };
  }

  render() {
    return (
      <div className="rowC">
          {" "}
          <FeedBackSending id={this.state.eventId} /><Event id={this.state.eventId} />{" "}
      </div>
    );
  }
}
export default MyEventsId;

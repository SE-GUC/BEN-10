import React, { Component } from "react";
import Event from "../components/Event";
import fetch from "node-fetch";
import axios from "axios";

class MyEvents extends Component {
  state = {
    events: null
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/events")
      .then(res => {
        return res.data;
      })
      .then(a => this.setState({ events: a.data }));
  }

  render() {
    if (this.state.events === null) {
      return (
        <div className="App">
          <label>Loading....</label>
        </div>
      );
    } else {
      return (
        <div className="App">
          <ul>
            {this.state.events.map(i => (
              <Event event={i} />
            ))}
          </ul>
          
        </div>
      );
    }
  }
}

export default MyEvents;

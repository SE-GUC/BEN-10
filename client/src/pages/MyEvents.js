import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import MyEvent from "../components/myEvents/myEvents.js";
// import fetch from "node-fetch";
// import axios from "axios";

class MyEvents extends Component {
  
  render() {
      return (
        <div className="App">
          <ul>
            {
              <MyEvent />
              }
                  
  <Button variant="Show more">Primary</Button>
  
 
          </ul>
        </div>
      );
  }
}

export default MyEvents;
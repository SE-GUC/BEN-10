import React, { Component } from "react";
import MyProject from "../components/myProjects/myProjects";
// import fetch from "node-fetch";
// import axios from "axios";

class MyProjects extends Component {
  
  render() {
      return (
        <div className="App">
          <ul>
            {
              <MyProject/>
              }
          </ul>
        </div>
      );
  }
}

export default MyProjects;

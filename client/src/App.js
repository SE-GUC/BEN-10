import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Project from "./components/Project";
import fetch from "node-fetch";
import axios from "axios";

class App extends Component {
  state = {
    projects: null
  };

  componentDidMount() {
    var bodyFormData = new FormData();
    bodyFormData.set('userName', 'Fred');
    axios({
      method: 'post',
      url: 'http://localhost:5000/api/partners/:id/addProject',
      data: bodyFormData,
      config: { headers: {'Content-Type': 'application/json' }}
      })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  render() {
    if (this.state.projects === null) {
      return (
        <div className="App">
          <label>Loading....</label>
        </div>
      );
    } else {
      // return (
      //   <div className="App">
      //     <ul>
      //       {this.state.projects.map(i => (
      //         <Project project={i} />
      //       ))}
      //     </ul>
          
      //   </div>
      // );
    }

  }
}

export default App;

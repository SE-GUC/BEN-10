import React, { Component } from "react";
 import MyProject from "../components/myProjects/myProjects";
// import fetch from "node-fetch";
// import axios from "axios";

class MyProjects extends Component {
  constructor(props){
    super(props)
    this.state={
      partnerId:props.id
    }
  }
  
  render() {
    console.log(this.state.partnerId)
      return (
        <div className="App">
          <ul>
            {
               <MyProject id={this.state.partnerId}/>
              }
          </ul>
        </div>
      );
  }
}

export default MyProjects;

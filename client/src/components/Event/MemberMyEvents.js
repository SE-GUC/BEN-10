import React, { Component } from 'react';
// const axios = require('axios');
import TestBar from "./testBar"
const server = require("../../config");

class MyEvents extends Component {

  constructor(props){
    super(props);
    this.state = {
      Event: null,
      memId:this.props.id
    }
  }
  componentDidMount(){
    console.log(this.props.id)
    fetch(`${server}/api/members/${this.state.memId}/ShowMyEvents`).then(res=>res.json())
    .then(events=>this.setState({Event:events.data}))
  }
  render() {
    if(this.state.Event===null||typeof this.state.Event!=="Undefined"||this.state.Event.length===0){
        return (
            <div className="App">
              <label>Loading....</label>
            </div>
          );
    }
    else{
    return (
      <div className="App">
      <TestBar events={this.state.Event}/>
      </div>
    );
  
}
}
}

export default MyEvents;

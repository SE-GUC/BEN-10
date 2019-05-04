import React, { Component } from 'react';
// const axios = require('axios');
import TestBar from "./testBar"
import axios from "axios"
import { LinearProgress } from '@material-ui/core';
const server = require("../../config");

class MyEvents extends Component {

  constructor(props){
    super(props);
    this.state = {
      Event: null,
      partnerId:this.props.id
    }
  }
  componentDidMount(){
    fetch(`/api/partners/${this.state.partnerId}/ShowMyEvents`).then(res=>res.json())
    .then(events=>this.setState({Event:events.data}))
    
  }
  render() {
    console.log(this.state.Event===null)
    if(this.state.Event===null||typeof this.state.Event==="Undefined"){
        return (
            <div className="App">
            <LinearProgress/>
            </div>
          );
    }
    else{
    return (
      <div className="App">
     {/* <h1>My Events </h1> 
       {this.state.Event.map((Event,i)=><MyEventCard key={i} event={Event} />)}  */}
        <TestBar events={this.state.Event}/>
      </div>
    );
  
}
}
}

export default MyEvents;

import React, { Component } from 'react';
// const axios = require('axios');
import TestBar from "./testBar"
import { LinearProgress } from '@material-ui/core';
const server = require("../../config");

class MyEvents extends Component {

  constructor(props){
    super(props);
    this.state = {
      Event: null,
      caId:this.props.id,
      
    }
    console.log(this.state.caId)
  }
  componentDidMount(){
    fetch(`${server}/api/consultancyagency/${this.state.caId}/ShowMyEvents`,{
      headers: { "Content-Type": "application/json",
      "Authorization": "bearer " + localStorage.getItem('token')
     }
    }).then(res=>res.json())
    .then(events=>this.setState({Event:events.data}))
    
  }
  render() {
    if(this.state.Event===null||typeof this.state.Event!=="Undefined"||this.state.Event.length===0){
        return (
            <div className="App">
              <LinearProgress/>
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

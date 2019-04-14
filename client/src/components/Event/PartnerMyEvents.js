import React, { Component } from 'react';
// const axios = require('axios');
import TestBar from "./testBar"
import axios from "axios"

class MyEvents extends Component {

  constructor(props){
    super(props);
    this.state = {
      Event: null,
      partnerId:this.props.id
    }
  }
  async componentDidMount(){
    await axios.get(`http://localhost:5000/api/partners/${this.state.partnerId}/ShowMyEvents`).
    then(res=>{
      this.setState({Event:res.data.data})
  })
  console.log(this.state.Event)
  }
  render() {
    console.log(this.state.Event===null)
    if(this.state.Event===null||typeof this.state.Event==="Undefined"||this.state.Event.length===0){
        return (
            <div className="App">
              <label>Loading....</label>
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

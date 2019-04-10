import React, { Component } from 'react';
import MyEventCard from './MyEventCard'
import myEvents from '../myEvents/myEvents';
// const axios = require('axios');

class MyEvents extends Component {

  constructor(props){
    super(props);
    this.state = {
      Event: null,
      partnerId:this.props.id
    }
  }
  componentDidMount(){
    fetch(`http://localhost:5000/api/partners/${this.state.partnerId}/ShowMyEvents`).then(res=>res.json())
    .then(events=>this.setState({Event:events.data}))
    
  }
  render() {
    if(this.state.Event===null){
        return (
            <div className="App">
              <label>Loading....</label>
            </div>
          );
    }
    else{
    return (
      <div className="App">
      <h1>My Events</h1>
      {this.state.Event.map((Event,i)=><MyEventCard key={i} event={Event} />)}
      </div>
    );
  
}
}
}

export default MyEvents;

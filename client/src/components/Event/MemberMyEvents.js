import React, { Component } from 'react';
// const axios = require('axios');
import TestBar from "./testBar"
import { LinearProgress } from '@material-ui/core';
import Axios from 'axios';
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
    Axios.get(`${server}/api/members/${this.state.memId}/ShowMyEvents`,
    {
      headers: { "Content-Type": "application/json",
      "Authorization": "bearer " + localStorage.getItem('token')
     }
    }
    )
    .then(res=>res.data)
    .then(a=>this.setState({Event:a.data}))

    // .then(events=>this.setState({Event:events.data}))
  }
  render() {

    if(this.state.Event!=null){
      return (
        <div className="App">
        <TestBar events={this.state.Event}/>
        </div>
      );
    }
    else{
      return (
         
        <div className="App">
        {console.log(this.state.Event)}
        <LinearProgress/>
        </div>
      );

    }
  

//     if(this.state.Event===null||typeof this.state.Event!=="Undefined"){
//       return (
         
//             <div className="App">
//             {console.log(this.state.Event)}
//             <LinearProgress/>
//             </div>
//           );
//     }
//     else{
//       console.log("hello")
//     return (
//       <div className="App">
//       <TestBar events={this.state.Event}/>
//       </div>
//     );
  
// }
}
}

export default MyEvents;

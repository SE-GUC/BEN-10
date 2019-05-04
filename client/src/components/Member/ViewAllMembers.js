import EachMember from './EachMember'
import React from "react";
import axios from "axios";
import { LinearProgress } from '@material-ui/core';

const server = require("../../config");

class allMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eventId : this.props.id ,
      members: null,
      isLoaded: false
    };
  }
  componentDidMount() {
    axios
      .get(`https://lirtenben.herokuapp.com/api/members/`,{
        headers: { "Content-Type": "application/json",
        "Authorization": "bearer " + localStorage.getItem('token')
       }
      })
      .then(res => {
        return res.data;
      })
      .then(a => this.setState({ members: a.data, isLoaded: true }));
  }

  render() {
    if (this.state.isLoaded) {
    return (
    <div className="App">
         {this.state.members.map((member,i) => <EachMember key={i} members={member}/> )
        
        }
    </div>
    )
}
    else return <LinearProgress/>;
  }
}
export default allMembers;
import EachCA from './EachCA'
import React from "react";
import axios from "axios";
import { LinearProgress } from '@material-ui/core';
const server = require("../../config");


class allCAs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eventId : this.props.id ,
      cas: null,
      isLoaded: false
    };
  }
  componentDidMount() {
    axios
      .get(`${server}/api/consultancyagency/`,{
        headers: { "Content-Type": "application/json",
        "Authorization": "bearer " + localStorage.getItem('token')
       }
      })
      .then(res => {
        return res.data;
      })
      .then(a => this.setState({ consultancyagency: a.data, isLoaded: true }));
  }

  render() {
    if (this.state.isLoaded) {
    return (
    <div className="App">
         {this.state.consultancyagency.map((ca,i) => <EachCA key={i} consultancyagency={ca}/> )
        
        }
    </div>
    )
}
    else return <LinearProgress/>;
  }
}
export default allCAs;
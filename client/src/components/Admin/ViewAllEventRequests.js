// DOOOOODIE'S WORLD

import React, { Component } from "react";
import EventRequest from "./EventRequest";
import Loading from "../Global/loading";
const server = require("../../config");

export default class ViewAllEventRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.admin_id,
      eventRequests: null
    };
  }
  componentDidMount() {
    fetch(`${server}/api/admins/${this.state.id}/eventRequests`)
      .then(res => {
        return res.json()
      })
      .then(result => {
          console.log(result)
        this.setState({
          eventRequests: result.data
        });
      });
  }
  render() {
    if (this.state.eventRequests) {
      return (
        <div>
          {this.state.eventRequests.map((e,i) => (
            <EventRequest key={i} body={e} admin_id={this.props.admin_id} />
          ))}
        </div>
      );
    } else {
      return <Loading />;
    }
    // return(

    //     <div>{
    //     this.state.eventRequests.map(e=>(
    //         <EventRequest body={e.data}/>

    //     ))
    //     }
    //     </div>

    // )
  }
}

import React, { Component } from "react";
import MyEvent from "../components/myEvents/myEvents"
import EventRequestForm from "../components/EventRequestForm";
class MyEvents extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          partnerID: props.partner_id,
          reload: true
        };
    }

    render(){
        return(<div> <MyEvent id={this.state.partnerID}/>
               <EventRequestForm requestorId={this.props.partner_id} requestedBy={this.props.partner_name} />
               </div>);
    }
}
export default MyEvents;

import React, { Component } from "react";
import MyEvent from "../components/myEvents/myEvents"
class MyEvents extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          partnerID: props.partner_id
        };
    }

    render(){
        return(<div> <MyEvent id={this.state.partnerID}/> </div>);
    }
}
export default MyEvents;
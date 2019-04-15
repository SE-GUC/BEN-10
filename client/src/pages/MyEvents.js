import React, { Component } from "react";
import PMyEvent from "../components/Event/PartnerMyEvents"
import MMyEvent from "../components/Event/MemberMyEvents"
import CAMyEvent from "../components/Event/CAMyEvents"
const server = require("../../src/config");

class MyEvents extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            parId:this.props.user_id
        };
    }
    render(){
        return(<div> 
        <PMyEvent id={this.state.parId} />
        {/* <MMyEvent id={this.state.parId} />  */}
        {/* <CAMyEvent id={this.state.parId} />  */}
        </div>);
    }
}
export default MyEvents;
import React, { Component } from "react";
import PMyEvent from "../components/Event/PartnerMyEvents"
import MMyEvent from "../components/Event/MemberMyEvents"
import CAMyEvent from "../components/Event/CAMyEvents"
import Nav from '../components/Global/PrimarySearchAppBar'
const server = require("../../src/config");

class MyEvents extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:JSON.parse(localStorage.getItem('user')),
            type:localStorage.getItem('type'),
            parId:this.state.user._id
            };
    }
    render(){
        return(<div> 
            <Nav value={2}/>
        <PMyEvent id={this.state.parId} />
        {/* <MMyEvent id={this.state.parId} />  */}
        {/* <CAMyEvent id={this.state.parId} />  */}
        </div>);
    }
}
export default MyEvents;
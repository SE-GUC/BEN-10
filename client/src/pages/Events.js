import React, { Component } from "react";
import ExpansionPanelER from "../components/Event/ExpansionPanelER";
import ViewAllEvents from '../components/Event/ViewAllEvents'
import PMyEvent from "../components/Event/PartnerMyEvents"
import MMyEvent from "../components/Event/MemberMyEvents"
import CAMyEvent from "../components/Event/CAMyEvents"
import ViewAllEventRequests from "../components/Admin/ViewAllEventRequests"
import Nav from '../components/Global/PrimarySearchAppBar'
const server = require("../../src/config");

class Events extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        user:JSON.parse(localStorage.getItem('user')),
        type:localStorage.getItem('type'),
        reload: true
        };
    }

        
    render(){
        if(this.state.type==="admin"){
            console.log("hi")
            return(
                <div> 
                    <Nav value={2}/>
                    <ViewAllEventRequests admin_id={this.state.user._id}/>
                    <ViewAllEvents />
                </div>);   
        }
        else if(this.state.type==="partner"){
            return(
            <div> 
                <Nav value={2}/>
                <ExpansionPanelER requestorId={this.state.user._id} requestedBy={this.state.user.name} />
                <PMyEvent id={this.state.user._id} />
                <ViewAllEvents />
            </div>);            
        }
        else if(this.state.type==="member"){
            return(
                <div> 
                    <Nav value={2}/>
                    <MMyEvent id={this.state.user._id} />
                    <ViewAllEvents />
                </div>);   
        }
        else if(this.state.type==="consultancyagency"){
            return(
            <div>
                <Nav value={2}/>
                <ExpansionPanelER requestorId={this.state.user._id} requestedBy={this.state.user.name} />
                <CAMyEvent id={this.state.user._id} />
                <ViewAllEvents />
            </div>
            )
        }
        
    }
}
export default Events;

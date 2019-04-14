import React, { Component } from "react";
import ExpansionPanelER from "../components/Event/ExpansionPanelER";
import ViewAllEvents from '../components/Event/ViewAllEvents'
import PMyEvent from "../components/Event/PartnerMyEvents"
import MMyEvent from "../components/Event/MemberMyEvents"
import CAMyEvent from "../components/Event/CAMyEvents"
class Events extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          ID: props.Id,
          reload: true
        };
    }

        
    render(){
        if(this.props.type==="admin"){
            return(
                <div> 
                    <ViewAllEvents />
                </div>);   
        }
        else if(this.props.type==="partner"){
            return(
            <div> 
                <ExpansionPanelER requestorId={this.props.user._id} requestedBy={this.props.user.name} />
                <PMyEvent id={this.props.user._id} />
                <ViewAllEvents />
            </div>);            
        }
        else if(this.props.type==="member"){
            return(
                <div> 
                    <MMyEvent id={this.props.user._id} />
                    <ViewAllEvents />
                </div>);   
        }
        else if(this.props.type==="consultancyagency"){
            return(
            <div>
                <ExpansionPanelER requestorId={this.props.user._id} requestedBy={this.props.user.name} />
                <CAMyEvent id={this.props.user._id} />
                <ViewAllEvents />
            </div>
            )
        }
        
    }
}
export default Events;

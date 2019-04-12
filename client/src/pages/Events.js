import React, { Component } from "react";
import ExpansionPanelER from "../components/Event/ExpansionPanelER";
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

        }
        else if(this.props.type==="partner"){
            return(
            <div> 
                <ExpansionPanelER requestorId={this.props.user._id} requestedBy={this.props.user.name} />
            </div>);            
        }
        else if(this.props.type==="member"){
            
        }
        else if(this.props.type==="consultancyagency"){
            return(
            <div>
                <ExpansionPanelER requestorId={this.props.user._id} requestedBy={this.props.user.name} />
            </div>
            )
        }
        
    }
}
export default Events;

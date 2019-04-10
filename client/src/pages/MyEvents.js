import React, { Component } from "react";
import MyEvent from "../components/Event/CAMyEvents"
class MyEvents extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            parId:this.props.partner_id
        };
    }
    render(){
        return(<div> <MyEvent id={this.state.parId} /> </div>);
    }
}
export default MyEvents;
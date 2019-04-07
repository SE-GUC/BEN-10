import React, { Component } from "react";
import FeedBackSending from "../components/feedBackSending"
class MyEventsId extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            eventId:this.props.match.params.id
        };
    }

    render(){
        return(<div> <FeedBackSending id={this.state.eventId} /> </div>);
    }
}
export default MyEventsId;
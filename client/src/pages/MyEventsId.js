import React, { Component } from "react";

class MyEventsId extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(<div> hi :  {this.props.id} </div>);
    }
}
export default MyEventsId;
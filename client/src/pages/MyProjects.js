import React, { Component } from "react";
import MyProject from "../components/Project/CAMyProjects"
class MyProjects extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            parId:this.props.partner_id
        };
        console.log(this.props.partner_id)
    }

    render(){
        return(<div> <MyProject id={this.state.parId} /> </div>);
    }
}

export default MyProjects;
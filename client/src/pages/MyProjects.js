import React, { Component } from "react";
import MyProject from "../components/myProjects/myProjects"
class MyProjects extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          partnerId: props.partner_id
        };
        console.log(props.partner_id)
        console.log(this.state.partnerId)
    }

    render(){
        return(<div> <MyProject id={this.state.partnerId}/> </div>);
    }
}
export default MyProjects;
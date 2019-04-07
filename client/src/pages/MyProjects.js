import React, { Component } from "react";
import MyProject from "../components/myProjects/myProjects"
class MyProjects extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          projectId: props.partner_id
        };
        console.log(props.partner_id)
        console.log(this.state.projectId)
    }

    render(){
        return(<div> <MyProject id={this.state.projectId}/> </div>);
    }
}
export default MyProjects;
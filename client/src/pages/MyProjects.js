import React, { Component } from "react";
import MyProject from "../components/myProjects/myProjects"
class MyProjects extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          projectId: props.id
        };
        console.log(props.id)
        console.log(this.state.projectId)
    }

    render(){
        return(<div> <MyProject id={this.state.projectId}/> </div>);
    }
}
export default MyProjects;
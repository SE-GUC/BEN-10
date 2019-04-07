import React,{ Component } from "react";
import DeleteProjectId from "../components/DeleteProjectId"
export default class MyProjectsId extends Component{
  constructor(props){
    super(props);
    this.state={
      id:this.props.id,
      partner_id:this.props.partner_id

    }
  }
  render(){
    return (
      <DeleteProjectId  id={this.state.id} partner_id={this.state.partner_id}/>
      

    );
  }
}
import React, { Component } from 'react';
import axios from "axios";
import Project from '../components/Project';

export default class MyProjectsId extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          project:props.project

      }
    }
  
  render() {
      console.log("from my id")
      console.log(this.state.id)
      console.log(this.state.project)
    return (
      <div>
      <h1>Hiii</h1>
     <Project project={this.state.project}></Project>
      </div>
    )
  }
}

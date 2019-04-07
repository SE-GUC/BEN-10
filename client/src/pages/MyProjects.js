import React, { Component } from "react";
import Project from "../components/Project";
import axios from "axios";
import PostProjectButton from "../components/PostProjectButton";
import {Redirect} from 'react-router-dom'
import  PropTypes from 'prop-types'; 
import { BrowserRouter as Router , Route } from "react-router-dom";
import MyProjectId from './MyProjectsId';



class MyProjects extends Component {
  constructor(props){
    super(props)
    this.state = {
    projects: null,
    partner_id:props.partner_id,
      redirect: false
  };
}
  componentDidMount(){
    fetch(`http://localhost:5000/api/partners/${this.state.partner_id}/myProjects`).then(res=>res.json())
    .then(projects=>{
      this.setState({projects:projects.data})
  })
routeChange() {
    this.setState({redirect:true})

  }
 
  render() {
    const { redirect  } = this.state;

    if(redirect){
      return <Redirect to='/postProject'/>;
    }else{
    if (this.state.projects === null) {
      return (
        <div className="App">
          <label>Loading....</label>
        </div>
      );
    } else {
      return (
        <div className="App">
            {this.state.projects.map(i => (
        
           <Project project={i} key={i._id} />         
             
            ))}
      <PostProjectButton name={"Request a Project"} routeChange={this.routeChange}/>
        </div>
      );
    }
  }
}
}

export default MyProjects;
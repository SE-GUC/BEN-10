import React, { Component } from "react";
import Project from "./project";
import axios from "axios";
import {Redirect} from 'react-router-dom'
import  PropTypes from 'prop-types'; 
import { BrowserRouter as Router , Route } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import classes from 'classnames';
import ListSubheader from "@material-ui/core/ListSubheader";
import color from "@material-ui/core/colors/blueGrey";
import style from './MyProjects.css'
import { blue } from "@material-ui/core/colors";
const server = require("../../config");


class MyProjects extends Component {
  constructor(props){
    super(props)
    this.state = {
    projects: null,
    partner_id:props.user,
  };
}
  async componentDidMount(){
    if(this.props.type === "partner"){
    await axios.get(`${server}/api/partners/${this.state.partner_id}/myProjects`,{
      headers: { "Content-Type": "application/json",
      "Authorization": "bearer " + localStorage.getItem('token')
     }
    })
    .then(res => {
      return res.data; 
    })
  .then(projects=>{
      this.setState({projects:projects.data})
  })}
  if(this.props.type === "consultancyagency"){
    await axios.get(`${server}/api/consultancyagency/${this.props.user._id}/myProjects`,{
      headers: { "Content-Type": "application/json",
      "Authorization": "bearer " + localStorage.getItem('token')
     }
    })
    .then(res => {
      return res.data; 
    })
  .then(projects=>{
      this.setState({projects:projects.data})
  })}
  if(this.props.type === "admin"){
    await axios.get(`${server}/api/projects/`,{
      headers: { "Content-Type": "application/json",
      "Authorization": "bearer " + localStorage.getItem('token')
     }
    })
    .then(res => {
      return res.data; 
    })
  .then(projects=>{
      this.setState({projects:projects.data})
  })}
  if(this.props.type === "member"){
    await axios.get(`${server}/api/members/${this.props.user._id}/myProjects`,{
      headers: { "Content-Type": "application/json",
      "Authorization": "bearer " + localStorage.getItem('token')
     }
    })
    .then(res => {
      return res.data; 
    })
  .then(projects=>{
      this.setState({projects:projects.data})
  })}
}
 
  render() {
    
    if (this.state.projects == null) {
      return (
        <div className="App">
          <ListSubheader component="div">
                    You don't have any projects
    </ListSubheader>
        </div>
      );
    } else {
      return (
        <div className={classes(classes.layout, classes.cardGrid)} class="container">
            
        <Grid container spacing={24} style={{padding: 24}}>
            {this.state.projects.map(i => (    
              <Grid item xs={12} sm={6} lg={4} xl={3} style={{backgroundColor:"white"}}>
                <Project type= {this.props.type} user={this.props.user} project={i} key={i._id} />
                </Grid> 
                
                )) }
            </Grid>
          
        </div>
      );
    }
  
}
}

export default MyProjects;
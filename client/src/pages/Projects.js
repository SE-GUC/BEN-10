import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ExpansionPanelSubmitProject from "../components/Project/ExpansionPanelSubmitProject";
import ViewAllProjects from "../components/Project/ViewAllProjects";
import MyProjects from "../components/Project/MyProjects";
import PMyProject from "../components/Project/PartnerMyProjects";
import MMyProject from "../components/Project/MemberMyProjects";
import CAMyProject from "../components/Project/CAMyProjects";
import MMyRec from "../components/Project/MemberRecommendations";
import Nav from '../components/Global/PrimarySearchAppBar'
const server = require("../../src/config");

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state={
      user:JSON.parse(localStorage.getItem('user')),
      type:localStorage.getItem('type'),
      MemAllProjects:true,
      MemMyProjects:false,
      MemMyRec:false,
      CAallProj:true,
      CAmyProj:false,
      PAllProj:true,
      PSubmit:false,
      PMyProj:false

    }
  }
  handelClick1 = () =>{
    console.log("hello")
    this.setState({MemAllProjects:true})
    this.setState({MemMyRec:false})
    this.setState({MemMyProjects:false})

  }
  handelClick2 = () =>{
    this.setState({MemMyProjects:true})
    this.setState({MemAllProjects:false})
    this.setState({MemMyRec:false})

  }
  handelClick3 = () =>{
    this.setState({MemMyRec:true})
    this.setState({MemMyProjects:false})
    this.setState({MemAllProjects:false})
  }
  handelClick4 = () =>{
    this.setState({CAallProj:true})
    this.setState({CAmyProj:false})

  }
  handelClick5 = () =>{
    this.setState({CAallProj:false})
    this.setState({CAmyProj:true})

  }
  handelClick6 = () =>{
    this.setState({PAllProj:true})
    this.setState({PMyProj:false})
    this.setState({PSubmit:false})

  }
  handelClick7 = () =>{
    this.setState({PAllProj:false})
    this.setState({PMyProj:true})
    this.setState({PSubmit:false})

  }
  handelClick8 = () =>{
    this.setState({PAllProj:false})
    this.setState({PMyProj:false})
    this.setState({PSubmit:true})

  }

  render() {

    if (this.state.type === "partner") {
      return (
        <div className="App">
        <Nav value={1} />
        <div style={{width:"20%" ,height:"100vh",float:"left"}}>
        
        <List component="nav" >
      <ListItem button onClick={this.handelClick6}>
        <ListItemText primary="All Projects" />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="My Projects" onClick={this.handelClick7} />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Submit Project" onClick={this.handelClick8} />
      </ListItem> 
      <Divider/>     
    </List>
        </div>
        <div style={{width:"80%",height:"100vh",float:"right"}}>
        {(this.state.PAllProj)?<ViewAllProjects type={this.state.type} />:""}
        {(this.state.PMyProj)?<PMyProject id={this.state.user._id} />:""}
        {(this.state.PSubmit)?<ExpansionPanelSubmitProject Id={this.state.user._id} />:""}
          
          
          
          </div>
        </div>
      );
    } else if (this.state.type === "admin") {
      return (
        <div className="App">
        <Nav value={1}/>
   
        <div style={{width:"100%",height:"100vh",float:"right"}}>
          <ViewAllProjects type={this.state.type} />
          </div>
        </div>
      );
    } else if (this.state.type === "member") {
      return (
        <div className="App">
        <Nav value={1}/>
        <div style={{width:"20%" ,height:"100vh",float:"left",border:"2px solid white"}}>
        <List component="nav" >
      <ListItem button onClick={this.handelClick1}>
        <ListItemText primary="All Projects" />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="My Projects" onClick={this.handelClick2} />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Recommendations" onClick={this.handelClick3} />
      </ListItem> 
      <Divider/>     
    </List>
        </div>
        <div style={{width:"80%",height:"100vh",float:"right"}}>
        {(this.state.MemMyProjects)?<MMyProject id={this.state.user._id} />:""}
          
          {(this.state.MemMyRec)?<MMyRec id={this.state.user._id} />:""}
          
          {(this.state.MemAllProjects)?<ViewAllProjects type={this.state.type} />:""}
          
          </div>
        </div>
      );
    } else if (this.state.type === "consultancyagency") {
      return (
        <div className="App">
        <Nav value={1}/>
        <div style={{width:"20%" ,height:"100vh",float:"left"}}>
        
        <List component="nav" >
      <ListItem button onClick={this.handelClick4}>
        <ListItemText primary="All Projects" />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="My Projects" onClick={this.handelClick5} />
      </ListItem>
      <Divider/>     
    </List>
        </div>
        <div style={{width:"80%",height:"100vh",float:"right"}}>
        {(this.state.CAallProj)?<ViewAllProjects type={this.state.type} />:""}
        {(this.state.CAmyProj)?<CAMyProject id={this.state.user._id} />:""}
          
          
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
        <Nav value={1}/>
        <div style={{width:"100%",height:"100vh",float:"right"}}>
          <ViewAllProjects type={this.state.type} />
          </div>
        </div>
      );
    }
  }
}

export default Projects;

import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
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
      type:localStorage.getItem('type')
    }
  }

  render() {

    if (this.state.type === "partner") {
      return (
        <div className="App">
        <Nav value={1}/ >
          <ExpansionPanelSubmitProject Id={this.state.user._id} />
          <PMyProject id={this.state.user._id} />
          <ViewAllProjects type={this.state.type} />
        </div>
      );
    } else if (this.state.type === "admin") {
      return (
        <div className="App">
        <Nav value={1}/>
          <ViewAllProjects type={this.state.type} />
        </div>
      );
    } else if (this.state.type === "member") {
      return (
        <div className="App">
        <Nav value={1}/>
          <MMyProject id={this.state.user._id} />
          <MMyRec id={this.state.user._id} />
          <ViewAllProjects type={this.state.type} />
        </div>
      );
    } else if (this.state.type === "consultancyagency") {
      return (
        <div className="App">
        <Nav value={1}/>
          <CAMyProject id={this.state.user._id} />
          <ViewAllProjects type={this.state.type} />
        </div>
      );
    } else {
      return (
        <div className="App">
        <Nav value={1}/>
          <ViewAllProjects type={this.state.type} />
        </div>
      );
    }
  }
}

export default Projects;

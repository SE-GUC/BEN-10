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

class Projects extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.type === "partner") {
      return (
        <div className="App">
          <ExpansionPanelSubmitProject Id={this.props.user._id} />
          <PMyProject id={this.props.user._id} />
          <ViewAllProjects type={this.props.type} />
        </div>
      );
    } else if (this.props.type === "admin") {
      return (
        <div className="App">
          <ViewAllProjects type={this.props.type} />
        </div>
      );
    } else if (this.props.type === "member") {
      return (
        <div className="App">
          <MMyProject id={this.props.user._id} />
          <MMyRec id={this.props.user._id} />
          <ViewAllProjects type={this.props.type} />
        </div>
      );
    } else if (this.props.type === "consultancyagency") {
      return (
        <div className="App">
          <CAMyProject id={this.props.user._id} />
          <ViewAllProjects type={this.props.type} />
        </div>
      );
    } else {
      return (
        <div className="App">
          <ViewAllProjects type={this.props.type} />
        </div>
      );
    }
  }
}

export default Projects;

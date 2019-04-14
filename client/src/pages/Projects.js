import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ExpansionPanelSubmitProject from "../components/Project/ExpansionPanelSubmitProject";
import ViewAllProjects from "../components/Project/ViewAllProjects";
import MyProjects from "../components/Project/MyProjects";

class Projects extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.type === "partner") {
      return (
        <div className="App">
          <ExpansionPanelSubmitProject Id={this.props.user._id} />
          <MyProjects
            {...this.props}
            type={this.props.type}
            user={this.props.user._id}
          />
          <ViewAllProjects />
        </div>
      );
    } else {
      if (this.props.type === "admin") {
        return (
          <div className="App">
            <MyProjects
              {...this.props}
              type={this.props.type}
              user={this.props.user._id}
            />
          </div>
        );
      } else {
        return (
          <div className="App">
            <MyProjects
              {...this.props}
              type={this.props.type}
              user={this.props.user._id}
            />
            <ViewAllProjects />
          </div>
        );
      }
    }
  }
}

export default Projects;

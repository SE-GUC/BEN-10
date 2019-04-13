import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ExpansionPanelSubmitProject from "../components/Project/ExpansionPanelSubmitProject";

class Projects extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.type === "partner") {
      return (
        <div className="App">
          <ExpansionPanelSubmitProject Id={this.props.user._id} />
        </div>
      );
    }else{
        return <div className="App"/>
    }
  }
}

export default Projects;

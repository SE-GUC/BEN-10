import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ExpansionPanelSubmitProject from "../components/Project/ExpansionPanelSubmitProject";
import SendTaskOrientation from '../components/Project/SendTaskOrientation'

class ProjectId extends Component {
  constructor(props) {
    super(props);
    this.state={
        projectId:"5c9e4d38c420ff2ba8ed03a7"
    }
  }

  render() {
    if (this.props.type === "partner") {
      return (
        <div className="App">
          <SendTaskOrientation Id={this.props.user._id} projectId={this.state.projectId}/>
        </div>
      );
    }else{
        return <div className="App"/>
    }
  }
}

export default ProjectId;

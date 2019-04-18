import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ExpansionPanelSubmitProject from "../components/Project/ExpansionPanelSubmitProject";
import SendTaskOrientation from '../components/Project/SendTaskOrientation';
import Nav from '../components/Global/PrimarySearchAppBar'

const server = require("../../src/config");
//tobe deleted
class ProjectId extends Component {
  constructor(props) {
    super(props);
    this.state={
        projectId:"5cae5dbe9ef1de2600e06890"
    }
  }

  render() {
    if (this.props.type === "partner") {
      return (
        <div className="App">
        <Nav value={1}/>
          <SendTaskOrientation Id={this.props.user._id} projectId={this.state.projectId}/>
        </div>
      );
    }else{
        return <div className="App"/>
    }
  }
}

export default ProjectId;

import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ExpansionPanelSubmitProject from "../components/Project/ExpansionPanelSubmitProject";
import SendTaskOrientation from '../components/Project/SendTaskOrientation'
import ViewAnEvent from "../components/View_an_Event/ViewAnEvent";

class EventId extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return <ViewAnEvent user={this.props.user} type={this.props.type}/>
  }
}

export default EventId;

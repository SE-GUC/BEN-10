import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ExpansionPanelSubmitProject from "../components/Project/ExpansionPanelSubmitProject";
import SendTaskOrientation from '../components/Project/SendTaskOrientation'
import ViewAnEvent from "../components/View_an_Event/ViewAnEvent";
import Nav from '../components/Global/PrimarySearchAppBar'


class EventId extends Component {
  constructor(props) {
    super(props);
        this.state = {
           user:JSON.parse(localStorage.getItem('user')),
           type:localStorage.getItem('type')
        };
    
  }

  render() {
    return <div>
      <Nav value={2}/>
      <ViewAnEvent user={this.state.user} type={this.state.type}/></div>
  }
}

export default EventId;

import React, { Component } from "react";
import "./App.css";

import Profile from "./components/Global/Profile";
import ViewAllPartners from "./components/Partner/ViewAllPartners";
import ViewAllCAs from "./components/CA/ViewAllCAs";
import ViewAllMembers from "./components/Member/ViewAllMembers";
import EditProfile from "./components/Profile/EditProfile";
import Events from "./pages/Events";
import axios from "axios";
import EditProject from "./pages/EditProject";
import ViewProject from "./pages/ViewProject";
import { BrowserRouter, Route } from "react-router-dom";
//import ViewAndAssign from "./components/ViewApplyingMemAndAssign";
import ApproveFinalDraft from "./components/ApproveFinalDraft";
import ApproveFinalWork from "./components/ApproveFinalWork";
import SendFinalDraft from "./components/SendFinalDraft" ;
import NotifyMember from "./components/NotifyMember" ;
// import Apply from "./components/Member/ApplyProject/ApplyOnProject"
import Submit from "./components/Member/SubmitWork/FormDialogue"
// import ApplyCa from "./components/CA/ApplyOnProject"
import Event from "./components/Admin/CreateEvent"
// import Approve from "./components/Admin/ApproveRequest"
import Request from "./components/Admin/ViewAllEventRequests"
import RedirectButton from "./components/Global/RedirectButton";
import Projects from "./pages/Projects";
import ProjectId from "./pages/ProjectId";
import EventId from "./pages/EventId";

import Loading from "./components/Global/Loading";
import CreateEvent from "./components/Admin/CreateEvent";
class App extends Component {
  state = {
    user: null,
    type: null
  };
  asPartner = () => {
    axios
      .get("http://localhost:5000/api/partners/5cae3044a972db1e007da3e7")
      .then(res => {
        return res.data;
      })
      .then(a =>
        this.setState({
          user: a.data,
          type: "partner"
        })
      );
  };

  asMember = () => {
    axios
      .get("http://localhost:5000/api/members")
      .then(res => {
        return res.data;
      })
      .then(a =>
        this.setState({
          user: a.data[0],
          type: "member"
        })
      );
  };

  asAdmin = () => {
    console.log("admin");
    axios
      .get("http://localhost:5000/api/admins")
      .then(res => {
        return res.data;
      })
      .then(a => {
        this.setState({
          user: a.data[0],
          type: "admin"
        });
        console.log(a.data[0]._id);
      });
  };

  asCA = () => {
    axios
      .get("http://localhost:5000/api/consultancyagency")
      .then(res => {
        return res.data;
      })
      .then(a =>
        this.setState({
          user: a.data[0],
          type: "consultancyagency"
        })
      );
  };

  render() {
    if (this.state.user) {
      return (
        
        <BrowserRouter>
        ApproveFinalWork type = {"consultancyagency"} pid = {"5ca0ced29396d31e4854cac6"} id = {"5c79283c92334b03f4b6244f"}/>
        <ApproveFinalDraft type = {"partner"} pid = {"5cae21711c9d440000abe57b"} id = {"5cae54be1c9d440000abe582"}/>
        <SendFinalDraft pid = {"5cae21711c9d440000abe57b"} aid = {"5ca1111df1fa20462cfd3377"}/>
       <NotifyMember aid = {"5ca1111df1fa20462cfd3377"} memid = {"5cae23f81c9d440000abe57c"} pid={"5c954696e37f532ac08ecba4"}/>
      
          <Route
            exact
            path="/profile"
            render={props => (
              <Profile
                {...props}
                user={this.state.user}
                type={this.state.type}
              />
            )}
          />
          <Route
            exact
            path="/Projects"
            render={props => (
              <Projects
                {...props}
                user={this.state.user}
                type={this.state.type}
              />
            )}
          />
          <Route
            exact
            path="/Events"
            render={props => (
              <Events
                {...props}
                user={this.state.user}
                type={this.state.type}
              />
            )}
          />
          <Route
            exact
            path="/Events/:id"
            render={props => (
              <EventId
                {...props}
                user={this.state.user}
                type={this.state.type}
              />
            )}
          />

          <Route
            exact
            path="/ViewAllPartners"
            render={props => <ViewAllPartners />}
          />
          <Route exact path="/ViewAllCAs" render={props => <ViewAllCAs />} />
          <Route
            exact
            path="/ViewAllMembers"
            render={props => <ViewAllMembers />}
          />
          <Route
            exact
            path="/EditProfile"
            render={props => (
              <EditProfile
                {...props}
                type={this.state.type}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/createEvent"
            render={props => (
              <CreateEvent
                {...props}
                type={this.state.type}
                user={this.state.user}
              />
            )}
          />
          

          <Route
            exact
            path="/Projects/:id"
            render={props => (
              <ViewProject
                {...props}
                user={this.state.user}
                type={this.state.type}
              />
            )}
          />

          <Route
            exact
            path="/MyProject/edit/:id"
            render={props => (
              <EditProject
                {...props}
                type={this.state.type}
                user={this.state.user}
              />
            )}
          />
          
        </BrowserRouter>
      );
    } else {
      return (
        <>
          <Loading />
          <RedirectButton onClick={this.asAdmin} as={"Login as Admin"} />
          <RedirectButton onClick={this.asPartner} as={"Login as Partner"} />
          <RedirectButton onClick={this.asMember} as={"Login as Member"} />
          <RedirectButton onClick={this.asCA} as={"Login as CA"} />
        </>
      );
    }
  }
}

export default App;

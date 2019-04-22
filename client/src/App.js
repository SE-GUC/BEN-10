import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

import Profile from "./pages/Profile";
import ViewAllPartners from "./components/Partner/ViewAllPArtners";
import ViewAllCAs from "./components/CA/ViewAllCAs";
import ViewAllMembers from "./components/Member/ViewAllMembers";
import EditProfile from "./pages/EditProfile";
import Events from "./pages/Events";
import axios from "axios";
import EditProject from "./pages/EditProject";
import ViewProject from "./pages/ViewProject";
import Home from "./pages/Home"
import SignUp from "./components/SignUp/SignUp";
import LogIn from './components/LogIn/LogIn';
import ForgotPassword from './components/LogIn/forgotPassword';

//import ViewAndAssign from "./components/ViewApplyingMemAndAssign";

import SendFinalDraft from "./components/SendFinalDraft";
// import Apply from "./components/Member/ApplyProject/ApplyOnProject"
import Submit from "./components/Member/SubmitWork/FormDialogue";
// import ApplyCa from "./components/CA/ApplyOnProject"
import Event from "./components/Admin/CreateEvent";
// import Approve from "./components/Admin/ApproveRequest"
import Request from "./components/Admin/ViewAllEventRequests";
import RedirectButton from "./components/Global/RedirectButton";
import Projects from "./pages/Projects";
import ProjectId from "./pages/ProjectId";
import EventId from "./pages/EventId";
import Nav from './components/Global/PrimarySearchAppBar'
import MyEvent from "./components/View_an_Event/ViewAnEvent";
import Snack from "./components/View_an_Event/snackBox";

import Loading from "./components/Global/loading";
import CreateEvent from "./components/Admin/CreateEvent";

const server = require("./config");
class App extends Component {
  state = {
    user: null 
  };
  asPartner = async() => {
    await axios
      .get(`${server}/api/partners`)
      .then(res => {
        return res.data;
      })
      .then(a =>
        this.setState({
          user: a.data[0],
          type: "partner"
        })
      );
      localStorage.setItem('type',this.state.type);
      localStorage.setItem('user',JSON.stringify(this.state.user));
  };

  asMember = async () => {
    await axios
      .get(`${server}/api/members`)
      .then(res => {
        return res.data;
      })
      .then(a =>
        this.setState({
          user: a.data[0],
          type: "member"
        })  
      );
      localStorage.setItem('type',this.state.type);
      localStorage.setItem('user',JSON.stringify(this.state.user));
      var i = JSON.parse(localStorage.getItem('user'))
      console.log(i._id)
  };

  asAdmin = async () => {
    await axios
      .get(`${server}/api/admins`)
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
      localStorage.setItem('type',this.state.type);
      localStorage.setItem('user',JSON.stringify(this.state.user));
  };

  asCA = async () => {
    await axios
      .get(`${server}/api/consultancyagency`)
      .then(res => {
        return res.data;
      })
      .then(a =>
        this.setState({
          user: a.data[0],
          type: "consultancyagency"
        })
      );
      localStorage.setItem('type',this.state.type);
      localStorage.setItem('user',JSON.stringify(this.state.user));
  };

  render() {
    if (this.state.user) {
      localStorage.setItem('nav',0);
      return (
        <BrowserRouter>
          <Route
            exact
            path="/Events/:id"
            render={props => (
              <MyEvent
                {...props}
                type={this.state.type}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/Home"
            render={props => (
              <Home
                {...props}
                type={this.state.type}
                user={this.state.user}
              />
            )}
          />

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
          <Route
          exact
          path="/login"
          render={props => (
            <LogIn
            
            />
          )}
        />
        <Route
          exact
          path="/signUp"
          render={props => (
            <SignUp
            
            />
          )}
        />
        <Route
          exact
          path="/forgotPassword"
          render={props => (
            <ForgotPassword
            
            />
          )}
        />
        </BrowserRouter>
      );
    } else {
      return (
        <>
         <a href='http://localhost:5000/profile#/'>click the link and choose type</a>
          <RedirectButton onClick={this.asAdmin} as={"Login as Admin"} />
          <RedirectButton onClick={this.asPartner} as={"Login as Partner"} />
          <RedirectButton onClick={this.asMember} as={"Login as Member"} />
      <RedirectButton onClick={this.asCA} as={"Login as CA"} /> 
      {/* <SignUp></SignUp>  */}
      
      

        </>
      );
    }
  }
}

export default App;

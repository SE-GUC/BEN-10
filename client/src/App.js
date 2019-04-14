import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

import Profile from "./components/Global/Profile";
import ViewAllPartners from "./components/Partner/ViewAllPartners";
import ViewAllCAs from "./components/CA/ViewAllCAs";
import ViewAllMembers from "./components/Member/ViewAllMembers";
import EditProfile from "./components/Profile/EditProfile";
import Events from "./pages/Events";
import axios from "axios";
import EditProject from "./pages/EditProject";
import ViewProject from "./pages/ViewProject";
import RedirectButton from "./components/Global/RedirectButton";
import Projects from "./pages/Projects";
import ProjectId from "./pages/ProjectId";
import EventId from "./pages/EventId";
import MyEvent from "./components/View_an_Event/ViewAnEvent";
import Snack from "./components/View_an_Event/snackBox";

import Loading from "./components/Global/Loading";
class App extends Component {
  state = {
    user: null
  };
  asPartner = () => {
    axios
      .get("http://localhost:5000/api/partners/5cae3044a972db1e007da3e5")
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

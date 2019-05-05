import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StrangeCard from "./components/Global/StrangerProfileCard";
import Profile from "./pages/Profile";
import ViewAllPartners from "./components/Partner/ViewAllPArtners";
import ViewAllCAs from "./components/CA/ViewAllCAs";
import ViewAllMembers from "./components/Member/ViewAllMembers";
import EditProfile from "./pages/EditProfile";
import Events from "./pages/Events";
import axios from "axios";
import EditProject from "./pages/EditProject";
import ViewProject from "./pages/ViewProject";
import Home from "./pages/Home";
import SearchPage from "./components/Global/SearchPage";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import ForgotPassword from "./components/LogIn/forgotPassword";
import style from "./pages/home.css";
import Footer from "./components/Global/Footer";
import PreSign from "./components/PreSign/PreSign";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
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
import Nav from "./components/Global/PrimarySearchAppBar";
import MyEvent from "./components/View_an_Event/ViewAnEvent";
import Snack from "./components/View_an_Event/snackBox";
import { Redirect } from "react-router";

import Loading from "./components/Global/loading";
import CreateEvent from "./components/Admin/CreateEvent";
import LinearProgress from "./components/Global/loading";
import LogInErrorMessage from "./components/LogIn/loginErrorMessage";
const server = require("./config");
class App extends Component {
  state = {
    user: null,
    count: 0
  };
  render() {
    localStorage.setItem("nav", 0);
    if (localStorage.getItem("token")) {
      return (
        <div>
          <BrowserRouter>
            <Switch>
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
                path="/Search"
                render={props => <SearchPage {...props} />}
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
                path="/profile/:id"
                render={props => <Profile {...props} />}
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
              <Route
                exact
                path="/ViewAllCAs"
                render={props => <ViewAllCAs />}
              />
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
              <Route exact path="/login" render={props => <LogIn />} />
              <Route
                exact
                path="/signUp/:type"
                render={props => <SignUp {...props} />}
              />
              <Route
                exact
                path="/forgotPassword"
                render={props => <ForgotPassword />}
              />
              <Route exact path="/" render={props => <PreSign />} />
              <Route exact path="/About" render={props => <About />} />
              <Route path="/" render={props => <NotFound />} /> */}
            </Switch>
          </BrowserRouter>
          <div>
            <footer
              style={{
                height: 50, // Replace with the height your footer should be
                width: "100%", // Don't change
                backgroundImage: "none",
                backgroundRepeat: "repeat",
                backgroundAttachment: "scroll",
                backgroundPosition: "0% 0%",
                position: "fixed",
                bottom: 0,
                left: 0,
                border: "2px solid white",
                backgroundColor: "white"
              }}
            >
              <div style={{ textAlign: "center" }}>
                © 2019 Copyright: Lirten CO.
                <br />
                <a href="http://localhost:3000/about">About</a>
              </div>
            </footer>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <BrowserRouter>
            <Switch>
              <Route exact path="/login" render={props => <LogIn />} />

              <Route
                exact
                path="/signUp/:type"
                render={props => <SignUp {...props} />}
              />
              <Route
                exact
                path="/forgotPassword"
                render={props => <ForgotPassword />}
              />

              <Route exact path="/" render={props => <PreSign />} />
              <Route render={props => <LogInErrorMessage />} />

              <Route path="*" component={LogInErrorMessage} />

          <Route
          
          path="*"
          component={NotFound}
        />
        </Switch>
        </BrowserRouter>
        <div >
          <footer style={{height:50, // Replace with the height your footer should be
    width: "100%", // Don't change
    backgroundImage: "none",
    backgroundRepeat: "repeat",
    backgroundAttachment: "scroll",
    backgroundPosition: "0% 0%",
    position: "fixed",
    bottom: 0,
    left: 0,
    border:"2px solid white",
    backgroundColor:"white"
  }}>
            <div style={{textAlign:"center"}}>
              © 2019 Copyright: Lirten CO.
              <br/>
              <a href="http://localhost:3000/about">About</a>
    
            </div>
          </footer>
        </div>
      </div> 
    );
  }
}
}

export default App;

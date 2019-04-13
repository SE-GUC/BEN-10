import React, { Component } from "react";
import "./App.css";
import Events from "./pages/Events";
import axios from "axios";
import MyProjects from "./pages/MyProjects";
import EditProject from "./pages/EditProject"
import ViewProject from './pages/ViewProject';

import { BrowserRouter, Route } from "react-router-dom";
import { Button } from "@material-ui/core";
import RedirectButton from "./components/Global/RedirectButton";
import Projects from "./pages/Projects";
import ProjectId from "./pages/ProjectId";

import Loading from "./components/Global/Loading";
class App extends Component {
  state = {
    user: null,
    type: null
  };
  asPartner = () => {
    axios
      .get("http://localhost:5000/api/partners")
      .then(res => {
      return res.data; 
    })
    .then(a =>
      this.setState({
        user : a.data[0],
        type:"partner"
      })
    );
  }


    
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

  render() {
    if (this.state.user) {
      return (
        <BrowserRouter>
            <Route
              exact
              path="/Events/"
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
              path="/Projects/"
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
              path="/ProjectId/:id"
              render={props => (
                <ProjectId
                  {...props}
                  user={this.state.user}
                  type={this.state.type}
                />
              )}
            />
           


                     <Route exact path="/MyProjects" render={(props) => <MyProjects {...props} type= {this.state.type} user={this.state.user._id}/>}/> 
          <Route exact path="/MyProjects/:id" render={(props) => <ViewProject {...props} type= {this.state.type}   user={this.state.user} />}/>
             <Route exact path="/MyProject/edit/:id" render={(props) => <EditProject {...props} type= {this.state.type}   user={this.state.user}/>}/>
           
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

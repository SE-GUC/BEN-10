import React, { Component } from "react";
import "./App.css";
import MyProjects from "./pages/MyProjects";
import MyEvents from "./pages/MyEvents";
import MyEventsId from "./pages/MyEventsId";
import MyProjectsId from "./pages/MyProjectsId"
import EditMyProject from "./pages/EditMyProject"
import axios from "axios";


import { BrowserRouter as Router  , Route,Redirect , withRouter } from "react-router-dom";


import MyProfile from "./pages/MyProfile";

import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";
import viewAnEvent from "./components/viewAnEvent/viewAnEvent"


class App extends Component {
  state = {
    partner_id:null,
    partner_name:null,

  }
  componentDidMount() {
    axios 
      .get("http://localhost:5000/api/partners")
      .then(res => {
        return res.data; 
      })
      .then(a =>
        this.setState({
          partner_id: a.data[0]._id,

          partner_name: a.data[0].name
        })
      );
  }

  render() {
    if (this.state.partner_id !== null) {
      return (
        <BrowserRouter>
                     <Route exact path="/MyProjects" render={(props) => <MyProjects {...props} partner_id={this.state.partner_id}/>}/> 
             <Route exact path="/MyProjects/:id" render={(props) => <MyProjectsId {...props}  partner_id={this.state.partner_id}/>}/> 
             <Route exact path="/MyProject/edit/:id" component={EditMyProject} /> 

            <Route exact path="/myEvents/:id" render={(props) => <MyEventsId {...props} partner_id={this.state.partner_id} />} />
            <Route exact path="/myEvents" render={(props) => <MyEvents {...props} partner_id={this.state.partner_id} />}/>
            <Route exact path="/myProfile/:id"render={(props) => <MyProfile {...props} partner_id={this.state.partner_id} />} />
        </BrowserRouter>
      );
    } else {
      return <div>Loading.... in app</div>;
    }
 }

}  
    export default App;

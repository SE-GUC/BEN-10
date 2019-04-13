import React, { Component } from "react";
import "./App.css";
// import MyEvents from "./pages/MyEvents";
// import MyProjects from "./pages/MyProjects";
// import MyEventsId from "./pages/MyEventsId";
// import MyProjectsId from "./pages/MyProjectsId"
// import EditMyProject from "./pages/EditMyProject"
// import PostProject from "./pages/PostProject";
import axios from "axios";

import ViewAllProjects from "./components/Project/ViewAllProjects";
import ViewAllEvents from "./components/Event/ViewAllEvents"
import Profile from "./components/Global/Profile"

import { BrowserRouter, Route } from "react-router-dom";
class App extends Component {
  state = {
    user:null,
    type:null,

  }
  componentDidMount() {
    axios 
      .get("http://localhost:5000/api/admins")
      .then(res => {
        return res.data; 
      })
      .then(a =>
        this.setState({
          user:a.data[0],
          type:"admin"
          
        })
      );
  }

  render() {
    if (this.state.user !== null) {
      return (
      <BrowserRouter>
          {/* <Route exact path="/MyProjects" render={(props) => <MyProjects {...props} partner_id={this.state.partner_id}/>}/> 
          <Route exact path="/MyProjects/:id" render={(props) => <MyProjectsId {...props} partner_id={this.state.partner_id} partner_name={this.state.partner_name} />}/>
          <Route exact path="/MyProject/edit/:id" component={EditMyProject} /> 
          <Route exact path="/myEvents/:id" render={(props) => <MyEventsId {...props} partner_id={this.state.partner_id} />} />
          <Route exact path="/myEvents" render={(props) => <MyEvents {...props} partner_id={this.state.partner_id} partner_name={this.state.partner_name} />}/>
          <Route exact path="/myProfile/:id"render={(props) => <MyProfile {...props} partner_id={this.state.partner_id} />} />
          <Route exact path="/postProject" render={(props) => <PostProject {...props} partner_id={this.state.partner_id} />}/>
          <Route exact path="/AllEvents" render={(props) => <AllEvents {...props} partner_id={this.state.partner_id} />} /> */}
          {/* <Route exact path="/ViewAllProjects" render={(props) => <ViewAllProjects {...props} partner_id={this.state.partner_id} />} /> 
          <Route exact path="/ViewAllEvents" render={(props) => <ViewAllEvents {...props} partner_id={this.state.partner_id} />} /> */}
          <Route exact path="/profile" render={(props) => <Profile {...props} user={this.state.user} type={this.state.type} />} />
        </BrowserRouter>
      );
    } else {
      return <div>Loading.... in app</div>;

    }
 }
}  
    export default App;


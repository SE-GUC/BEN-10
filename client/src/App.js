import React, { Component } from "react";
import "./App.css";
import ApplyingCAs from "./pages/ApplyingCAs";
import ApplyingMembers from "./pages/ApplyingMembers";
import CAApplyingMembers from "./pages/CAApplyingMembers";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";
class App extends Component {
  state = {
    project:null,
    project1:null,
    admin:null,
    ca: null
  }
  async componentDidMount() {
    await axios 
      .get("http://localhost:5000/api/projects/")
      .then(res => {
        return res.data; 
      })
      .then(a =>
        this.setState({
          project: a.data[0]
        })
      );
      await axios 
      .get("http://localhost:5000/api/projects/5caf27d8cd0abb05d910fbf6")
      .then(res => {
        return res.data; 
      })
      .then(a =>
        this.setState({
          project1: a.data
        })
      );
      await axios 
      .get("http://localhost:5000/api/admins")
      .then(res => {
        return res.data; 
      })
      .then(a =>
        this.setState({
          admin: a.data[0]
        })
      );
      await axios 
      .get("http://localhost:5000/api/consultancyagency/5caf2959cd0abb05d910fbf7")
      .then(res => {
        return res.data; 
      })
      .then(a =>
        this.setState({
          ca: a.data
        })
      );
  }

  render() {
    if (this.state.project !== null && this.state.admin !== null && this.state.ca !== null && this.state.project1 !== null) {
      return (
        <BrowserRouter>
                     {/* <Route exact path="/MyProjects" render={(props) => <MyProjects {...props} partner_id={this.state.partner_id}/>}/> 
          <Route exact path="/MyProjects/:id" render={(props) => <MyProjectsId {...props} partner_id={this.state.partner_id} partner_name={this.state.partner_name} />}/>
             <Route exact path="/MyProject/edit/:id" component={EditMyProject} /> 

            <Route exact path="/myEvents/:id" render={(props) => <MyEventsId {...props} partner_id={this.state.partner_id} />} />
            <Route exact path="/myEvents" render={(props) => <MyEvents {...props} partner_id={this.state.partner_id} partner_name={this.state.partner_name} />}/>
            <Route exact path="/myProfile/:id"render={(props) => <MyProfile {...props} partner_id={this.state.partner_id} />} />
                <Route exact path="/postProject" render={(props) => <PostProject {...props} partner_id={this.state.partner_id} />}/> */}
                <Route exact path="/applyingCAs" render={(props) => <ApplyingCAs {...props} project={this.state.project} admin={this.state.admin} />}/>
                <Route exact path="/CAapplyingMembers" render={(props) => <CAApplyingMembers {...props} project={this.state.project1} ca={this.state.ca} />}/>
                <Route exact path="/applyingMembers" render={(props) => <ApplyingMembers {...props} project={this.state.project1} admin={this.state.admin} />}/>
</BrowserRouter>
      );
    } else {
      return <div>Loading.... in app</div>;

    }
 }
}  
    export default App;


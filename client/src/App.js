import React, { Component } from "react";
import "./App.css";
import ApplyingCAs from "./pages/ApplyingCAs";
import PartnerApplyingCAs from "./pages/PartnerApplyingCAs";
import ApplyingMembers from "./pages/ApplyingMembers";
import CAApplyingMembers from "./pages/CAApplyingMembers";
import PartnerApplyingMembers from "./pages/PartnerApplyingMembers";
import axios from "axios";
import MyProjects from "./pages/MyProjects";
import EditProject from "./pages/EditProject"
import axios from "axios";
import ViewProject from './pages/ViewProject';

import { BrowserRouter, Route } from "react-router-dom";
class App extends Component {
  state = {
    project:null,
    project1:null,
    partner1 : null,
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
      .get("http://localhost:5000/api/projects/5cae5dbe9ef1de2600e06890")
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
      .get("http://localhost:5000/api/partners/5cae3044a972db1e007da3e7")
      .then(res => {
        return res.data; 
      })
      .then(a =>
        this.setState({
          partner1: a.data
        })
      );
      await axios 
      .get("http://localhost:5000/api/consultancyagency/5cae3045a972db1e007da3ec")
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
                <Route exact path="/PartnerApplyingCAs" render={(props) => <PartnerApplyingCAs {...props} project={this.state.project} partner={this.state.partner1} />}/>
                <Route exact path="/CAapplyingMembers" render={(props) => <CAApplyingMembers {...props} project={this.state.project1} ca={this.state.ca} />}/>
                <Route exact path="/applyingMembers" render={(props) => <ApplyingMembers {...props} project={this.state.project1} admin={this.state.admin} />}/>
                <Route exact path="/PartnerapplyingMembers" render={(props) => <PartnerApplyingMembers {...props} project={this.state.project1} partner={this.state.partner1} />}/>

                     <Route exact path="/MyProjects" render={(props) => <MyProjects {...props} partner_id={this.state.partner_id}/>}/> 
          <Route exact path="/MyProjects/:id" render={(props) => <ViewProject {...props} partner_id={this.state.partner_id} partner_name={this.state.partner_name} />}/>
             <Route exact path="/MyProject/edit/:id" render={(props) => <EditProject {...props} partner_id={this.state.partner_id} partner_name={this.state.partner_name} />}/>
           
                </BrowserRouter>
      );
    } else {
      return <div>Loading.... in app</div>;

    }
 }
}  
    export default App;


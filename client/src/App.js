import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import MyProjects from "./pages/MyProjects";
import EditProject from "./pages/EditProject"
import ViewProject from './pages/ViewProject';

import { BrowserRouter, Route } from "react-router-dom";
class App extends Component {
  state = {
    user: null,
    project:null,
    project1:null,
    partner1 : null,
    admin:null,
    ca: null, 
    type: "partner",
  }
  async componentDidMount() {
   await  axios 
    .get("http://localhost:5000/api/partners")
    .then(res => {
      return res.data; 
    })
    .then(a =>
      this.setState({
        user : a.data[0],
      })
    );



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
    if (this.state.user!==null) {
      return (
        <BrowserRouter>
                     {/* <Route exact path="/MyProjects" render={(props) => <MyProjects {...props} partner_id={this.state.partner_id}/>}/> 
          <Route exact path="/MyProjects/:id" render={(props) => <MyProjectsId {...props} partner_id={this.state.partner_id} partner_name={this.state.partner_name} />}/>
             <Route exact path="/MyProject/edit/:id" component={EditMyProject} /> 

            <Route exact path="/myEvents/:id" render={(props) => <MyEventsId {...props} partner_id={this.state.partner_id} />} />
            <Route exact path="/myEvents" render={(props) => <MyEvents {...props} partner_id={this.state.partner_id} partner_name={this.state.partner_name} />}/>
            <Route exact path="/myProfile/:id"render={(props) => <MyProfile {...props} partner_id={this.state.partner_id} />} />
                <Route exact path="/postProject" render={(props) => <PostProject {...props} partner_id={this.state.partner_id} />}/> */}

                     <Route exact path="/MyProjects" render={(props) => <MyProjects {...props} type= {this.state.type} user={this.state.user._id}/>}/> 
          <Route exact path="/MyProjects/:id" render={(props) => <ViewProject {...props} type= {this.state.type}   user={this.state.user} />}/>
             <Route exact path="/MyProject/edit/:id" render={(props) => <EditProject {...props} type= {this.state.type}   user={this.state.user}/>}/>
           
                </BrowserRouter>
      );
    } else {
      return <div>Loading.... in app</div>;

    }
 }
}  
    export default App;


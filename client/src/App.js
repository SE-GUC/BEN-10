import React, { Component } from "react";
import "./App.css";
import MyProjects from "./pages/MyProjects";
import EditProject from "./pages/EditProject"
import axios from "axios";
import ViewProject from './pages/ViewProject';

import { BrowserRouter, Route } from "react-router-dom";
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


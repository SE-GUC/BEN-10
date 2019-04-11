import React, { Component } from "react";
import "./App.css";
import MyEvents from "./pages/MyEvents";
import MyProjects from "./pages/MyProjects";
import MyEventsId from "./pages/MyEventsId";
import MyProjectsId from "./pages/MyProjectsId"
import EditMyProject from "./pages/EditMyProject"
import PostProject from "./pages/PostProject";
import axios from "axios";
import MyProfile from "./pages/MyProfile";
import { BrowserRouter, Route } from "react-router-dom";
//import ViewAndAssign from "./components/ViewApplyingMemAndAssign";
import ApproveFinalDraft from "./components/ApproveFinalDraft";
import ApproveFinalWork from "./components/ApproveFinalWork";
import SendFinalDraft from "./components/SendFinalDraft" ;

class App extends Component {
  state = {
    ca_id:null,
    ca_name:null,

  }
  componentDidMount() {
    axios 
      .get("http://localhost:5000/api/consultancyagency")
      .then(res => {
        return res.data; 
      })
      .then(a =>
        this.setState({
          ca_id: a.data[0]._id,

          ca_name: a.data[0].name
        })
      );
  }

  render() {
      return (
        //<ApproveFinalWork type = {"partner"} pid = {"5cae21711c9d440000abe57b"} id = {"5cae54be1c9d440000abe582"}/>
        //<ApproveFinalDraft type = {"partner"} pid = {"5cae21711c9d440000abe57b"} id = {"5cae54be1c9d440000abe582"}/>
        <SendFinalDraft pid = {"5cae21711c9d440000abe57b"} id = {"5ca1111df1fa20462cfd3377"}/>
      );
    

    }
 
}  
    export default App;


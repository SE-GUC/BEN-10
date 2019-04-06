import React, { Component } from "react";
import "./App.css";
import MyProjects from "./pages/MyProjects";
import { Button } from 'react-bootstrap';
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import Route  from "react-router-dom/Route";
import N from "./components/myEvents/myEvents"



class App extends Component {
  state = {
    partner_id:null,
    partner_name:null
  };
  
  componentDidMount() {
    axios.get("http://localhost:5000/api/partners")
    .then(res => {
      return res.data;
    })
    .then(a => this.setState({ partner_id: a.data[0]._id, partner_name:a.data[0].name }));
  }

  render() {
    return(<N/>);
  }
}

export default App;
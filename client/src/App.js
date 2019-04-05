import React, { Component } from "react";
import "./App.css";
import MyProjects from "./pages/MyProjects";
import MyEvents from "./pages/MyEvents";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import Route  from "react-router-dom/Route";



class App extends Component {
  state = {
    partner_id:null
  };
  
  componentDidMount() {
    axios.get("http://localhost:5000/api/partners")
    .then(res => {
      return res.data;
    })
    .then(a => this.setState({ partner_id: a.data[0]._id }));
  }

  render() {
    return (
      <Router>
        <div className="App">
        <Route path="/MyProjects" component={MyProjects}/>
        <Route path="/MyEvents" render={(props) => <MyEvents {...props} partner_id={this.state.partner_id} />}/>
        </div>
      </Router>
    );
  }
}

export default App;

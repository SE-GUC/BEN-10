import React, { Component } from "react";
import "./App.css";
import MyProjects from "./pages/MyProjects";
import MyProjectsId from "./pages/MyProjectsId";
import MyEvents from "./pages/MyEvents";
import MyEventsId from "./pages/MyEventsId";
import MyProfile from "./pages/MyProfile";

import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";
import viewAnEvent from "./components/viewAnEvent/viewAnEvent"


class App extends Component {
  state = {
    partner_id: null
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/partners")
      .then(res => {
        return res.data;
      })
      .then(a =>
        this.setState({
          partner_id: a.data[a.data.length - 1]._id,
          partner_name: a.data[0].name
        })
      );
  }

  render() {
    if (this.state.partner_id !== null) {
      return (
        <BrowserRouter>
            <Route exact path="/myEvents/:id" component={MyEventsId} />
            <Route exact path="/myEvents" render={(props) => <MyEvents {...props} partner_id={this.state.partner_id} />}/>
            <Route exact path="/myProjects/:id" component={MyProjectsId} />
            <Route exact path="/myProjects/" component={MyProjects} />
            <Route exact path="/myProfile/:id" component={MyProfile} />
        </BrowserRouter>
      );
    } else {
      return <div>Loading.... in app</div>;
    }
  }
}

export default App;

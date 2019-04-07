import React, { Component } from "react";
import "./App.css";
import MyProjects from "./pages/MyProjects";
import MyEvents from "./pages/MyEvents";
import MyEventsId from "./pages/MyEventsId";
import MyProjectsId from "./pages/MyProjectsId"
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";

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
          partner_id: a.data[0]._id,
          partner_name: a.data[0].name
        })
      );
  }

  render() {
    if (this.state.partner_id !== null) {
      console.log(this.state.partner_id)
      return (
        <BrowserRouter>
            <div className="App">
             <Route path="/myProjects/" render={(props) => <MyProjects {...props} partner_id={this.state.partner_id}/>}/> 
        </div>
            <Route exact path="/myEvents/" component={MyEvents} />
            <Route exact path="/myEvents/:id" component={MyEventsId} />
            <Route exact path="/myProjects/:id" component={MyProjectsId} />
      </BrowserRouter>
      );
    } else {
      return <div>Loading....</div>;
    }
  }
}
export default App;

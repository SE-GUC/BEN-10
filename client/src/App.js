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
import MyEvent from"./components/View_an_Event/ViewAnEvent"
import { BrowserRouter, Route } from "react-router-dom";
import Snack from './components/View_an_Event/snackBox'
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
    // if (this.state.partner_id !== null) {
      return (
        <BrowserRouter>
                     <Route exact path="/Myevent" render={(props) => <MyEvent {...props} type="admin" eventId="5c93e86e61fb9b030dc88b9e"  ownerId="5ca1111df1fa20462cfd3377"/>}/> 
        {/* <Route path="/" render={(props) =><Snack />}/> */}
        </BrowserRouter>
      );
    // } else {
    //   return <div>Loading.... in app</div>;

    }
 
}  
    export default App;


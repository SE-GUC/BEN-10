import React, { Component } from "react";
import "./App.css";
import MyEvents from "./pages/MyEvents";
//import MyProjects from "./components/Partner/ViewAllPArtners";
import ViewAllPArtners from "./components/Partner/ViewAllPartners";
import ViewAllCAs from "./components/CA/ViewAllCAs";
import ViewAllMembers from "./components/Member/ViewAllMembers";
import EditProfile from './components/Profile/EditProfile'
import MyEventsId from "./pages/MyEventsId";
import MyProjectsId from "./pages/MyProjectsId"
import EditMyProject from "./pages/EditMyProject"
import PostProject from "./pages/PostProject";
import axios from "axios";
import MyProfile from "./pages/MyProfile";
import { BrowserRouter, Route } from "react-router-dom";
class App extends Component {
  state = {
    
    user:null

  }
  componentDidMount() {
    axios 
      .get("http://localhost:5000/api/consultancyagency")
      .then(res => {
        return res.data; 
      })
      .then(a =>
        this.setState({
          user:a.data[0]
        })
      );
  }
  // componentDidMount() {
  //   axios 
  //     .get("http://localhost:5000/api/partners")
  //     .then(res => {
  //       return res.data;  
  //     })
  //     .then(a =>
  //       this.setState({
  //         user:a.data[0]
  //       })
  //     );
  // }
  // componentDidMount() {
  //   axios 
  //     .get("http://localhost:5000/api/members")
  //     .then(res => {
  //       return res.data; 
  //     })
  //     .then(a =>
  //       this.setState({
  //         user:a.data[0]
  //       })
  //     );
  // }
  // componentDidMount() {
  //   axios 
  //     .get("http://localhost:5000/api/admins")
  //     .then(res => {
  //       return res.data; 
  //     })
  //     .then(a =>
  //       this.setState({
  //         user:a.data[0]
  //       })
  //     );
  // }

  render() {
    if (this.state.user !== null) {
      return (
        <BrowserRouter>
          <Route exact path="/ViewAllPartners" render={(props) => <ViewAllPArtners />}/> 
          <Route exact path="/ViewAllCAs" render={(props) => <ViewAllCAs />}/>
          <Route exact path="/ViewAllMembers" render={(props) => <ViewAllMembers />}/>
          <Route exact path="/MyProjects/:id" render={(props) => <MyProjectsId {...props} partner_id={this.state.partner_id} partner_name={this.state.partner_name} />}/>
          {/* <Route exact path="/EditProfile" id={this.partner_id} type={"partner"} />  */}
          {/* <Route exact path="/EditProfile/:id" render={(props) => <EditProfile {...props} partner_id={this.state.partner_id} partner_name={this.state.partner_name} type={"partner"} />}/> */}
          <Route exact path="/EditProfile" render={(props) => <EditProfile {...props}  type={"consultancyAgnecy"}  partner={this.state.user} />}/>
        
          {/* <Route exact path="/EditProfile" render={(props) => <EditProfile />}/> */}
            <Route exact path="/myEvents/:id" render={(props) => <MyEventsId {...props} partner_id={this.state.partner_id} />} />
            <Route exact path="/myEvents" render={(props) => <MyEvents {...props} partner_id={this.state.partner_id} partner_name={this.state.partner_name} />}/>
            <Route exact path="/myProfile/:id"render={(props) => <MyProfile {...props} partner_id={this.state.user._id} />} />
            <Route exact path="/postProject" render={(props) => <PostProject {...props} partner_id={this.state.partner_id} />}/>
        </BrowserRouter>
      );
    } else {
      return <div>Loading.... in app</div>;

    }
 }
}  
    export default App;


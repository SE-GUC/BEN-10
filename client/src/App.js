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
import MyProjects from "./pages/MyProjects";
import EditProject from "./pages/EditProject"
import ViewProject from './pages/ViewProject';

import { BrowserRouter, Route } from "react-router-dom";
class App extends Component {
  state = {
    user: null,
    type:null
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
<<<<<<< HEAD
          user:a.data[0]
=======
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
>>>>>>> react_pulling
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
<<<<<<< HEAD
    if (this.state.user !== null) {
      return (
        <BrowserRouter>
          <Route exact path="/ViewAllPartners" render={(props) => <ViewAllPArtners />}/> 
          <Route exact path="/ViewAllCAs" render={(props) => <ViewAllCAs />}/>
          <Route exact path="/ViewAllMembers" render={(props) => <ViewAllMembers />}/>
=======
    if (this.state.user!==null) {
      return (
        <BrowserRouter>
                     {/* <Route exact path="/MyProjects" render={(props) => <MyProjects {...props} partner_id={this.state.partner_id}/>}/> 
>>>>>>> react_pulling
          <Route exact path="/MyProjects/:id" render={(props) => <MyProjectsId {...props} partner_id={this.state.partner_id} partner_name={this.state.partner_name} />}/>
          {/* <Route exact path="/EditProfile" id={this.partner_id} type={"partner"} />  */}
          {/* <Route exact path="/EditProfile/:id" render={(props) => <EditProfile {...props} partner_id={this.state.partner_id} partner_name={this.state.partner_name} type={"partner"} />}/> */}
          <Route exact path="/EditProfile" render={(props) => <EditProfile {...props}  type={"consultancyAgnecy"}  partner={this.state.user} />}/>
        
          {/* <Route exact path="/EditProfile" render={(props) => <EditProfile />}/> */}
            <Route exact path="/myEvents/:id" render={(props) => <MyEventsId {...props} partner_id={this.state.partner_id} />} />
            <Route exact path="/myEvents" render={(props) => <MyEvents {...props} partner_id={this.state.partner_id} partner_name={this.state.partner_name} />}/>
<<<<<<< HEAD
            <Route exact path="/myProfile/:id"render={(props) => <MyProfile {...props} partner_id={this.state.user._id} />} />
            <Route exact path="/postProject" render={(props) => <PostProject {...props} partner_id={this.state.partner_id} />}/>
        </BrowserRouter>
=======
            <Route exact path="/myProfile/:id"render={(props) => <MyProfile {...props} partner_id={this.state.partner_id} />} />
                <Route exact path="/postProject" render={(props) => <PostProject {...props} partner_id={this.state.partner_id} />}/> */}

                     <Route exact path="/MyProjects" render={(props) => <MyProjects {...props} type= {this.state.type} user={this.state.user._id}/>}/> 
          <Route exact path="/MyProjects/:id" render={(props) => <ViewProject {...props} type= {this.state.type}   user={this.state.user} />}/>
             <Route exact path="/MyProject/edit/:id" render={(props) => <EditProject {...props} type= {this.state.type}   user={this.state.user}/>}/>
           
                </BrowserRouter>
>>>>>>> react_pulling
      );
    } else {
      return <div>Loading.... in app</div>;

    }
 }
}  
    export default App;


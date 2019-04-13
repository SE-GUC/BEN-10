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
class App extends Component {
  state = {
    user_id:null,
    user_name:null,

  }
  // componentDidMount() {
  //   axios 
  //     .get("http://localhost:5000/api/partners")
  //     .then(res => {
  //       return res.data; 
  //     })
  //     .then(a =>
  //       this.setState({
  //         user_id: a.data[0]._id,

  //         user_name: a.data[0].name
  //       })
  //     );
  // }
  componentDidMount() {
    axios 
      .get("http://localhost:5000/api/members")
      .then(res => {
        return res.data; 
      })
      .then(a =>
        this.setState({
          user_id: a.data[0]._id,

          user_name: a.data[0].name
        })
      );
  }
  // componentDidMount() {
  //   axios 
  //     .get("http://localhost:5000/api/consultancyagency")
  //     .then(res => {
  //       return res.data; 
  //     })
  //     .then(a =>
  //       this.setState({
  //         user_id: a.data[0]._id,

  //         user_name: a.data[0].name
  //       })
  //     );
  // }

  render() {
    if (this.state.user_id !== null) {
      return (
        <BrowserRouter>
          <Route exact path="/MyProjects" render={(props) => <MyProjects {...props} user_id={this.state.user_id}/>}/> 
          <Route exact path="/MyProjects/:id" render={(props) => <MyProjectsId {...props} partner_id={this.state.partner_id} partner_name={this.state.partner_name} />}/>
             <Route exact path="/MyProject/edit/:id" component={EditMyProject} /> 
            <Route exact path="/myEvents/:id" render={(props) => <MyEventsId {...props} partner_id={this.state.partner_id} />} />
            <Route exact path="/myEvents" render={(props) => <MyEvents {...props} user_id={this.state.user_id} user_name={this.state.user_name} />}/>
            <Route exact path="/myProfile/:id"render={(props) => <MyProfile {...props} partner_id={this.state.partner_id} />} />
                <Route exact path="/postProject" render={(props) => <PostProject {...props} partner_id={this.state.partner_id} />}/>
        </BrowserRouter>
      );
    } else {
      return <div>Loading.... in app</div>;

    }
 }
}  
    export default App;


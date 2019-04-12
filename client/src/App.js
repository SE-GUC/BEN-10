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
// import Apply from "./components/Member/ApplyProject/ApplyOnProject"
// import Submit from "./components/Member/SubmitWork/FormDialogue"
// import ApplyCa from "./components/CA/ApplyOnProject"
import Event from "./components/Admin/CreateEvent"
// import Approve from "./components/Admin/ApproveRequest"
import Request from "./components/Admin/ViewAllEventRequests"
class App extends Component {
  state = {
    partner_id:null,
    partner_name:null,
    requestId:this.props.requestId,
    requestorId:this.props.requestorId,
    body:null
  }
  componentDidMount() {
    axios 
      .get("http://localhost:5000/api/admins")
      .then(res => {
        return res.data; 
      })
      .then(a =>
        this.setState({
          partner_id:a.data[0]._id
          // body:a.data[0]
        })
      );
  }

  render() {
    if (this.state.partner_id !== null) {
      console.log(this.state.partner_id)
      return (
        // <div>
        //   <h1>HELLO</h1>
        //   {/* <ApplyCa CA_id={"5caf2959cd0abb05d910fbb7"} project_id={"5caf27d8cd0abb05d910fbf6"}/> */}
        //   {/* <Submit member_id={"5caf263ccd0abb05d910fbf5"} project_id={"5caf27d8cd0abb05d910fbf6"}/> */}
        //   {/* <Apply/> */}
        // </div>
        <BrowserRouter>
            {/* <Route exact path="/" render={(props) => <Approve/> }/>   */}
            <Route exact path="/" render={(props) => <Request admin_id={this.state.partner_id}/> }/>
            <Route exact path="/MyProjects/:id" render={(props) => <MyProjectsId {...props} partner_id={this.state.partner_id} partner_name={this.state.partner_name} />}/> 
              <Route exact path="/MyProject/edit/:id" component={EditMyProject} />  

             <Route exact path="/myEvents/:id" render={(props) => <MyEventsId {...props} partner_id={this.state.partner_id} />} /> 
              <Route exact path="/myEvents" render={(props) => <MyEvents {...props} partner_id={this.state.partner_id} partner_name={this.state.partner_name} />}/> 
              <Route exact path="/myProfile/:id"render={(props) => <MyProfile {...props} partner_id={this.state.partner_id} />} /> 
                 <Route exact path="/postProject" render={(props) => <PostProject {...props} partner_id={this.state.partner_id} />}/> 
                 <Route exact path="/createEvent" render={(props) => <Event />}/>
          </BrowserRouter> 
      );
    } else {
      return <div>Loading.... in app</div>;

    }
 }
}  
    export default App;


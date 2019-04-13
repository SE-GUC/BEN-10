import React, { Component } from "react";
import PostProjectButton from "../components/PostProjectButton";
import ApplyingMembersOnProject from "../components/ApplyingMembersOnProject";
import {Redirect} from 'react-router-dom'


class ApplyingMembers extends Component {
  constructor(props) {
    super(props);
    this.routeBackChange = this.routeBackChange.bind(this);
    this.state = {
      reload: true,
      redirect: false
    };
  }
  routeBackChange() {
    this.setState({redirect:true})
  }

  render() {
    const { redirect  } = this.state;

    if(redirect){
      return <Redirect to='/myProjects'/>;
    }else{
    return (
      <div className="App">
        <ApplyingMembersOnProject project={this.props.project} admin={this.props.admin}/>
        <PostProjectButton name={"Back"} routeChange={this.routeBackChange}/>
      </div>
    );
    }
  }
}

export default ApplyingMembers;
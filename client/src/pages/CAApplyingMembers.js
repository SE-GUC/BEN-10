import React, { Component } from "react";
import PostProjectButton from "../components/PostProjectButton";
import CAApplyingMembersOnProject from "../components/CAApplyingMembersOnProject";
import {Redirect} from 'react-router-dom'


class CAApplyingMembers extends Component {
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
        <CAApplyingMembersOnProject project={this.props.project} ca={this.props.ca}/>
        <PostProjectButton name={"Back"} routeChange={this.routeBackChange}/>
      </div>
    );
    }
  }
}

export default CAApplyingMembers;
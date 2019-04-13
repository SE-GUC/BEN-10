import React, { Component } from "react";
import PostProjectButton from "../components/PostProjectButton";
import ApplyingCAsOnProject from "../components/ApplyingCAsOnProject";
import {Redirect} from 'react-router-dom'


class ApplyingCAs extends Component {
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
        <ApplyingCAsOnProject project={this.props.project} admin={this.props.admin}/>
        <PostProjectButton name={"Back"} routeChange={this.routeBackChange}/>
      </div>
    );
    }
  }
}

export default ApplyingCAs;
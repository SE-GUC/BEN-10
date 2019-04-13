import React, { Component } from "react";
import PostProjectButton from "../components/PostProjectButton";
import PartnerApplyingCAsOnProject from "../components/PartnerApplyingCAsOnProject";
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
        <PartnerApplyingCAsOnProject project={this.props.project} partner={this.props.partner}/>
        <PostProjectButton name={"Back"} routeChange={this.routeBackChange}/>
      </div>
    );
    }
  }
}

export default ApplyingCAs;
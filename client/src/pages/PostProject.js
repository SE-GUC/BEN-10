import React, { Component } from "react";
import PostProjectForm from "../components/PostProjectForm";
import PostProjectButton from "../components/PostProjectButton";
import {Redirect} from 'react-router-dom'


class PostProject extends Component {
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
        <PostProjectForm companyID={this.props.partner_id}/>
        <PostProjectButton name={"Back"} routeChange={this.routeBackChange}/>
      </div>
    );
    }
  }
}

export default PostProject;
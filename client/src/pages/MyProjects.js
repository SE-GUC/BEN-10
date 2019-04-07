import React, { Component } from "react";
import PostProjectButton from "../components/PostProjectButton";
import {Redirect} from 'react-router-dom'

class MyProjects extends Component {
  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
    this.state = {
        redirect: false,
      }
}

routeChange() {
    this.setState({redirect:true})
  }

 
  render() {
    const { redirect  } = this.state;

    if(redirect){
      return <Redirect to='/postProject'/>;
    }else{
    if (this.state.projects === null) {
      return (
        <div className="App">
          <label>Loading....</label>
        </div>
      );
    } else {
      return (
        <div className="App">
        <PostProjectButton name={"Request a Project"} routeChange={this.routeChange}/>
          
        </div>
      );
    }
  }
}
}

export default MyProjects;

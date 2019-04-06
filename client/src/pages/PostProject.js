import React, { Component } from "react";
import PostProjectForm from "../components/PostProjectForm";


class PostProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: true
    };
  }

  render() {
    return (
      <div className="App">
        <PostProjectForm companyID={this.props.partner_id}/>
      </div>
    );
  }
}

export default PostProject;
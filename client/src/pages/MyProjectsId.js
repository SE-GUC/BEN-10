import React,{ Component } from "react";
import DeleteProjectId from "../components/DeleteProjectId"
export default class MyProjectsId extends Component{
  constructor(props){
    super(props);
    this.state={
      id:this.props.id,
      partner_id:this.props.partner_id

    }
  }
  render(){
    console.log(this.state)
    return (
      <DeleteProjectId  id={this.state.id} partner_id={this.state.partner_id}/>
      

    );
  }
}

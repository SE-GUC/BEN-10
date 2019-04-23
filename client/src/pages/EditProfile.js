import React, { Component } from "react";
import Nav from '../components/Global/PrimarySearchAppBar'
import EditMyProfile from "../components/Profile/EditProfile";
const server = require("../../src/config");

class EditProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           user:JSON.parse(localStorage.getItem('user')),
           type:localStorage.getItem('type')
        };
        console.log(this.state)
               console.log("hi")
    }
    render(){
        return(<div> 
            <Nav value={0}/>
            <EditMyProfile user ={this.state.user} type={this.state.type}/>
        </div>);
    }
}
export default EditProfile;
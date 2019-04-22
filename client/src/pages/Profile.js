import React, { Component } from "react";
import Nav from '../components/Global/PrimarySearchAppBar'
import ProfileView from "../components/Global/Profile";
import styles from './Profile.css'
const server = require("../../src/config");

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:JSON.parse(localStorage.getItem('user')),
            type:localStorage.getItem('type'),
        };
    }
    render(){
        return(<div > 
            <Nav value={0}/>
            <ProfileView user={this.state.user} type={this.state.type}/>
        </div>);
    }
}
export default Profile;
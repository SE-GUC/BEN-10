import React, { Component } from "react";
import PMyProject from "../components/Project/PartnerMyProjects"
import MMyProject from "../components/Project/MemberMyProjects"
import CAMyProject from "../components/Project/CAMyProjects"
import MMyRec from "../components/Project/MemberRecommendations"
import Nav from '../components/Global/PrimarySearchAppBar'

// import Myfilter from "../components/Project/FilterProj"
const server = require("../../src/config");

class MyProjects extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:JSON.parse(localStorage.getItem('user')),
            type:localStorage.getItem('type'),
            parId:this.state.user._id
            };
        console.log(this.props.user_id)
    }

    render(){
        return(<div> 
            <Nav value={1}/>
        <PMyProject id={this.state.parId}/>
        <MMyProject id={this.state.parId}/>
        <MMyRec id={this.state.parId}/>
        {/* <CAMyProject id={this.state.parId}/> */}
        </div>);               
    }
}

export default MyProjects;
import React, { Component } from "react";
import Nav from '../components/Global/PrimarySearchAppBar'
import ProfileView from "../components/Global/Profile";
import axios from "axios";

import styles from './Profile.css'
const server = require("../../src/config");

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:JSON.parse(localStorage.getItem('user')),
            type:localStorage.getItem('type'),
            loading:false,
            flag:false
        };
    }
    async componentDidMount(){
        console.log("ay7agaaaa")
        console.log(this.props.match.params.id)
        if(typeof this.props.match.params.id !== 'undefined'){
          console.log("ay7agaaaa")
    
          this.setState({
            user: null,
            type: null
          })
          if(!this.state.flag){
          await axios.get(`http://localhost:5000/api/members/${this.props.match.params.id}`)
          .then(res =>  res.data)
          .then(user =>{
            if(user.data){
            this.setState({
              user: user.data,
              type: "member",
              flag:true
            })}}
          ).catch();
        }
        if(!this.state.flag){
        await axios
        .get(`http://localhost:5000/api/consultancyagency/${this.props.match.params.id}`)
        .then(res => {
          return res.data; 
          
        })
        .then(a => {
            if(a.data)
          this.setState({
            user: a.data,
            type: "consultancyagency",
            flag:true
          });
        }).catch();}
        if(!this.state.flag){
          await axios.get(`http://localhost:5000/api/partners/${this.props.match.params.id}`)
          .then(res => res.data)
          .then(user =>{if(user.data)
            this.setState({
              user: user.data,
              type: "partner",
              flag:true
            })}
          ).catch();
        }
    }
    this.setState({loading:true})
      };
    
    render(){
        if(this.state.loading){
            console.log(this.state.user)
        return(<div> 
            <Nav value={0}/>
            <ProfileView user={this.state.user} type={this.state.type} flag={this.state.flag}/>
        </div>);
        }   
        else{
            return<div>looading</div>
        }
    }
}
export default Profile;
import React, { Component } from "react";
import axios from "axios" ;
import { BrowserRouter as Router } from "react-router-dom";
import Route  from "react-router-dom/Route";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

class NotifyMember extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            adminID : this.props.aid ,
            memberID : this.props.memid , 
            pID : this.props.pid ,
           // open : false 
        }
    }

    notifyAccepted = () =>{
        const body = { 
            description : "You have been accepted for the project you applied for "
        }
        
        axios 
            .post(
                `http://localhost:5000/api/admins/${this.state.adminID}/notifications/${this.state.memberID}`,body
            )
    }
    notifyRejected = () => {

        axios
            .post(
                `http://localhost:5000/api/admins/${this.state.adminID}/projects/${this.state.pID}/sendRejection`
            )
    }

    render(){
        return(
            <div>
                <Button onClick = {this.notifyAccepted} variant = "outlined" color = "primary">
                    Notify Accepted Member
                </Button>
                <Button onClick = {this.notifyRejected} variant = "outlined" color = "primary">
                    Notify Rejected Member/s
                </Button>

            </div>
        )
    }

}

export default NotifyMember ; 
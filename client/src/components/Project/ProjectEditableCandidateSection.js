import React, { Component } from 'react';
import CircularProgress from '../Global/CircularIndeterminate';
import axios from "axios";
import { TextField } from '@material-ui/core';
import classNames from 'classnames';
import { Card } from "react-bootstrap";
import styles from './editableViews.css';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import SaveButton from '../Global/SaveButton';
import PartnerApplyingMembersOnProject from './PartnerApplyingMembersOnProject';
import ApplyingMembersOnProject from './ApplyingMembersOnProject';
import CAApplyingMembersOnProject from './CAApplyingMembersOnProject';

const effort = ['Low','Normal','Hard','Extreme']
const cycle=['Waiting for consultancy Agency' , 'Negotiation',
  'Final Draft' , 'Approved' , 'Canceled' , 'Posted' , 'In Progress' , 'Final Review' , 'Finished']
const expLevel = ['Fundamental Awareness','Novice','Intermediate','Advanced','Expert']
const skills=[]


export default class EditableView extends React.Component {

    constructor(props){
        super(props);
        this.state={
            projectID :props.project._id,
            userID:props.user._id,
            user:props.user,
            project : props.project,
            memberID:props.project.memberID,
            // member needed attributes
            member:null,
            memberFirstName:null,
            memberLastName:null,
            memberNationality:null,
            memberEmail:null,
            memberMobileNumber:null,

        }    
    }
    componentDidMount=async ()=>{
       
        if(this.state.project.want_consultancy === true){
            await  axios
            .get(`http://localhost:5000/api/members/${this.state.memberID}`)
            .then(res => {
                
                return  res.data;
                
            })
            .then(a => {
                this.setState({ member: a.data,
                    memberFirstName:a.data.fname +""+a.data.lname,
                    memberLastName:a.data.lname,
                    memberNationality:a.data.nationality,
                    memberEmail:a.data.email,
                    memberMobileNumber:a.data.MobileNumber,   
                })
                });  
        }

    }

    render(){
        if(this.state.member !==null){
            return(
                <div class="mainContainer">    
                <div id="ProjectAttributes">
                    <div class="headerArea"> <h1> consultancy Agency Info</h1>
                        <div class="col-9 float-left">
                            <Card>
                            <TextField
                                id="outlined-read-only-input"
                                label="Name"
                                defaultValue={this.state.memberFirstName}
                                className={classNames.textField}
                                margin="normal"
                                InputProps={{
                                readOnly: true,
                                }}
                                variant="outlined"
                            />

                            <TextField
                                id="outlined-read-only-input"
                                label="Nationality"
                                defaultValue={this.state.memberNationality}
                                className={classNames.textField}
                                margin="normal"
                                InputProps={{
                                readOnly: true,
                                }}
                                variant="outlined"
                            />

                            <TextField
                                id="outlined-read-only-input"
                                label="Email"
                                defaultValue={this.state.memberEmail}
                                className={classNames.textField}
                                margin="normal"
                                InputProps={{
                                readOnly: true,
                                }}
                                variant="outlined"
                            />

                            <TextField
                                id="outlined-read-only-input"
                                label="Telephone Number"
                                defaultValue={this.state.memberMobileNumber}
                                className={classNames.textField}
                                margin="normal"
                                InputProps={{
                                readOnly: true,
                                }}
                                variant="outlined"
                           />                              
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            
            );

        }
        else{
            if(this.props.type == "partner"){
                return(
                    <div class="mainContainer">    
                    <div id="ProjectAttributes">
                        <div class="headerArea" > <h1> consultancy Agency Info</h1>
                      <PartnerApplyingMembersOnProject project={this.state.project} partner={this.state.user}></PartnerApplyingMembersOnProject>
                    </div>
                    </div></div>
                );
            }
            if(this.props.type == "consultancy agency"){
                return(
                    <div class="mainContainer">    
                    <div id="ProjectAttributes">
                        <div class="headerArea" > <h1> consultancy Agency Info</h1>
                      <CAApplyingMembersOnProject project={this.state.project} ca={this.state.user}></CAApplyingMembersOnProject>
                    </div>
                    </div></div>
                );
            }
            if(this.props.type == "admin"){
                return(
                    <div class="mainContainer">    
                    <div id="ProjectAttributes">
                        <div class="headerArea" > <h1> consultancy Agency Info</h1>
                      <ApplyingMembersOnProject project={this.state.project} admin={this.state.user}></ApplyingMembersOnProject>
                    </div>
                    </div></div>
                );
            }
            else {
                return(
                    <div>
                    <h1>You're not allowed to see this page</h1>
                    </div>
                    );
            }
        }
    }


}
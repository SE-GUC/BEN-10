import React, { Component } from 'react';
import axios from "axios";
import { TextField } from '@material-ui/core';
import classNames from 'classnames';
import { Card } from "react-bootstrap";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from '@material-ui/core/Typography';
const server = require("../../config");

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
       
            await  axios
            .get(`${server}/api/members/${this.state.memberID}`)
            .then(res => {
                
                return  res.data;
                
            })
            .then(a => {
                this.setState({ member: a.data,
                    memberFirstName:a.data.firstName +" "+a.data.lastName,
                    memberLastName:a.data.lname,
                    memberNationality:a.data.nationality,
                    memberEmail:a.data.email,
                    memberMobileNumber:a.data.MobileNumber,   
                })
                });  
        

    }

    render(){
        if(this.state.member){
            return(
                <div class="mainContainer">    
                <div id="ProjectAttributes">
                    <div class="headerArea">
                    <br></br>

                    <Typography variant="h4" gutterBottom>
                    Member Info
      </Typography>
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
            else {
                return(
                    <div>
                    <ListSubheader component="div">
                    No members assigned
                     </ListSubheader>
                    </div>
                    );
            }
        }
    


}
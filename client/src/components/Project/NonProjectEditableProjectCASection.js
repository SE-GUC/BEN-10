import React, { Component } from 'react';
import axios from "axios";
import { TextField } from '@material-ui/core';
import classNames from 'classnames';
import { Card } from "react-bootstrap";
import Typography from '@material-ui/core/Typography';
import ListSubheader from "@material-ui/core/ListSubheader";
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
            project_id :props.project._id,
            user:props.user,
            userID:props.user._id,
            project : props.project,
            wantConsultancy:props.project.wantConsultancy,
            caId:props.project.consultancyId,
           // consultancy agency needed attributes
           consultancyAgency:null,
            caName:null, 
            caRating:null,
            caEmail:null,
            caTelephoneNumber:null,
            caLocation:null,
            caYearsOfExp:null,

        }
    }

    componentDidMount=async ()=>{
       
        if(this.state.project.wantConsultancy == true){
            await  axios
            .get(`${server}/api/consultancyagency/${this.state.caId}`)
            .then(res => {
                
                return  res.data;
                
            })
            .then(a => {
                this.setState({ consultancyAgency: a.data,
                    wantConsultancy:a.data.wantConsultancy,
                    caName:a.data.name,
                    caRating:a.data.rating,
                    caEmail:a.data.email,
                    caTelephoneNumber:a.data.telephoneNumber,
                    caLocation:a.data.location,
                    caYearsOfExp:a.data.yearsOfExperience                
                })
                });  
        }

    }

    render(){
        const {classes} = this.props
        console.log(this.state.consultancyAgency)
        if(this.state.consultancyAgency !==null){
           return( 
            <div class="mainContainer">    
                <div id="ProjectAttributes">
                <br></br>

                    <div class="headerArea"> <Typography variant="h4" gutterBottom>
                    Consultancy Agency Info
      </Typography>
                        <div class="col-2 float-left">
                            <Card style={{ height: 'auto' ,width:'25rem'}}>
                            <TextField
                                id="outlined-read-only-input"
                                label="Email"
                                defaultValue={this.state.caEmail}
                                className={classNames.textField}
                                margin="normal"
                                InputProps={{
                                readOnly: true,
                                }}
                                variant="outlined"
                            />

                            <TextField
                                id="outlined-read-only-input"
                                label="Name"
                                defaultValue={this.state.caName}
                                className={classNames.textField}
                                margin="normal"
                                InputProps={{
                                readOnly: true,
                                }}
                                variant="outlined"
                            />

                            <TextField
                                id="outlined-read-only-input"
                                label="Loaction"
                                defaultValue={this.state.caLocation}
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
                                defaultValue={this.state.caTelephoneNumber}
                                className={classNames.textField}
                                margin="normal"
                                InputProps={{
                                readOnly: true,
                                }}
                                variant="outlined"
                           />

                           <TextField
                                id="outlined-read-only-input"
                                label="Rating"
                                defaultValue={this.state.caRating}
                                className={classNames.textField}
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                           />

                           <TextField
                                id="outlined-read-only-input"
                                label="Years Of Experience"
                                defaultValue={this.state.caYearsOfExp}
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
            
 
            ); }
            else {
                return (
                  <div >
                  <ListSubheader component="div">
                  No Consultancy Agency assigned yet
                </ListSubheader>
                    </div>
                );
              }
            }

    
}
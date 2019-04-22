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
        projectID:this.props.id,
        //entities
        project : this.props.project,
        CA:null,
        member:null,
        //project attributes to be viewed
        description:this.props.project.description,
        category: this.props.project.category,
        wantConsultancy: this.props.project.wantConsultancy,
        postedDate: this.props.project.postedDate,
        lifeCycle:this.props.project.lifeCycle,
        estimatedEffort:this.props.project.estimatedEffort, 
        estimatedTime: this.props.project.estimatedTime,
        experienceLevelNeeded:this.props.project.experienceLevelNeeded, 
        requiredSkillsSet:this.props.project.requiredSkillsSet,
        finalDraft: this.props.project.finalDraft,
        applyingCA :this.props.project.applyingCA,
        submittedProjectLink:this.props.project.submittedProjectLink,
        // attributes not to be viewed
        companyID:null, 
        consultancyID: null,
        memberID: null,
        // member needed attributes
        memberFirstName:null,
        memberLastName:null,
        memberNationality:null,
        memberEmail:null,
        memberMobileNumber:null,
        // consultancy agency needed attributes
        caName:null,
        caAbout:null,
        caEmail:null,
        caTelephoneNumber:null,

    
    }
    }
      render() {
      console.log("skills : "+this.state.skillVariable)
      console.log(this.state.requiredSkillsSet)
      console.log(this.state.category)
      if(this.state.project !==null){
        console.log(this.state.project)

        return (
        <div class="mainContainer">    
             <div id="ProjectAttributes">
             <br></br>

              <div class="headerArea"> <Typography variant="h4" gutterBottom>
              Project Attributes
      </Typography>
              <div class="col-9 float-left">
                <Card>         
                  <TextField class="allInputs"
                    id="outlined-multiline-static"
                    multiline
                    label="Description"
                    rows="5"
                    className={classNames.textField}
                    value={this.state.description}
                    InputProps={{
                        readOnly: true,
                        }}
                    margin="normal"
                    variant="outlined"
                  />

                  <TextField class="allInputs"
                   id="outlined-category"
                   label="Category"
                   className={classNames.textField}
                   value={this.state.category}
                   InputProps={{
                    readOnly: true,
                    }}
                    margin="normal"
                   variant="outlined"
                  /> 

                  <TextField class="allInputs"
                    id="outlined-select-currency"
                    label="Project Life Cycle"
                    className={classNames.lifeCycle}
                    value={this.state.lifeCycle}
                    InputProps={{
                        readOnly: true,
                        }}
                    margin="normal"
                    variant="outlined"
                   >
                  </TextField>

                 <TextField class="allInputs"
                    id="outlined-select-currency"
                    label="Native select"
                    className={classNames.textField}
                    value={this.state.estimatedEffort}
                    InputProps={{
                        readOnly: true,
                        }}
                    margin="normal"
                    variant="outlined"
                   >
                  </TextField>


                  <TextField class="allInputs"
                    id="outlined-select-currency"
                    label="Exprience Level Needed"
                    className={classNames.textField}
                    value={this.state.experienceLevelNeeded}
                    InputProps={{
                        readOnly: true,
                        }}
                    margin="normal"
                    variant="outlined"
                   >
                  </TextField>

                  <TextField class="allInputs"
                    id="outlined-link"
                    label="Submission Link"
                    className={classNames.textField}
                    value={this.state.submittedProjectLink}
                    InputProps={{
                        readOnly: true,
                        }}
                 margin="normal"
                    variant="outlined"
                 />

                 <div class = "SkillCard">
                 <div class="addedSkills"> 
                 <Card style={{width:'200px'}} >
              
                 <h3>Set</h3>
                 {this.state.requiredSkillsSet.map(option => (
                  <Chip 
                  key={option}
                  label={option}
                  className={classNames.chip}
                  style={{width: 'fit-content',float:'left'}}
                  >
                  </Chip>
                 ))}  
                </Card>
                </div>
                </div>


                </Card>
                </div>     
              </div>
              </div>
            </div>
        );
        }
        else{
          return(
            <div>
              <CircularProgress></CircularProgress>
            </div>

          );
        }

    }

}
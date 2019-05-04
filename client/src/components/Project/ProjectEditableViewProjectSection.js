import React, { Component } from 'react';
import CircularProgress from '../Global/CircularIndeterminate';
import axios from "axios";
import { TextField } from '@material-ui/core';
import classNames from 'classnames';
import { Card } from "react-bootstrap";
import styles from './editableViews.css';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import SaveButton from '../Global/SaveButton';
import Snackbar from '@material-ui/core/Snackbar';

const server = require("../../config");
const effort = ['Easy','Normal','Hard','Extreme']
const cycle=['Waiting for consultancy Agency' , 'Negotiation',
  'Final Draft' , 'Approved' , 'Canceled' , 'Posted' , 'In Progress' , 'Final Review' , 'Finished']
const expLevel = ['Fundamental Awareness','Novice','Intermediate','Advanced','Expert']
const skills=[]


export default class EditableView extends React.Component {

    constructor(props){
        super(props);
        console.log(this.props.project)
        this.state={
        projectID:this.props.project._id,
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
        //other variables
        skillVariable:null,
        snackBarAddSkillExist:false

    
    }
    }
 

    addSkill =event=>{
      event.preventDefault();
       const arr = this.state.requiredSkillsSet
       console.log(arr)
       console.log(this.state.skillVariable)
       if(arr.includes(this.state.skillVariable)){
          this.setState({snackBarAddSkillExist:true})
       }
       else{
       arr.push(this.state.skillVariable)
         this.setState({requiredSkillsSet:arr})
       }
     }
    
    CloseSnack1 = () =>{
      this.setState({snackBarAddSkillExist:false})
    }

    handleDelete = data => (event) => {
      event.preventDefault();
      const arr = this.state.requiredSkillsSet
      arr.splice( arr.indexOf(data), 1 );
      this.setState({requiredSkillsSet:arr})

      }


    handleChange = name => event => {
      event.preventDefault();
      this.setState({
        [name]: event.target.value,
      });
      console.log("hhhhhaaadadahdakdh" + this.state.estimatedEffort)
    };
    
    saveChanges =async ()=>{
      await axios({url : `https://lirtenben.herokuapp.com/api/projects/${this.state.projectID}`, method:'put',
    data:{
        description : this.state.description,
        category : this.state.category,
        lifeCycle : this.state.lifeCycle,
        estimatedEffort : this.state.estimatedEffort?this.state.estimatedEffort:" ",
        estimatedTime : this.state.estimatedTime?this.state.estimatedTime:" ",
        experienceLevelNeeded : this.state.experienceLevelNeeded?this.state.experienceLevelNeeded:" ",
        requiredSkillsSet : this.state.requiredSkillsSet,

    }
      
    }).then(res=>{ 
        console.log(res.status);
       return res.data
    })
    .then(json => this.setState({project : json}))

    };
    
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

<div class="headerArea"> <Typography variant="h4" style={{color:"#283593",fontWeight:"bold"}} gutterBottom>
Project Attributes
</Typography>
              <div class="col-2 float-left"> 
                <Card style={{ height: '1000px' ,width:'60rem'}}>
                  <TextField style={{width:'25rem',paddingLeft:"10px"}}
                    id="outlined-multiline-static"
                    multiline
                    label="Description"
                    rows="5"
                    className={classNames.textField}
                    value={this.state.description}
                    onChange={this.handleChange('description')}
                    margin="normal"
                    variant="outlined"
                  />
                  

                  <TextField
                  style={{width:'25rem',paddingLeft:"10px"}}
                   id="outlined-category"
                   label="Category"
                   className={classNames.textField}
                   value={this.state.category}
                   onChange={this.handleChange('category')}
                   margin="normal"
                   variant="outlined"
                  /> 

                  <TextField style={{width:'25rem',paddingLeft:"10px"}}
                    id="outlined-select-currency"
                    select
                    label="Project Life Cycle"
                    className={classNames.lifeCycle}
                    value={this.state.lifeCycle}
                    onChange={this.handleChange('lifeCycle')}
                    SelectProps={{
                      native: true,
                      MenuProps: {
                        className: classNames.menu,
                      },
                    }}
                    margin="normal"
                    variant="outlined"
                   >
                    {cycle.map(option => (
                      <option key={option.value} value={option.value}>
                        {option}
                      </option>
                    ))}
                  </TextField>

                 <TextField style={{width:'25rem',paddingLeft:"10px"}}
                    id="outlined-select-currency"
                    select
                    label="Estimated Effort"
                    className={classNames.textField}
                    value={this.state.estimatedEffort}
                    onChange={this.handleChange('estimatedEffort')}
                    SelectProps={{
                      native: true,
                      MenuProps: {
                        className: classNames.menu,
                      },
                    }}
                    margin="normal"
                    variant="outlined"
                   >
                    {effort.map(option => (
                      <option key={option.value} value={option.value}>
                        {option}
                      </option>
                    ))}
                  </TextField>


                  <TextField style={{width:'25rem',paddingLeft:"10px"}}
                    id="outlined-select-currency"
                    select
                    label="Exprience Level Needed"
                    className={classNames.textField}
                    value={this.state.experienceLevelNeeded}
                    onChange={this.handleChange('experienceLevelNeeded')}
                    SelectProps={{
                      native: true,
                      MenuProps: {
                        className: classNames.menu,
                      },
                    }}
                    margin="normal"
                    variant="outlined"
                   >
                    {expLevel.map(option => (
                      <option key={option.value} value={option.value}>
                        {option}
                      </option>
                    ))}
                  </TextField>

                  <TextField style={{width:'25rem',paddingLeft:"10px"}}
                    id="outlined-link"
                    label="Submission Link"
                    className={classNames.textField}
                    value={this.state.submittedProjectLink}
                    onChange={this.handleChange('category')}
                    margin="normal"
                    variant="outlined"
                 />

                 <div class = "SkillCard">

                   <div class="addSkill">   
                 <TextField style={{width:'25rem',paddingLeft:"10px"}}
                    id="outlined-set"
                    label="required Skills"
                    className={classNames.textField}
                    value={this.setState.skillVariable}
                    onChange={this.handleChange('skillVariable')}
                    margin="normal"
                    variant="outlined"
                    style={{float:"left"}}
                  />
                  <br></ br>
                  <Button variant="primary" onClick={this.addSkill}>Add</Button>
                  
                  </div>     
                 
                 
                 
                 <div class="addedSkills"> 
                 <Card style={{width:'200px'}} >
              
                 <h3>Skill Set</h3>
                 {this.state.requiredSkillsSet.map(option => (
                  <Chip 
                  key={option}
                  label={option}
                  className={classNames.chip}
                  onDelete={this.handleDelete(option)}
                  style={{width: 'fit-content',float:'left'}}
                  >
                  </Chip>
                 ))}  
                </Card>
                </div>
                </div>
               <Button onClick={this.saveChanges}>Save</Button>


                </Card>
                </div>     
              </div>
              </div>
              <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={this.state.snackBarAddSkillExist}
              autoHideDuration={2500}
              onClose={this.CloseSnack1}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">{"this skill is already in the skill set"}</span>}
              
            />
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
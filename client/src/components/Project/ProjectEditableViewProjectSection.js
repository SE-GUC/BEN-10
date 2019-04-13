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

const effort = ['Low','Normal','Hard','Extreme']
const cycle=['Waiting for consultancy Agency' , 'Negotiation',
  'Final Draft' , 'Approved' , 'Canceled' , 'Posted' , 'In Progress' , 'Final Review' , 'Finished']
const expLevel = ['Fundamental Awareness','Novice','Intermediate','Advanced','Expert']
const skills=[]


export default class EditableView extends React.Component {

    constructor(props){
        super(props);
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
        skillVariable:null

    
    }
    }
 

     addSkill =event=>{
      event.preventDefault();
       const arr = this.state.requiredSkillsSet
       arr.push(this.state.skillVariable)
         this.setState({requiredSkillsSet:arr})
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
    };
    
    saveChanges =async ()=>{
      await axios({url : `http://localhost:5000/api/projects/${this.state.projectID}`, method:'put',
    data:{
        description : this.state.description,
        category : this.state.category,
        lifeCycle : this.state.life_cycle,
        estimatedEffort : this.state.estimatedEffort,
        estimatedTime : this.state.estimatedTime,
        experienceLevelNeeded : this.state.experienceLevelNeeded,
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
              <div class="headerArea"> <h1> project attributes</h1>
              <div class="col-9 float-left">
                <Card>         
                  <TextField class="allInputs"
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

                  <TextField class="allInputs"
                   id="outlined-category"
                   label="Category"
                   className={classNames.textField}
                   value={this.state.category}
                   onChange={this.handleChange('category')}
                   margin="normal"
                   variant="outlined"
                  /> 

                  <TextField class="allInputs"
                    id="outlined-select-currency"
                    select
                    label="Project Life Cycle"
                    className={classNames.lifeCycle}
                    value={this.state.currency}
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

                 <TextField class="allInputs"
                    id="outlined-select-currency"
                    select
                    label="Native select"
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


                  <TextField class="allInputs"
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

                  <TextField class="allInputs"
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
                 <TextField class="allInputs"
                    id="outlined-set"
                    label="required Skills"
                    className={classNames.textField}
                    value={this.setState.skillVariable}
                    onChange={this.handleChange('skillVariable')}
                    margin="normal"
                    variant="outlined"
                    style={{float:"left"}}
                  />
                  <Button variant="primary" style={{width:'fit-content',float:'left'}} onClick={this.addSkill}>Add</Button>
                  </div>     
                 
                 
                 
                 <div class="addedSkills"> 
                 <Card style={{width:'200px'}} >
              
                 <h3>Set</h3>
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
                <SaveButton  onClick={this.saveChanges}></SaveButton>



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

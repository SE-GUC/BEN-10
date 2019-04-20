import React, { Component } from 'react'
import style from "./SignUp.css";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
const server = require("../../config");

const styles = theme => ({
    gender:{
        marginLeft: 15,
        marginRight: theme.spacing.unit,
        marginBottom:15,
        width:2000

    },
    
    textField: {
      marginLeft: 15,
      marginRight: theme.spacing.unit,
      marginBottom:15,
      width:2000
    },
    button:{
      marginLeft: 600,
      marginTop:5
    },
    label:{
        width:1000,
        marginLeft:15,
        marginBottom:15,

    },
    title:{
        color:"#283593"
    },
    date:{
        width:2000,
        marginBottom:10,
        marginLeft:15,
        marginBottom:15,

    }
    
  });

function getSteps() {
    return ['Personal Information', 'Location Information', 'Account Information'];
  }
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return 'provide your personal data...';
      case 1:
        return 'Lirten is intersted in your location';
      case 2:
        return 'Final step !';
      default:
        return 'Unknown step';
    }
  }
  const gender=[{value:'male'},{value:'female'}]
const status=[{value:'married'},{value:'single'}]
const drivingLicense=[{value:'yes'},{value:'no'}]

export default class SignUp extends Component {
    state={
        type:this.props.type,
        activeStep: 0,
        name:'',
            about:'',
            telephone:'',
            email:'',
            password:'',
            location:'',
            yearsOfExperience:0,
            firstName:'',
            lastName:'',
            SSN:'',
            birthDate:'',
            gender:'',
            nationality:'',
            maritalStatus:'',
            drivingLicense:'',
            country:'',
            city:'',
            area:'',
            email:'',
            password:'',
            confirmpassword:'',
            mobileNumber:'',
            alternativeMobileNumber:'',
            skillSet:null,
            user:null,
            type:null
      }
      handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

      validatePassword = () =>{
        const signup = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/
        return signup.test(this.state.password)? true : false 
      }

      errors = () => {
        var errors = []
        if(this.state.password){
          if(this.state.password.length <5)
            errors.push('Your password must be at least 5 characters')
          if(this.state.password.search(/[a-z]/) < 0)
            errors.push('Your password must contain at least one small letter')
          if(this.state.password.search(/[A-Z]/) < 0)
            errors.push('Your password must contain at least one capital letter')
          if(this.state.password.search(/[0-9]/) < 0)
            errors.push('Your password must contain at least one number')
        }
        return errors
      }
      handleNext = () => {
        const { activeStep } = this.state;
        const steps = getSteps();
        if(activeStep === steps.length - 1){
            if(this.props.location.state.type==="ConsultancyAgency"){
                this.SignUpAsCA();
 
            }
            else {
                this.SignUpAsPartnerOrMember();
            }

        }
        else{
            this.setState({
            activeStep: activeStep + 1,
            });
        }
      };
    
      handleBack = () => {
        this.setState(state => ({
          activeStep: state.activeStep - 1,
        }));
      };
    
    
      handleReset = () => {
        this.setState({
          activeStep: 0,
        });
      };
       
      SignUpAsCA=async() =>{
        if(this.props.location.state.type==="ConsultancyAgency"){
            const body={
              type:this.state.type,  
              name:this.state.name,
              about:this.state.about,
              telephoneNumber:this.state.telephone,
              email:this.state.email,
              password:this.state.password,
              location:this.state.location,
              yearsOfExperience:this.state.yearsOfExperience   
            }
          const requestOptions = {
              method: 'POST',
              body: JSON.stringify(body),
              headers: { "Content-Type": "application/json" }
             
            };
            await fetch(`${server}/signUp` , requestOptions).then((response) => {
              return response.json();
            }).then((result) => {
              console.log(result.status)
              if(result.msg==="Consultancy Agency was created successfully"){
                this.setState({
                  user:body,
                  type:"consultancyagency"
                }) 
              }
              else{
                console.log(result)
                alert(result.error)
              }
            })
      };
    };
      SignUpAsPartnerOrMember = async () =>{
        const body={
            type:this.state.type,
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            SSN:this.state.SSN,
            birthDate:this.state.birthDate,
            gender:(this.state.gender==="male")?false:true,
            nationality:this.state.nationality,
            maritalStatus:this.state.maritalStatus,
            drivingLicense:(this.state.drivingLicense==="yes")?true:false,
            country:this.state.country,
            city:this.state.city,
            area:this.state.area,
            email:this.state.email,
            password:this.state.password,
            mobileNumber:this.state.mobileNumber,
            alternativeMobileNumber:this.state.alternativeMobileNumber
            }
            console.log(body)
            const requestOptions = {
              method: 'POST',
              body: JSON.stringify(body),
              headers: { "Content-Type": "application/json" }
             
            };
           await fetch(`${server}/signUp` , requestOptions).then((response) => {
              return response.json();
            }).then((result) => {
              if((result.msg==="Partner was created successfully")||
              (result.msg==="member was created successfully")){
                this.setState({
                  user:body,
                  type:"partner"
                }) 
              }
              else{
                console.log(result)
                alert(result.error)
              }
            })
      };
    


    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
    return (
      <div>
        <div class="bg-shade-gradient">
            <div class="container-lg p-responsive py-5">
                <div class="setup-header setup-org">
                    <h1>Join Lirten Hub</h1>
                    <div class="tabs">
                    <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const props = {};
                        const labelProps = {};
                        return (
                        <Step key={label} {...props}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                        );
                    })}
                    </Stepper>
                    <Typography >{getStepContent(activeStep)}</Typography>
                </div>
                </div>
             {/*  the rendered component upon selected tab*/ }
            {this.state.activeStep=== 0?
                (
                 <div>
                   <div > 
                    <h2 class="msg"> Create your personal, your data will be validated. make sure of it!</h2>
                    <div> 
                    <TextField
                        required
                        id="outlined-name"
                        label="First Name"
                        className={classNames.textField}
                        value={this.state.firstName}
                        onChange={this.handleChange('firstName')}
                        margin="normal"
                        variant="outlined"
                        style={{width:"250px"}}
                    />
                    <br/>
                    <TextField
                        required
                        id="outlined-name"
                        label="Last Name"
                        className={classNames.textField}
                        value={this.state.lastName}
                        onChange={this.handleChange('lastName')}
                        margin="normal"
                        variant="outlined"
                        style={{width:"250px"}}
                    />
                    <br/>
                    <TextField
                        required
                        id="outlined-name"
                        label="SSN"
                        className={classNames.textField}
                        value={this.state.SSN}
                        onChange={this.handleChange('SSN')}
                        margin="normal"
                        variant="outlined"
                        style={{width:"250px"}}
                    />
                    <br/>
                    <TextField
                    required
                    id="date"
                    label="Birth Date"
                    type="date"
                    value={this.state.birthDate}
                    onChange={this.handleChange('birthDate')}
                    className={classNames.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    style={{width:"250px"}}
                    margin="normal"
                    variant="outlined"

                    />
                    <br/>
                    <TextField
                        required
                        select
                        className={classNames.textField}
                        variant="outlined"
                        label="Gender"
                        value={this.state.gender}
                        onChange={this.handleChange('gender')}
                        margin="normal"
                        variant="outlined"
                        style={{width:"250px"}}
                    >
                        {gender.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.value}
                        </MenuItem>
                        ))}
                    </TextField>
                    <br/>
                    <TextField
                        required
                        id="outlined-name"
                        label="Nationality"
                        className={classNames.textField}
                        value={this.state.nationality}
                        onChange={this.handleChange('nationality')}
                        margin="normal"
                        variant="outlined"
                        style={{width:"250px"}}
                    />
                    <br/>
                    <TextField
                        required
                        select
                        className={classNames.textField}
                        variant="outlined"
                        label="Marital Status"
                        value={this.state.maritalStatus}
                        onChange={this.handleChange('maritalStatus')}
                        margin="normal"
                        variant="outlined"
                        style={{width:"250px"}}
                    >
                        {status.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.value}
                        </MenuItem>
                        ))}
                    </TextField>
                    <br/>
                    <TextField
                        required
                        select
                        className={classNames.textField}
                        variant="outlined"
                        label="Driving License"
                        value={this.state.drivingLicense}
                        onChange={this.handleChange('drivingLicense')}
                        style={{width:"250px"}}
                        margin="normal"
                        variant="outlined"

                    >
                    {drivingLicense.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                    <br/>
                   </div> 
                 </div>
                 </div>
                )
                :(this.state.activeStep===1?
                (
                 <div>
                   <div> 
                        <TextField
                        required
                        id="outlined-name"
                        label="Country"
                        className={classNames.textField}
                        value={this.state.country}
                        onChange={this.handleChange('country')}
                        margin="normal"
                        variant="outlined"
                        style={{width:"250px"}}
                        />
                        <br/>
                        <TextField
                        required
                        id="outlined-name"
                        label="City"
                        className={classNames.textField}
                        value={this.state.city}
                        onChange={this.handleChange('city')}
                        margin="normal"
                        variant="outlined"
                        style={{width:"250px"}}
                        />
                        <br/>
                        <TextField
                        id="outlined-name"
                        label="Area"
                        className={classNames.textField}
                        value={this.state.area}
                        onChange={this.handleChange('area')}
                        margin="normal"
                        variant="outlined"
                        style={{width:"250px"}}
                        /> 
                    </div>
                 </div>
                )
                :
                (
                 <div>
                   <div>  
                        <TextField
                        required
                        id="outlined-email-input"
                        label="Email"
                        className={classNames.textField}
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        type="email"
                        name="email"
                        autoComplete="email"
                        margin="normal"
                        variant="outlined"
                        style={{width:"250px"}}
                        />
                        <br/>
                        <TextField
                        required
                        id="outlined-password-input"
                        label="Password"
                        className={classNames.textField}
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        helperText={this.validatePassword()? '': this.errors()[0]}
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        style={{width:"250px"}}
                        />
                        <br/>
                        <TextField
                        required
                        id="outlined-password-input"
                        label="Confirm Password"
                        className={classNames.textField}
                        type="password"
                        value={this.state.confirmpassword}
                        onChange={this.handleChange('confirmpassword')}
                        helperText= {(this.state.password!==''&&this.state.confirmpassword!=='')?(this.state.password===this.state.confirmpassword)?'matched' :'not matched':''}
                        margin="normal"
                        variant="outlined"
                        style={{width:"250px"}}
                        />
                        <br/>
                        <TextField
                        required
                        id="outlined-name"
                        label="Mobile Number"
                        className={classNames.textField}
                        value={this.state.mobileNumber}
                        onChange={this.handleChange('mobileNumber')}
                        margin="normal"
                        variant="outlined"
                        style={{width:"250px"}}
                        />
                        <br/>
                        <TextField
                        id="outlined-name"
                        label="Alternative Mobile Number"
                        className={classNames.textField}
                        value={this.state.alternativeMobileNumber}
                        onChange={this.handleChange('alternativeMobileNumber')}
                        margin="normal"
                        variant="outlined"
                        style={{width:"250px"}}
                        />
                        <br/>
                        {(this.props.type==="Partner")?"":<TextField
                        required
                        id="outlined-name"
                        label="Skills Set"
                        className={classNames.textField}
                        value={this.state.skillSet}
                        onChange={this.handleChange('skillSet')}
                        margin="normal"
                        variant="outlined"
                        style={{width:"250px"}}
                        />}  
                        <br/>
                   </div>
                 </div>
                )
                 )
            }  
            <div>
            {activeStep === steps.length ? (
                <div>
                <Typography >
                    All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={this.handleReset} >
                    Reset
                </Button>
                </div>
            ) : (
                <div>
                <div style={{marginTop:"20px"}}>
                    <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    >
                    Back
                    </Button>
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </div>
                </div>
            )}
            </div> 


            </div>
        </div>
      </div>
    )
  }
}

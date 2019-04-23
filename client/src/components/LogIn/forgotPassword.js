import React, { Component } from 'react'
import {Redirect , BrowserRouter} from 'react-router-dom';
import style  from './LogIn.css';
import background from './3D.png';
import { classes } from 'istanbul-lib-coverage';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '@material-ui/core';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios"
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
const server = require("../../config");


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  
});

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: { useNextVariants: true },
});



export default class LogIn extends Component {
    state={
        email:null,
        oldPassword:'',
        newPassword:'',
        redirect:false,
        mailSubmitted:false,
        return:false
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
    handleSubmit =async () =>{
      const body={
        email:this.state.email,
        password:this.state.oldPassword,
        newPassword:this.state.newPassword
      }
      console.log(body)
      await fetch(`${server}/forgotPassword`, {

        method: "put",
  
        body: JSON.stringify(body),
  
        headers: {
  
          "Content-Type": "application/json",
  
        }
  
      }).then(res => {console.log(res);return res.json()})

      .then(json =>{
        console.log(Object.keys(json).toString())
        if(Object.keys(json).toString()===["error"].toString()){
        alert(json.error);
      }else{
        this.setState({return:true})
      }
    })



      

}
handleSend = async()=>{
  console.log(this.state.email)
  if(this.state.email){
    const body = {
      email:this.state.email
    }
    await fetch(`${server}/sendOldPassword`, {

      method: "put",

      body: JSON.stringify(body),

      headers: {

        "Content-Type": "application/json",

      }

    })
      this.setState({mailSubmitted:true});

  }
}
  render() {
    console.log(this.state.redirect)
    if(this.state.return===true){
      return (<Redirect to={{pathname:"/login"}}/>);
    }else{
      if(this.state.redirect){

        return(
        <Redirect to={{pathname:"/Home"}}/>
        );
      }
     else {
      if(this.state.mailSubmitted===false){
  
        return(
        <div class="main">
          <div class="Header"> 
          </div>
          
          
          <div class="middle">
            <div class="m1">
            </div>
            <div class="m2">
              <div class="logo">
                <img src={background} alt="Logo" height={100} width={250} style={{margin:"center"}}></img>
                <h3 class="form-text" font="Montserrat">Sign in to Lirten</h3>
              </div>
              <div class="form">
  
               <Card border="dark" class="card" style={{margin:"center"}} class="rounded">
               <MuiThemeProvider theme={theme}>
               <br></br>
               
               <TextField
               className={classes.margin}
               label="Email"
               onChange={this.handleChange('email')}
               id="mui-theme-provider-standard-input"
               style={{width:"250px",marginLeft:"20px"}}
               />
               <br/><br/>
               <button type="button" class="btn btn-success" onClick={this.handleSend} style={{width:"150px",margin:"auto"}}>Send Password</button>
             </MuiThemeProvider> 
               </Card>
              </div>
            </div>
            <div class="m3">
            </div>
          </div>
          
          
          <div class="footer">
          </div>
        </div>
      
  
  
  
  
  
  );
      }else{
        return(
          
        <div class="main">
        <div class="Header"> 
        </div>
        
        
        <div class="middle">
          <div class="m1">
          </div>
          <div class="m2">
            <div class="logo">
              <img src={background} alt="Logo" height={100} width={250} style={{margin:"center"}}></img>
              <h3 class="form-text" font="Montserrat">Sign in to Lirten</h3>
            </div>
            <div class="form">
  
             <Card border="dark" class="card" style={{margin:"center"}} class="rounded">
             <MuiThemeProvider theme={theme}>
             <br></br>
            <TextField
               className={classes.margin}
               label="Old Password"
               onChange={this.handleChange('oldPassword')}
               id="mui-theme-provider-standard-input"
               style={{width:"250px",marginLeft:"20px"}}
             />
             <br></br>
     
             <TextField
             className={classes.margin}
             label="New Password"
             helperText={this.validatePassword()? '': this.errors()[0]}
             onChange={this.handleChange('newPassword')}
             id="mui-theme-provider-standard-input"
             style={{width:"250px",marginLeft:"20px"}}
             />
             <button type="button" class="btn btn-success" onClick={this.handleSubmit} style={{width:"150px",margin:"auto"}}>Change Password</button>
           </MuiThemeProvider>   
             </Card>
             
            </div>
          </div>
          <div class="m3">
          </div>
        </div>
        
        
        <div class="footer">
        </div>
      </div>
    
  
  
  
        );
  
  
  
  
  
  
  
  
  
  
      }
     }
    }
  }
}

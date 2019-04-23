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
        email:'',
        password:'',
        redirect:false,
    }
    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };

    handleSubmit =async () =>{
      console.log("fetch")
        const body={
          email:this.state.email,
          password:this.state.password,
        }
        console.log(body)
       // url:`${server}/login`,
        var j=null;
        await fetch(`${server}/login`,{
          method: 'PUT',
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
       
         
        }).then((response) => {
          return response.json();
        }).then((result) => {
          console.log(Object.keys(result))
          if(Object.keys(result).toString()!==["error"].toString()){
            localStorage.setItem('user',JSON.stringify(result.data.user))
              localStorage.setItem('type',result.data.type)
              localStorage.setItem('token',result.data.token)
            }
          j=result;
           if(result.data){      
             this.setState({redirect:true})
           }
           else{
             alert(result.error)
           }
        
          })
          if(j){
            // localStorage.setItem('user',JSON.stringify(j.data.user))
            // localStorage.setItem('type',j.data.type)
            // localStorage.setItem('token',j.token)
          }

}
  render() {
    if(this.state.redirect){

      return(
      <Redirect to={{pathname:"/Home"}}/>
      );
    }
   else 
    return (
      <div class="mainin">
        <div class="Header"> 
        </div>
        
        
        <div class="middle">
          <div class="m1">
          </div>
          <div class="m2">
            <div class="logo">
              <img src={background} alt="Logo" height={100} width={250} style={{margin:"center"}}></img>
              <h3 class="form-text" font="Montserrat" style={{color:"white"}}>Sign in to Lirten</h3>
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
             <br></br>
     
             <TextField
             className={classes.margin}
             type="password"
             label="Password"
             onChange={this.handleChange('password')}
             id="mui-theme-provider-standard-input"
             style={{width:"250px",marginLeft:"20px"}}
             />
           </MuiThemeProvider>
           <small id="emailHelp" style={{marginLeft:"20px",marginTop:"5px"}} class="form-text text-muted">at least 8 characters including  number , lowercase , uppercase, special character.

           .</small>
           <a href="http://localhost:3000/forgotPassword" style={{marginLeft:"20px",marginTop:"5px"}}>forgot password?</a>
          

           <button type="button" class="btn btn-success" onClick={this.handleSubmit} style={{width:"150px",margin:"auto"}}>Login</button>

              
             </Card>
             
            </div>
          </div>
          <div class="m3">
          </div>
        </div>
        
        
      </div>
    
    )
  }
}

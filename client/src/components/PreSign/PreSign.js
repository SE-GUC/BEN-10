import React, { Component } from 'react'
import {Redirect , BrowserRouter} from 'react-router-dom';
import style from './PreSign.css'
import { classes } from 'istanbul-lib-coverage';
import { Button, Typography } from '@material-ui/core';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import { Card } from "react-bootstrap";
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';




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


export default class PreSign extends Component {
  state={
    type:'',
    rediR:'',
    rediS:'',
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleRegister = ()=>{
    this.setState({rediR:true})

  }
  handleLogin = ()=>{
    this.setState({rediS:true})

  }

  render() {
    if(this.state.rediR){
     return  <Redirect to={{pathname:"/signup"}}></Redirect>

    }
    if(this.state.rediS){
     return <Redirect to={{pathname:"/login"}}></Redirect>

    }

    return (
      <div class="main">
         <div class = "Header">
         </div>

         <div class="middle">
           <div class="register">
           
             <Button color="dark" style={{width:"100px", border:"2px solid black",background:"white"}}><Typography style={{fontWeight:"bolder",fontSize:"300"}} component={"p"} onClick={this.handleRegister()} >Register</Typography></Button>
             <Button color="dark" style={{width:"100px", border:"2px solid black",background:"white"}}><Typography style={{fontWeight:"bolder",fontSize:"300"}} component={"p"} onClick={this.handleLogin()} >Login</Typography></Button>
             <Button color="dark" style={{width:"100px", border:"2px solid black",background:"white"}}><Typography style={{fontWeight:"bolder",fontSize:"300"}} component={"p"} onClick={this.handleChange("member")} >Member</Typography></Button>
             <Button color="dark" style={{width:"100px", border:"2px solid black",background:"white"}}><Typography style={{fontWeight:"bolder",fontSize:"300"}} component={"p"} onClick={this.handleChange("consultancyagency")} >CA</Typography></Button>
             <Button color="dark" style={{width:"100px", border:"2px solid black",background:"white"}}><Typography style={{fontWeight:"bolder",fontSize:"300"}} component={"p"}onClick={this.handleChange("partner")} >Partner</Typography></Button>
             <Button color="dark" style={{width:"100px", border:"2px solid black",background:"white"}}><Typography style={{fontWeight:"bolder",fontSize:"300"}} component={"p"}onClick={this.handleChange("admin")} >admin</Typography></Button>

            </div>
         </div>

         
        
      </div>
    )
  }
}

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
    type:null,
    rediR:false,
    rediS:false,
  }
  handleChange =  (name) => async (event) => {
    console.log(event.target.value)
  await   this.setState({
      [name]: event.target.value,
    });
  };
  handleChangem=async ()=>{
     await this.setState({type:"member"})
    console.log(this.state.type)

  }

  handleChangec=async ()=>{
    await this.setState({type:"consultancyagency"})
   console.log(this.state.type)

 }
 handleChangep=async ()=>{
  await this.setState({type:"partner"})
 console.log(this.state.type)

}
handleChangead=async ()=>{
  await this.setState({type:"admin"})
 console.log(this.state.type)

}

  handleRegister = ()=>{
    this.setState({rediR:true})

  }
  handleLogin = ()=>{
    this.setState({rediS:true})

  }

  render() {
    if(this.state.rediR){
      console.log(this.state.type)
      return(
        <Redirect to={{pathname:`/signUp/${this.state.type}`, state:{type:this.state.type}}}/>
        );
    }
    if(this.state.rediS){
      return(
        <Redirect to={{pathname:"/login", state:{type:this.state.type}}}/>
        );
    }
  

    return (
      <div class="main">
         <div class = "Header">
         </div>

         <div class="middle">
           <div class="register">
           
             <Button color="dark" style={{width:"100px", border:"2px solid black",background:"white"}}><Typography style={{fontWeight:"bolder",fontSize:"300"}} component={"p"} onClick={this.handleRegister} >Register</Typography></Button>
             <Button color="dark" style={{width:"100px", border:"2px solid black",background:"white"}}><Typography style={{fontWeight:"bolder",fontSize:"300"}} component={"p"} onClick={this.handleLogin} >Login</Typography></Button>
             <Button color="dark" style={{width:"100px", border:"2px solid black",background:"white"}}><Typography style={{fontWeight:"bolder",fontSize:"300"}} component={"p"} onClick={this.handleChangem} >Member</Typography></Button>
             <Button color="dark" style={{width:"100px", border:"2px solid black",background:"white"}}><Typography style={{fontWeight:"bolder",fontSize:"300"}} component={"p"} onClick={this.handleChangec} >CA</Typography></Button>
             <Button color="dark" style={{width:"100px", border:"2px solid black",background:"white"}}><Typography style={{fontWeight:"bolder",fontSize:"300"}} component={"p"}onClick={this.handleChangep} >Partner</Typography></Button>
             <Button color="dark" style={{width:"100px", border:"2px solid black",background:"white"}}><Typography style={{fontWeight:"bolder",fontSize:"300"}} component={"p"}onClick={this.handleChangead} >admin</Typography></Button>

            </div>
         </div>

         
        
      </div>
    )
  }
}

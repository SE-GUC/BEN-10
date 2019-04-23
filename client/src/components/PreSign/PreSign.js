import React, { Component } from 'react'
import {Redirect , BrowserRouter} from 'react-router-dom';
import style from './PreSign.css'
import { classes } from 'istanbul-lib-coverage';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';





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
    fade:false,
  }
  handleChange =  (name) => async (event) => {
    console.log(event.target.value)
  await   this.setState({
      [name]: event.target.value,
    });
  };
  handleChangem=async ()=>{
     await this.setState({type:"member"})
     this.handleRegister();

    console.log(this.state.type)

  }

  handleChangec=async ()=>{
    await this.setState({type:"consultancyagency"})
    this.handleRegister();

   console.log(this.state.type)

 }
 handleChangep=async ()=>{
  await this.setState({type:"partner"})
  this.handleRegister();

 console.log(this.state.type)

}
handleChangead=async ()=>{
  await this.setState({type:"admin"})
  this.handleRegister();
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
      <div class="mainpre">
         <div class = "Headerpre">
         </div>

         <div class="middlepre">
          <div class="r1"></div>
           <div class="register">
           
            {/* <Button color="dark" style={{width:"100px", border:"2px solid black",background:"white"}}><Typography style={{fontWeight:"bolder",fontSize:"300"}} component={"p"} onClick={this.handleRegister} >Register</Typography></Button>
             <Button color="dark" style={{width:"100px", border:"2px solid black",background:"white"}}><Typography style={{fontWeight:"bolder",fontSize:"300"}} component={"p"} onClick={this.handleLogin} >Login</Typography></Button>
             <Button color="dark" style={{width:"100px", border:"2px solid black",background:"white"}}><Typography style={{fontWeight:"bolder",fontSize:"300"}} component={"p"} onClick={this.handleChangem} >Member</Typography></Button>
             <Button color="dark" style={{width:"100px", border:"2px solid black",background:"white"}}><Typography style={{fontWeight:"bolder",fontSize:"300"}} component={"p"} onClick={this.handleChangec} >CA</Typography></Button>
             <Button color="dark" style={{width:"100px", border:"2px solid black",background:"white"}}><Typography style={{fontWeight:"bolder",fontSize:"300"}} component={"p"}onClick={this.handleChangep} >Partner</Typography></Button>
    <Button color="dark" style={{width:"100px", border:"2px solid black",background:"white"}}><Typography style={{fontWeight:"bolder",fontSize:"300"}} component={"p"}onClick={this.handleChangead} >admin</Typography></Button> */}
   <Button width={300} style={{width:"300px"}}><h5 color="white"style={{fontWeight:"bolder",color:"white"}}onClick={this.handleChangem}>Register As member</h5></Button>
   <br></br>
   <br></br>
   <Button width={300} style={{width:"300px"}}><h5 color="white"style={{fontWeight:"bolder",color:"white"}} onClick={this.handleChangep}>Register As Partner</h5></Button>
   <br></br>
   <br></br>
   <Button width={300} style={{width:"300px"}}><h5 color="white"style={{fontWeight:"bolder",color:"white"}} onClick={this.handleChangec}>Register As Consultancy</h5></Button>
   <br></br>
   <br></br>
   <Button width={300} style={{width:"300px"}}><h5 color="white"style={{fontWeight:"bolder",color:"white"}}onClick={this.handleLogin}>Log in</h5></Button>


    
      </div>
      <div class="r2"></div>
    

         </div>

         
        
      </div>
    )
  }
}

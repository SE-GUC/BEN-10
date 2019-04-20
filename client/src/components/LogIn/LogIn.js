import React, { Component } from 'react'
import styles from './LogIn.css';
import background from './MainLogoTransparent.png';
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { classes } from 'istanbul-lib-coverage';

export default class LogIn extends Component {
    state={
        email:'',
        password:'',
    }
  render() {
    return (
      <div class="main">
           <div class="left">
           <div class=" LirtenLogo">

           </div> 
           </div>

           <div class="right">
           
           
     
      <div class="card">
      <Card  border="success">
           <Card.Body>
             <Card.Title>Login</Card.Title>
             <Card.Subtitle className="mb-2 text-muted">lll</Card.Subtitle>
           </Card.Body>
         </Card>
         </div>
      </div>
      </div>
    )
  }
}

import React, { Component } from 'react'
import styles from './LogIn.css';
export default class LogIn extends Component {
    state={
        email:'',
        password:'',
    }
  render() {
    return (
      <div>
        <div class="Container">
           <div class="py-6 LirtenLogo">
           </div> 
        </div>  
      </div>
    )
  }
}

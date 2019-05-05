import React ,{Component} from 'react';
import LoginError from "./loginError.css"
import { Button } from '@material-ui/core';
class loginErrorMessage extends Component{
    constructor(props){
        super(props);
        this.state={

        }

    }
    render(){
        return(
            <div class="page">

            <div class="side2">
            <h id="word">YOU ARE NOT AUTHORIZED TO VIEW THIS CONTENT !!!!</h>

            </div>
            

            </div>


        );
    }

}
export default loginErrorMessage;

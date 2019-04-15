import React, { Component } from "react";
import axios from "axios" ;
import { BrowserRouter as Router } from "react-router-dom";
import Route  from "react-router-dom/Route";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const server = require("../config");

class SendFinalDraft extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            adminID : this.props.aid ,
            pID : this.props.pid ,
            draft : null  ,
            open : false 
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

    //   handleChange=(event, newValue)=> {
    //     event.persist();             
    //     this.setState((state) => state.draft= newValue);

    // }

    SendFinalDraft = ()=>{
        
    const body ={
         finalDraft : this.state.draft
    }
           
        axios
            .put(
                `${server}/api/admins/${this.state.adminID}/myProjects/${this.state.pID}/sendDraft`,body
            )
        this.setState({open:false})
        
    }

    render(){
        
        return (
            <div>
                <Button onClick = {this.handleClickOpen}  variant = "outlined" color = "primary" >
                    Send Final Draft
                </Button>
                <Dialog
                    open = {this.state.open}
                    onClose = {this.handleClose}
                    aria-labelledby="form-dialog-title" 
                >
                    <DialogTitle id = "form-dialog-title">Final Draft</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Type down the final draft to be saved
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin = "dense"
                            id = "name"
                            label = "Final Draft"
                            type = "String"
                            fullWidth
                            ref = "myField"
                            value = {this.state.draft}
                            onChange = {e => this.setState({ draft : e.target.value})}
                            //value = {this.state.draft}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color = "primary">
                            Cancel
                        </Button>
                        <Button  onClick = {this.SendFinalDraft.bind(this)}  color = "primary" >
                            Send
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    
    }


}

export default SendFinalDraft ;
// DOOOOOOODIE'S WORLD
    
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import  { Redirect } from 'react-router-dom'
const server = require("../../config");

const styles = theme => ({
  button: {
    // margin: theme.spacing.unit,
    // marginLeft:80,
    backgroundColor:"#00897b",
    marginRight:8,
    marginLeft:350,
    // marginTop:120
  },
  input: {
    display: 'none',
  },
  text:{
    color:"#eeeeee",
    fontWeight:"bold"
  }
});

class ApproveRequest extends Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.admin_id,
            // eid:this.props.event_id,
            // requestorId:this.props.requestor,
            eid:this.props.eid,
            requestorId:this.props.requestorId,
            event:false

        }
    }
    Approve = () =>{
        const requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": "application/json",
                      "Authorization": "bearer " + localStorage.getItem('token')
                     }
          };
          fetch(`https://lirtenben.herokuapp.com/api/admins/${this.props.admin_id}/EventRequest/${this.state.eid}/true` , requestOptions).then((response) => {
            return response.json();
          }).then((result) => {
            console.log(result)
              if(result.msg=="Event Request updated successfully"){
                  this.setState({
                      event:true

                  })
              }
              else{
                  alert(result.error)

              }
          });
    }

 render() {
  const { classes } = this.props;
  if(this.state.event==false){
  return (
      <Button variant="contained" className={classes.button} onClick={this.Approve}>
       <h6 className={classes.text}>Accept</h6> 
      </Button>

  );
  }else{
    return <Redirect to={{ pathname:"/createEvent" ,state:{requestId:this.state.eid, requestorId:this.state.requestorId}}}  />

  }
}


}

ApproveRequest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApproveRequest);
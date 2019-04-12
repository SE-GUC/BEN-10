// DOOOOOOODIE'S WORLD
    
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import  { Redirect } from 'react-router-dom'


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor:"#388e3c"
  },
  input: {
    display: 'none',
  },
});

class DisapproveRequest extends Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.admin_id,
            // eid:this.props.event_id,
            // requestorId:this.props.requestor,
            eid:"5ca1111df1fa20462cfd3377",
            requestorId:"5ca1111df1fa20462cfd338",
            event:false

        }
    }
    Approve = () =>{
        const requestOptions = {
            method: 'PUT'
          };
          fetch(`http://localhost:5000/api/admins/5ca1111df1fa20462cfd3377/EventRequest/5c7a447dd51f1409a01fd320/true` , requestOptions).then((response) => {
            return response.json();
          }).then((result) => {
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
        Accept
      </Button>

  );
  }else{
    return <Redirect to="/createEvent" requestId={this.state.eid} requestorId={this.state.requestorId}  />

  }
}


}

DisapproveRequest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisapproveRequest);
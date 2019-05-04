// DOOOOOOODIE'S WORLD
    
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const server = require("../../config");

const styles = theme => ({
  button: {
    // margin: theme.spacing.unit,
    backgroundColor:"#757575",
    
  },
  input: {
    display: 'none',
  },
  text:{
    color:"#eeeeee",
    fontWeight:"bold"
  }
});

class DisapproveRequest extends Component{
    constructor(props){
        super(props);
        this.state={
            // id:this.state.admin_id,
            // eid:this.state.event_id,

        }
    }
    Disapprove = () =>{
        const requestOptions = {
            method: 'PUT'
          };
          fetch(`${server}/api/admins/${this.props.admin_id}/EventRequest/${this.props.eid}/false` , requestOptions).then((response) => {
            return response.json();
          }).then((result) => {
              if(result.msg=="Event Request updated successfully"){
                  alert("DONE")
              }
              else{
                  alert(result.error)

              }
          });
    }

 render() {
  const { classes } = this.props;
  return (
      <Button variant="contained" className={classes.button} onClick={this.Disapprove}>
       <h6 className={classes.text}>Delete</h6> 
      </Button>

  );
}


}

DisapproveRequest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisapproveRequest);
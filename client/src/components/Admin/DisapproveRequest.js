// DOOOOOOODIE'S WORLD
    
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor:"#757575"
  },
  input: {
    display: 'none',
  },
  text:{
    color:"#eeeeee"
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
          fetch(`http://localhost:5000/api/admins/5ca1111df1fa20462cfd3377/EventRequest/5c7a447dd51f1409a01fd320/false` , requestOptions).then((response) => {
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
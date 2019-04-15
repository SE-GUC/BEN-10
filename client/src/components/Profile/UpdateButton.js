import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const server = require("../../config");

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class UpdateButton extends Component {
  constructor(props){
      super(props)
  }
  
  render(){
    const { classes } = this.props;
  return (
    <div>
      
      <Button onClick={this.props.onUpdate} variant="contained" color="primary" className={classes.button}>
        Update
      </Button>
      
    </div>
  );
}
}

UpdateButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateButton);

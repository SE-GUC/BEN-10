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

class RedirectButton extends Component {
    constructor(props){
        super(props)
    }
    render(){
  const { classes } = this.props;
  return (
    <div>
      <Button onClick={this.props.onClick} variant="contained" className={classes.button}>
        {this.props.as}
      </Button>
     
    </div>
  );
}
}

RedirectButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RedirectButton);

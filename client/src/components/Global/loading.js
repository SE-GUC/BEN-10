import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    color:"#9e9e9e"
  },
});

class loading extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
render() {
  const { classes } = this.props;
  return (
    <div>
      <CircularProgress className={classes.progress} />
    </div>
  );
}
}
loading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(loading);
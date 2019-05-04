import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
const server = require("../../config");

const styles = theme => ({
  button:{
   marginLeft:155
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class PartnerApplyingCAsFab extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const { classes } = this.props;
        return (
            <div>
            {/* <Fab size= "small" color="secondary" aria-label="Add" className={classes.fab} onClick={this.props.onClick}>
                <AddIcon />
            </Fab> */}
            <Button variant="contained" color="primary" className={classes.button} onClick={this.props.onClick}>
        Add
      </Button>
            </div>
        );
    }
}

PartnerApplyingCAsFab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PartnerApplyingCAsFab);

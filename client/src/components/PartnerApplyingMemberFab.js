import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class PartnerApplyingMemberFab extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const { classes } = this.props;
        return (
            <div>
            <Fab size= "small" color="secondary" aria-label="Add" className={classes.fab} onClick={this.props.onClick}>
                <AddIcon />
            </Fab>
            </div>
        );
    }
}

PartnerApplyingMemberFab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PartnerApplyingMemberFab);

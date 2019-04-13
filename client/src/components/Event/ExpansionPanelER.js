import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EventRequestForm from './EventRequestForm'

const styles = theme => ({
  root: {
    width: '20%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginLeft:10,
    color:"#00695c",
  },
});

class ExpansionPanelER extends Component {
    constructor(props){
        super(props)
    }
    render(){
    const { classes } = this.props;
    return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Request an Event</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <EventRequestForm requestorId={this.props.requestorId} requestedBy={this.props.partner_name} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
}

ExpansionPanelER.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExpansionPanelER);

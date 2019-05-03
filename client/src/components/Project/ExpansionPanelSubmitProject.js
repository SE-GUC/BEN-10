import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PostProjectForm from './PostProjectForm'
const server = require("../../config");

const styles = theme => ({
  root: {
    width: '80%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginLeft:10,
    color:"#9e9e9e",
  },
});

class ExpansionPanelSubmitProject extends Component {
    constructor(props){
        super(props)
    }
    render(){
    const { classes } = this.props;
    return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Submit a Project</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <PostProjectForm companyID={this.props.Id} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
}

ExpansionPanelSubmitProject.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExpansionPanelSubmitProject);

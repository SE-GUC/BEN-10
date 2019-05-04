import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import PartnerApplyingCAsCard from "./PartnerApplyingCAsCard";
// import tileData from './tileData';
const server = require("../../config");

const styles = theme => ({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  margin: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});
class PartnerApplyingCAsOnProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cid: null,
      wantConsultancy: this.props.project.wantConsultancy
    };
  }
  render() {
    
    const { classes } = this.props;
if(this.props.project.applyingCA.length!==0){
    return (
      <div className={classes.root}>
        
          {this.props.project.applyingCA.map(i => (
              <PartnerApplyingCAsCard project={this.props.project} partner={this.props.partner} ca={i} />
          ))}
      </div>
    );
  }else{
    return(
    <div>
    <ListSubheader component="div">
              No applying Consultancy Agencys On this Project
            </ListSubheader>
    </div>
    );
  }
  }
}

PartnerApplyingCAsOnProject.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PartnerApplyingCAsOnProject);

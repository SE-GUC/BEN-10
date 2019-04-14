import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import ApplyingCAsCard from "./ApplyingCAsCard";
// import tileData from './tileData';

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
class ApplyingCAsOnProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cid: null,
      wantConsultancy: this.props.project.wantConsultancy
    };
  }
  render() {
    
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={1} style={{ height: "auto" }}>
            <ListSubheader component="div">
              Applying Consultancy Agencys On this Project
            </ListSubheader>
          </GridListTile>
          {this.props.project.applyingCA.map(i => (
            <GridListTile key={i}>
              <ApplyingCAsCard project={this.props.project} admin={this.props.admin} ca={i} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

ApplyingCAsOnProject.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ApplyingCAsOnProject);

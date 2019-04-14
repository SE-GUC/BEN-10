import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = {
  root: {
    flexGrow: 1
  }
};

class Loading extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <LinearProgress />
      </div>
    );
  }
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loading);

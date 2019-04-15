import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import ApplyingCAsFab from './ApplyingCAsFab'
import axios from 'axios'
const server = require("../../config");

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class ApplyingCAButton extends Component {
    constructor(props){
        super(props)
        this.state = {
          open: false,
          project:this.props.project,
          admin:this.props.admin,
          ca:this.props.ca,
          result:"Loading..."
        };
        console.log(this.props.ca)
    }

  handleClick = () => {
    this.setState({ open: true });
    this.assign()
  };

  assign = () => {
    const body = {
      applyingCA: this.state.ca
    };
    axios
      .put(
        `${server}/api/admins/${this.state.admin._id}/assignCA/${this.state.project._id}/to/${this.state.ca}`,body
      )
      .then(function(response) {
        console.log(response);
        return response.data;
      })
      .then(res => {
        if (res.error) {
          this.setState({
            result: res.error
          });
        } else {
          this.setState({
            result: res.msg
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleClose = () => {
    this.setState({ open: false , result:"Loading..."});
  };


  render() {
    const { classes } = this.props;
    return (
      <div>
        <ApplyingCAsFab onClick={this.handleClick}></ApplyingCAsFab>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.result}</span>}
          
        />
      </div>
    );
  }
}

ApplyingCAButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApplyingCAButton);

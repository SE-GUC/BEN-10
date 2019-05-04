import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import ApplyingMemberFab from './ApplyingMemberFab'
import axios from 'axios'
const server = require("../../config");

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class ApplyingMemberButton extends Component {
    constructor(props){
        super(props)
        this.state = {
          open: false,
          project:this.props.project,
          admin:this.props.admin,
          mem:this.props.mem,
          result:"Loading..."
        };
    }

  handleClick = () => {
    this.setState({ open: true });
    this.assign()
  };

  assign = () => {
    const body = {
      memberID: this.state.mem
    };
    console.log(body)
    axios
      .put(
        `${server}/api/admins/${this.state.admin._id}/assign/${this.state.project._id}/to/${this.state.mem}`,body
      )
      .then(function(response) {
        console.log(response.status);
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
        <ApplyingMemberFab onClick={this.handleClick}></ApplyingMemberFab>
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

ApplyingMemberButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApplyingMemberButton);

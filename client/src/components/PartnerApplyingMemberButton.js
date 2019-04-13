import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import PartnerApplyingMemberFab from '../components/PartnerApplyingMemberFab'
import axios from 'axios'

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class PartnerApplyingMemberButton extends Component {
    constructor(props){
        super(props)
        this.state = {
          open: false,
          project:this.props.project,
          partner:this.props.partner,
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
    axios
      .put(
        `http://localhost:5000/api/partners/${this.state.partner._id}/assign/${this.state.project._id}/to/${this.state.mem}`,body
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
        <PartnerApplyingMemberFab onClick={this.handleClick}></PartnerApplyingMemberFab>
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

PartnerApplyingMemberButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PartnerApplyingMemberButton);

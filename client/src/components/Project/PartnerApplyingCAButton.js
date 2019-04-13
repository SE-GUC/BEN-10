import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import PartnerApplyingCAsFab from './PartnerApplyingCAsFab'
import axios from 'axios'

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class PartnerApplyingCAButton extends Component {
    constructor(props){
        super(props)
        this.state = {
          open: false,
          project:this.props.project,
          partner:this.props.partner,
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
        `http://localhost:5000/api/partners/${this.state.partner._id}/assignCA/${this.state.project._id}/to/${this.state.ca}`,body
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
        <PartnerApplyingCAsFab onClick={this.handleClick}></PartnerApplyingCAsFab>
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

PartnerApplyingCAButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PartnerApplyingCAButton);

import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import axios from "axios";
const server = require("../../config");


class SendTaskOrientation extends React.Component {
  state = {
    open: false,
    vertical: 'top',
    horizontal: 'center',
    result:"Loading..."
  };

  handleClick = state => () => {
    this.setState({ open: true, ...state });
    this.sendInvitation()

  };

  sendInvitation = () => {
    

    axios.post(`${server}/api/partners/${this.props.Id}/sendOrientationInvitations/${this.props.projectId}/`)
    .then(function (response) {
      console.log(response.status)
      return response.data;
    })
    .then(res => {
        console.log(res)
        console.log(this.props.Id)
      if(res.error){
      this.setState({
        result:res.error
      })}
      else{
        this.setState({
          result:res.msg
        })
        
      }
    })
    .catch(function (error) {
      console.log(error);
      
      
    });

  };
  handleClose = () => {
    this.setState({ open: false, result:"Loading..." });
  };

  render() {
    const { vertical, horizontal, open } = this.state;
    return (
      <div>
        <Button onClick={this.handleClick({ vertical: 'bottom', horizontal: 'left' })} style={{backgroundColor:"#283593",marginLeft:450}} variant="contained" className={this.props.className}>
        Send Task Orientation Invitation
        </Button>
        
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
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

export default SendTaskOrientation;

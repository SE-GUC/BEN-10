import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import axios from "axios";
const server = require("../../config");


class EventRequestMessage extends React.Component {
  state = {
    open: false,
    vertical: 'top',
    horizontal: 'center',
    result:"Loading..."
  };

  handleClick = state => () => {
    this.setState({ open: true, ...state });
    this.submitRequest()

  };

  submitRequest = () => {
    const body ={
        description: this.props.description,
        eventType: this.props.type,
        eventLocation: this.props.location,
        eventDate: this.props.date,
        isAccepted: "false",
        requestorId: this.props.requestorId
    }

    axios.post(`/api/partners/${this.props.requestorId}/eventrequests/`, body)
    .then(function (response) {
      console.log(response.status)
      return response.data;
    })
    .then(res => {
      if(res.error){
      this.setState({
        result:res.error
      })}
      else{
        this.setState({
          result:res.msg
        })
        this.props.clear()
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
        <Button style={{
        borderRadius: 35,
        backgroundColor: "#9e9e9e"
    }}onClick={this.handleClick({ vertical: 'bottom', horizontal: 'left' })} variant="contained" className={this.props.className}>
         <h style={{color:"#fff",fontWeight:"bold"}}> Submit Request</h>  
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

export default EventRequestMessage;

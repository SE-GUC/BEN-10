import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import axios from "axios";

const server = require("../../config");

class PostProjectMessage extends React.Component {
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
      name: this.props.name,
      description: this.props.description,
      category: this.props.category,
      wantConsultancy: this.props.wantConsultancy
    }
    console.log("consalrnlsfdm")
    console.log(localStorage.getItem('token'))

    axios.post(`https://lirtenben.herokuapp.com/api/partners/${this.props.companyID}/addProject/`, body,{
      headers: { "Content-Type": "application/json",
      "Authorization": "bearer " + localStorage.getItem('token')
     }
    })
    .then(function (response) {
      console.log(response)
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
        backgroundColor: "#283593",
        color:"#fff",
        marginLeft:550
    }} onClick={this.handleClick({ vertical: 'bottom', horizontal: 'left' })} variant="contained" className={this.props.className}>
            Submit Request
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

export default PostProjectMessage;

import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import axios from "axios";


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
        description: this.props.description,
        category: this.props.category,
        wantConsultancy: this.props.wantConsultancy
    }

    axios.post(`http://localhost:5000/api/partners/${this.props.companyID}/addProject/`, body)
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
        <Button onClick={this.handleClick({ vertical: 'bottom', horizontal: 'left' })} variant="contained" className={this.props.className}>
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

import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Message from "./Message"
export default class FormDialog extends React.Component {
  state = {
    open: false,
    member_id:this.props.member_id,
    project_id:this.props.project_id,
    link:"",
    msg:null,
    context:null
  };
  handClick = () =>{
    //   console.log(`http://localhost:5000/api/members/${this.state.member_id}/Myprojects/${this.state.project_id}/submit/${this.state.link}`)
    fetch(`http://localhost:5000/api/members/${this.state.member_id}/Myprojects/${this.state.project_id}/submit/${this.state.link}`, {
        method: 'PUT',
        body: {}
    })
    .then((response) => {return response.json()})
    .then((result)=>{
        if(result.status===200){
            // console.log(result.data)
            // alert(result.data)
            this.setState({
              msg:true,
              context:result.data

            })
        }
        else{
            // console.log(result.error)
            // alert(result.error)
            this.setState({
              msg:false,
              context:result.error

            })
        }
        
    })

  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = link => event => {
    this.setState({ [link]: event.target.value
     });

      };
      clear = () => {
        this.setState({
          link:"",
          msg:null,
          context:null
          
        })
      }

  render() {
    if(this.state.msg==null){
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          Submit
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please Enter The Final Work GitHub Link below :)
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={this.state.link}
              onChange={this.handleChange('link')}
              label="GitHub Link"
              type="email"
              fullWidth                 
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button onClick={this.handleClose} color="primary" onClick={this.handClick}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  else{
    return(
      <div>
      <Message msg={this.state.msg} context={this.state.context}/>
      <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          Submit
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please Enter The Final Work GitHub Link below :)
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={this.state.link}
              onChange={this.handleChange('link')}
              label="GitHub Link"
              type="email"
              fullWidth                 
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button onClick={this.handleClose} color="primary" onClick={this.handClick}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        </div>
    )


  }
  }
}
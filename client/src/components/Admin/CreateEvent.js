    
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Message from "../Member/SubmitWork/Message"
import  { Redirect } from 'react-router-dom'
const server = require("../../config");

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft:200
  },
  FormControl:{
      width:300,
      marginLeft:20,
      marginTop:15
  },
  button:{
    backgroundColor:"#00695c",
    marginLeft:640,
    width:150,
    height:50

  },
  backButton:{
      marginLeft:10,
      width:130

  },
  header:{
      color:"#3f51b5",
      marginLeft:210
  },
  date:{
      width:700,
      height:70,
      marginLeft:10
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width:700,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  }
  
});


class CreateEvent extends React.Component {
  state = {
    multiline: 'Controlled',
    requestorId:this.props.location.state.requestorId,
    eventType:"",
    eventLocation:"",
    description:"",
    registPrice:"",
    remainingPlace:"",
    topics:"",
    speaker:"",
    registStartDate:"",
    registExpiryDate:"",
    requestId:this.props.location.state.requestId,
    eventDate:"",
    event:null,
    text:"",
    back:false
  };
  
  handleClick2 = () =>{
     this.setState({
         back:true
     })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleClick = () =>{
    const  body={
        requestorId:this.state.requestorId,
        eventType:this.state.eventType,
        eventLocation:this.state.eventLocation,
        description:this.state.description,
        registPrice:this.state.registPrice,
        remainingPlace:this.state.remainingPlace,
        topics:this.state.topics.split(" "),
        speaker:this.state.speaker,
        registStartDate:this.state.registStartDate,
        registExpiryDate:this.state.registExpiryDate,
        requestId:this.state.requestId,
        eventDate:this.state.eventDate

    }
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
       
      };
      fetch(`https://lirtenben.herokuapp.com/api/admins/${JSON.parse(localStorage.getItem("user"))._id}/addEvent/` , requestOptions).then((response) => {
        return response.json();
      }).then((result) => {
          if(result.msg=="Event is posted successfully"){
              this.setState({
                  event:true,
                  text:result.msg
              })
          }
          else{
              this.setState({
                  event:false,
                  text:result.error
              })

          }
      });
  }

  render() {
    const { classes } = this.props;
    if(this.state.back==false){
    if(this.state.event==null){

    return (
        <div>
            <header className={classes.header}>
            <h1>
            Event Informations
            </h1>
            </header>


      <form className={classes.container} noValidate autoComplete="off">

{/* Description */}
 <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows="8"
          value={this.state.description}
          onChange={this.handleChange('description')}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        {/* Event Type */}
        <TextField
          id="outlined-name"
          label="Event Type"
          className={classes.textField}
          value={this.state.eventType}
          onChange={this.handleChange('eventType')}
          margin="normal"
          variant="outlined"
        />
        {/* Event Location */}
        <TextField
          id="outlined-name"
          label="Event Location"
          className={classes.textField}
          value={this.state.eventLocation}
          onChange={this.handleChange('eventLocation')}
          margin="normal"
          variant="outlined"
        />

{/* Registration Price */}
        <FormControl halfWidth className={classes.FormControl} >
          <InputLabel htmlFor="adornment-amount">Registration Price</InputLabel>
        <Input
            id="adornment-amount"
             value={this.state.registPrice}
             onChange={this.handleChange('registPrice')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
           />
        </FormControl> 
       {/* Available Places */}
       <TextField
          id="outlined-number"
          label="Available Places"
          value={this.state.remainingPlace}
          onChange={this.handleChange('remainingPlace')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Topics"
          className={classes.textField}
          value={this.state.topics}
          onChange={this.handleChange('topics')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Speaker"
          className={classes.textField}
          value={this.state.speaker}
          onChange={this.handleChange('speaker')}
          margin="normal"
          variant="outlined"
        />





      <TextField
        id="date"
        label="Registration Start Date"
        type="date"
        defaultValue={Date.now()}
        className={classes.date}
        value={this.state.registStartDate}
        onChange={this.handleChange('registStartDate')}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="date"
        label="Registration Expiry Date"
        type="date"
        defaultValue={Date.now()}
        value={this.state.registExpiryDate}
        onChange={this.handleChange('registExpiryDate')}
        className={classes.date}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="date"
        label="Event Date"
        type="date"
        defaultValue={Date.now()}
        value={this.state.eventDate}
        onChange={this.handleChange('eventDate')}
        className={classes.date}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant="contained" color="primary" className={classes.button} onClick={this.handleClick}>
        Create
      </Button>
      <Button variant="contained" color="default" className={classes.backButton} onClick={this.handleClick2}>
        Back
      </Button>

      </form>
      </div>
    );
  }
  else{
      return (
          <div>
              <header className={classes.header}>
            <h1>
            Event Informations
            </h1>
            </header>
              <form className={classes.container} noValidate autoComplete="off">

{/* Description */}
 <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows="8"
          value={this.state.description}
          onChange={this.handleChange('description')}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        {/* Event Type */}
        <TextField
          id="outlined-name"
          label="Event Type"
          className={classes.textField}
          value={this.state.eventType}
          onChange={this.handleChange('eventType')}
          margin="normal"
          variant="outlined"
        />
        {/* Event Location */}
        <TextField
          id="outlined-name"
          label="Event Location"
          className={classes.textField}
          value={this.state.eventLocation}
          onChange={this.handleChange('eventLocation')}
          margin="normal"
          variant="outlined"
        />

{/* Registration Price */}
        <FormControl halfWidth className={classes.FormControl} >
          <InputLabel htmlFor="adornment-amount">Registration Price</InputLabel>
        <Input
            id="adornment-amount"
             value={this.state.registPrice}
             onChange={this.handleChange('registPrice')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
           />
        </FormControl> 
       {/* Available Places */}
       <TextField
          id="outlined-number"
          label="Available Places"
          value={this.state.remainingPlace}
          onChange={this.handleChange('remainingPlace')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Topics"
          className={classes.textField}
          value={this.state.topics}
          onChange={this.handleChange('topics')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Speaker"
          className={classes.textField}
          value={this.state.speaker}
          onChange={this.handleChange('speaker')}
          margin="normal"
          variant="outlined"
        />





      <TextField
        id="date"
        label="Registration Start Date"
        type="date"
        defaultValue={Date.now()}
        className={classes.date}
        value={this.state.registStartDate}
        onChange={this.handleChange('registStartDate')}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="date"
        label="Registration Expiry Date"
        type="date"
        defaultValue={Date.now()}
        value={this.state.registExpiryDate}
        onChange={this.handleChange('registExpiryDate')}
        className={classes.date}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="date"
        label="Event Date"
        type="date"
        defaultValue={Date.now()}
        value={this.state.eventDate}
        onChange={this.handleChange('eventDate')}
        className={classes.date}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant="contained" color="primary" className={classes.button} onClick={this.handleClick}>
        Create
      </Button>
      <Button variant="contained" color="default" className={classes.backButton} onClick={this.handleClick2}>
        Back
      </Button>

      </form>

          <Message msg={this.state.event} context={this.state.text} />
          </div>
      )
  }
  }else{
    return <Redirect to="/events" />

}
  }

}

CreateEvent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateEvent);
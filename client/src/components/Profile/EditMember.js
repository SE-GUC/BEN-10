import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import UpdateButton from './UpdateButton'
import axios from "axios";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];


class OutlinedTextFields extends React.Component {
  constructor(props) {
    super(props);
    this.onUpdate=this.onUpdate.bind(this);

  this.state = {
    firstName:this.props.member.firstName,
    lastName:this.props.member.lastName,
    SSN:this.props.member.SSN,
    birthDate:this.props.member.birthDate,
    gender:this.props.member.gender,
    nationality:this.props.member.nationality,
    maritalStatus:this.props.member.maritalStatus,
    militaryStatus:this.props.member.militaryStatus,
    drivingLicense:this.props.member.drivingLicense,
    country:this.props.member.country,
    city:this.props.member.city,
    area:this.props.member.area,
    postalCode:this.props.member.postalCode,
    email:this.props.member.email,
    password:this.props.member.password,
    mobileNumber:this.props.member.mobileNumber,
    alternativeMobileNumber:this.props.member.alternativeMobileNumber,
    events:this.props.member.events,
    projects:this.props.member.projects,
    skillSet:this.props.member.skillSet,
    showPassword: false
  }
  console.log(this.props.member)
}

onUpdate =()=>{
  const body={
    firstName:this.state.firstName,
    lastName:this.state.lastName,
    SSN:this.state.SSN,
    birthDate:this.state.birthDate,
    gender:this.state.gender,
    nationality:this.state.nationality,
    maritalStatus:this.state.maritalStatus,
    militaryStatus:this.state.militaryStatus,
    drivingLicense:this.state.drivingLicense,
    country:this.state.country,
    city:this.state.city,
    area:this.state.area,
    postalCode:this.state.postalCode,
    email:this.state.email,
    password:this.state.password,
    mobileNumber:this.state.mobileNumber,
    alternativeMobileNumber:this.state.alternativeMobileNumber,
    events:this.state.events,
    projects:this.state.projects,
    skillSet:this.state.skillSet
  }
  axios.put(`http://localhost:5000/api/members/${this.props.member._id}`,body)
  .then(res=>{ 
    console.log(res.status);
   return res.data
})
.then(json => this.setState({project : json}))
window.location.reload();


}


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes } = this.props;
        
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="firstName"
          label="firstName"
          className={classes.textField}
          value={this.state.firstName}
          onChange={this.handleChange('firstName')}
          margin="normal"
          variant="outlined"
        />  
        <TextField
          id="lastName"
          label="lastName"
          className={classes.textField}
          value={this.state.lastName}
          onChange={this.handleChange('lastName')}
          margin="normal"
          variant="outlined"
        /> 
        <TextField
          id="SSN"
          label="SSN"
          className={classes.textField}
          value={this.state.SSN}
          onChange={this.handleChange('SSN')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="birthDate"
          label="birthDate"
          className={classes.textField}
          value={this.state.birthDate}
          onChange={this.handleChange('birthDate')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="gender"
          label="gender"
          className={classes.textField}
          value={this.state.gender}
          onChange={this.handleChange('gender')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="nationality"
          label="nationality"
          className={classes.textField}
          value={this.state.nationality}
          onChange={this.handleChange('nationality')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="maritalStatus"
          label="maritalStatus"
          className={classes.textField}
          value={this.state.maritalStatus}
          onChange={this.handleChange('maritalStatus')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="militaryStatus"
          label="militaryStatus"
          className={classes.textField}
          value={this.state.militaryStatus}
          onChange={this.handleChange('militaryStatus')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="drivingLicense"
          label="drivingLicense"
          className={classes.textField}
          value={this.state.drivingLicense}
          onChange={this.handleChange('drivingLicense')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="country"
          label="country"
          className={classes.textField}
          value={this.state.country}
          onChange={this.handleChange('country')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="city"
          label="city"
          className={classes.textField}
          value={this.state.city}
          onChange={this.handleChange('city')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="area"
          className={classes.textField}
          value={this.state.area}
          onChange={this.handleChange('area')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="postalCode"
          label="postalCode"
          className={classes.textField}
          value={this.state.postalCode}
          onChange={this.handleChange('postalCode')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-email-input"
          label="Email"
          className={classes.textField}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
        />

       <TextField
          id="outlined-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="mobileNumber"
          label="mobileNumber"
          className={classes.textField}
          value={this.state.mobileNumber}
          onChange={this.handleChange('mobileNumber')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="alternativeMobileNumber"
          label="alternativeMobileNumber"
          className={classes.textField}
          value={this.state.alternativeMobileNumber}
          onChange={this.handleChange('alternativeMobileNumber')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="events"
          label="events"
          className={classes.textField}
          value={this.state.events}
          onChange={this.handleChange('events')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="projects"
          label="projects"
          className={classes.textField}
          value={this.state.projects}
          onChange={this.handleChange('projects')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="skillSet"
          label="skillSet"
          className={classes.textField}
          value={this.state.skillSet}
          onChange={this.handleChange('skillSet')}
          margin="normal"
          variant="outlined"
        />

      <UpdateButton onUpdate={this.onUpdate} />
      </form>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);

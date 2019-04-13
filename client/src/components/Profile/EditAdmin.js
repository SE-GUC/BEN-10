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
    width:300,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width:450
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
    firstName:this.props.admin.firstName,
    lastName:this.props.admin.lastName,
    SSN:this.props.admin.SSN,
    birthDate:this.props.admin.birthDate,
    gender:this.props.admin.gender,
    nationality:this.props.admin.nationality,
    maritalStatus:this.props.admin.maritalStatus,
    militaryStatus:this.props.admin.militaryStatus,
    drivingLicense:this.props.admin.drivingLicense,
    country:this.props.admin.country,
    city:this.props.admin.city,
    area:this.props.admin.area,
    postalCode:this.props.admin.postalCode,
    email:this.props.admin.email,
    password:this.props.admin.password,
    mobileNumber:this.props.admin.mobileNumber,
    alternativeMobileNumber:this.props.admin.alternativeMobileNumber,
    showPassword: false
  }
  console.log(this.props.partner)
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
    alternativeMobileNumber:this.state.alternativeMobileNumber
    
  }
  axios.put(`http://localhost:5000/api/admins/${this.props.admin._id}`,body)
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
          label="First Name"
          className={classes.textField}
          value={this.state.firstName}
          onChange={this.handleChange('firstName')}
          margin="normal"
          variant="outlined"
        />  
        <TextField
          id="lastName"
          label="Last Name"
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
          label="Birth Date"
          className={classes.textField}
          value={this.state.birthDate}
          onChange={this.handleChange('birthDate')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="gender"
          label="Gender"
          className={classes.textField}
          value={this.state.gender}
          onChange={this.handleChange('gender')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="nationality"
          label="Nationality"
          className={classes.textField}
          value={this.state.nationality}
          onChange={this.handleChange('nationality')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="maritalStatus"
          label="Mrital Status"
          className={classes.textField}
          value={this.state.maritalStatus}
          onChange={this.handleChange('maritalStatus')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="militaryStatus"
          label="Military Status"
          className={classes.textField}
          value={this.state.militaryStatus}
          onChange={this.handleChange('militaryStatus')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="drivingLicense"
          label="Driving License"
          className={classes.textField}
          value={this.state.drivingLicense}
          onChange={this.handleChange('drivingLicense')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="country"
          label="Country"
          className={classes.textField}
          value={this.state.country}
          onChange={this.handleChange('country')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="city"
          label="City"
          className={classes.textField}
          value={this.state.city}
          onChange={this.handleChange('city')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Area"
          className={classes.textField}
          value={this.state.area}
          onChange={this.handleChange('area')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="postalCode"
          label="Postal Code"
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
          value={this.state.email}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
        />

<TextField
          id="outlined-adornment-password"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          type={this.state.showPassword ? 'text' : 'password'}
          label="Password"
          value={this.state.password}
          onChange={this.handleChange('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="mobileNumber"
          label="Mobile Number"
          className={classes.textField}
          value={this.state.mobileNumber}
          onChange={this.handleChange('mobileNumber')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="alternativeMobileNumber"
          label="Alternative MobileNumber"
          className={classes.textField}
          value={this.state.alternativeMobileNumber}
          onChange={this.handleChange('alternativeMobileNumber')}
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

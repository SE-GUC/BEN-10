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
const server = require("../../config");

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


class OutlinedTextFields extends React.Component {
  constructor(props) {
    super(props);
    this.onUpdate=this.onUpdate.bind(this);
    console.log(this.props.partner)
  this.state = {
    firstName:this.props.partner.firstName,
    lastName:this.props.partner.lastName,
    SSN:this.props.partner.SSN,
    birthdate:this.props.partner.birthDate,
    gender:this.props.partner.gender?"Female":"Male",
    nationality:this.props.partner.nationality,
    maritalStatus:this.props.partner.maritalStatus,
    drivingLicense:this.props.partner.drivingLicense,
    country:this.props.partner.country,
    city:this.props.partner.city,
    area:this.props.partner.area,
    postalCode:this.props.partner.postalCode,
    email:this.props.partner.email,
    password:this.props.partner.password,
    mobileNumber:this.props.partner.mobileNumber,
    alternativeMobileNumber:this.props.partner.alternativeMobileNumber,
    events:this.props.partner.events,
    projects:this.props.partner.projects,
    partners:this.props.partner.partners,
    showPassword: false
  }
  console.log(this.props.partner)
}

onUpdate =async()=>{
  const body={
    firstName:this.state.firstName,
    lastName:this.state.lastName,
    SSN:this.state.SSN,
    birthdate:this.state.birthDate,
    gender:this.state.gender==="Female"?true:false,
    nationality:this.state.nationality,
    maritalStatus:this.state.maritalStatus,
    drivingLicense:this.state.drivingLicense,
    country:this.state.country,
    city:this.state.city,
    area:this.state.area,
    postalCode:this.state.postalCode,
    email:this.state.email,
    password:this.state.password,
    mobileNumber:this.state.mobileNumber,
    alternativeMobileNumber:this.state.alternativeMobileNumber,
    // events:this.state.events,
    // projects:this.state.projects,
    // partners:this.state.partners
  }
  await axios.put(`${server}/api/partners/${this.props.partner._id}`,body)
  .then(res=>{ 
    console.log(res.status);
   return res.data
})
.then(json => this.setState({project : json}))
await axios
      .get(`${server}/api/partners/${this.props.partner._id}`)
      .then(res => {
        return res.data;
      })
      .then(a =>{
        localStorage.setItem('type',"partner");
        localStorage.setItem('user',JSON.stringify(a.data));
        window.location.reload();
      }
      );


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
          id="birthdate"
          label="Birthdate"
          className={classes.textField}
          value={this.state.birthdate}
          onChange={this.handleChange('birthdate')}
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
          label="Marital Status"
          className={classes.textField}
          value={this.state.maritalStatus}
          onChange={this.handleChange('maritalStatus')}
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
          label="Alternative Mobile Number"
          className={classes.textField}
          value={this.state.alternativeMobileNumber}
          onChange={this.handleChange('alternativeMobileNumber')}
          margin="normal"
          variant="outlined"
        />
        {/* <TextField
          id="partners"
          label="partners"
          className={classes.textField}
          value={this.state.partners}
          onChange={this.handleChange('partners')}
          margin="normal"
          variant="outlined"
        /> */}

      <UpdateButton onUpdate={this.onUpdate} />
      </form>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);

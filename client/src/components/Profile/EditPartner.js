import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import UpdateButton from './UpdateButton'
import axios from "axios";
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
  firstName:null ,
  lastName: null,
  SSN : null,
  birthdate:null,    
  gender:null,
  nationality: null,
  maritalStatus:null,
  militaryStatus:null,
  drivingLicense:null,
  country:null,
  city:null,
  area:null,
  postalCode:null,
  email:null,
  password:null,
  mobileNumber:null,
  alternativeMobileNumber:null,
  events: null,
  projects:null,
  partners:null
  }
}

onUpdate =()=>{
  const body={
    firstName:this.state.firstName,
    lastName:this.state.lastName,
    SSN:this.state.SSN,
    birthdate:this.state.birthdate,
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
    partners:this.state.partners
  }
  axios.put(`http://localhost:5000/api/partners/${this.props.id}`,body)
  .then(res=>{ 
    console.log(res.status);
   return res.data
})
.then(json => this.setState({project : json}))
window.location.reload();


}

componentDidMount() {
  axios
      .get(`http://localhost:5000/api/partners/`)
      .then(res => {
        return res.data;
      })
      .then(a => this.setState({ 
        firstName: a.data.firstName,
        lastName:a.data.lastName,
        SSN : a.data.SSN,
    birthdate:a.data.birthdate,    
    gender:a.data.gender,
    nationality: a.data.nationality,
    maritalStatus:a.data.maritalStatus,
    militaryStatus:a.data.militaryStatus,
    drivingLicense:a.data.drivingLicense,
    country:a.data.country,
    city:a.data.city,
    area:a.data.area,
    postalCode:a.data.postalCode,
    email:a.data.email,
    password:a.data.password,
    mobileNumber:a.data.mobileNumber,
    alternativeMobileNumber:a.data.alternativeMobileNumber,
    events:a.data.events,
    projects:a.data.projects,
    partners:a.data.partners
  
      }));
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    if(this.state.firstName===null)
    return <div>Loading...</div>;
    else
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
          id="birthdate"
          label="birthdate"
          className={classes.textField}
          value={this.state.birthdate}
          onChange={this.handleChange('birthdate')}
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
          id="email"
          label="email"
          className={classes.textField}
          value={this.state.email}
          onChange={this.handleChange('email')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="password"
          label="password"
          className={classes.textField}
          value={this.state.password}
          onChange={this.handleChange('password')}
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
          id="partners"
          label="partners"
          className={classes.textField}
          value={this.state.partners}
          onChange={this.handleChange('partners')}
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

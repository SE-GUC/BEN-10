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
    name:this.props.agency.name,
    about:this.props.agency.about,
    telephoneNumber:this.props.agency.telephoneNumber,
    email:this.props.agency.email,
    password:this.props.agency.password,
    location:this.props.agency.location,
    yearsOfExperience:this.props.agency.yearsOfExperience,
    rating:this.props.agency.rating,
    reports:this.props.agency.reports,
    partners:this.props.agency.partners,
    projects:this.props.agency.projects,
    events:this.props.agency.events,
    showPassword: false
  }
  console.log(this.props.partner)
}

onUpdate =()=>{
  const body={
    name:this.state.name,
    about:this.state.about,
     telephoneNumber:this.state.telephoneNumber,
    email:this.state.email,
     password:this.state.password,
     location:this.state.location,
     yearsOfExperience:this.state.yearsOfExperience,
    // rating:this.state.rating,
     reports:this.state.reports,
     partners:this.state.partners,
     projects:this.state.projects,
     events:this.state.events 
  }
  
  axios.put(`http://localhost:5000/api/consultancyagency/${this.props.agency._id}`,body)
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
          id="name"
          label="name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
        />  
        <TextField
          id="about"
          label="about"
          className={classes.textField}
          value={this.state.about}
          onChange={this.handleChange('about')}
          margin="normal"
          variant="outlined"
        /> 
        <TextField
          id="telephoneNumber"
          label="telephoneNumber"
          className={classes.textField}
          value={this.state.telephoneNumber}
          onChange={this.handleChange('telephoneNumber')}
          margin="normal"
          variant="outlined"
        />
         <TextField
          id="outlined-email-input"
          label="email"
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
          id="location"
          label="locationlocation"
          className={classes.textField}
          value={this.state.location}
          onChange={this.handleChange('location')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="yearsOfExperience"
          label="yearsOfExperience"
          className={classes.textField}
          value={this.state.yearsOfExperience}
          onChange={this.handleChange('yearsOfExperience')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="rating"
          label="rating"
          className={classes.textField}
          value={this.state.rating}
          onChange={this.handleChange('rating')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="reports"
          label="reports"
          className={classes.textField}
          value={this.state.reports}
          onChange={this.handleChange('reports')}
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
          id="events"
          label="events"
          className={classes.textField}
          value={this.state.events}
          onChange={this.handleChange('events')}
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

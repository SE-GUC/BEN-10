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

onUpdate =async()=>{
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
  
  await axios.put(`${server}/api/consultancyagency/${this.props.agency._id}`,body)
  .then(res=>{ 
    console.log(res.status);
   return res.data
})
.then(json => this.setState({project : json}))
await axios
      .get(`${server}/api/partners/${this.props.agency._id}`)
      .then(res => {
        return res.data;
      })
      .then(a =>{
        localStorage.setItem('type',"consultancyagency");
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
          id="name"
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
        />  
        <TextField
          id="about"
          label="About"
          className={classes.textField}
          value={this.state.about}
          onChange={this.handleChange('about')}
          margin="normal"
          variant="outlined"
        /> 
        <TextField
          id="telephoneNumber"
          label="Telephone Number"
          className={classes.textField}
          value={this.state.telephoneNumber}
          onChange={this.handleChange('telephoneNumber')}
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
          id="location"
          label="Location"
          className={classes.textField}
          value={this.state.location}
          onChange={this.handleChange('location')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="years Of Experience"
          label="yearsOfExperience"
          className={classes.textField}
          value={this.state.yearsOfExperience}
          onChange={this.handleChange('yearsOfExperience')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="rating"
          label="Rating"
          className={classes.textField}
          value={this.state.rating}
          onChange={this.handleChange('rating')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="reports"
          label="Reports"
          className={classes.textField}
          value={this.state.reports}
          onChange={this.handleChange('reports')}
          margin="normal"
          variant="outlined"
        />
        {
        // <TextField
        //   id="partners"
        //   label="Partners"
        //   className={classes.textField}
        //   value={this.state.partners}
        //   onChange={this.handleChange('partners')}
        //   margin="normal"
        //   variant="outlined"
        // />
        // <TextField
        //   id="projects"
        //   label="Projects"
        //   className={classes.textField}
        //   value={this.state.projects}
        //   onChange={this.handleChange('projects')}
        //   margin="normal"
        //   variant="outlined"
        // />
        
        // <TextField
        //   id="events"
        //   label="Events"
        //   className={classes.textField}
        //   value={this.state.events}
        //   onChange={this.handleChange('events')}
        //   margin="normal"
        //   variant="outlined"
        // />
        }
      <UpdateButton onUpdate={this.onUpdate} />
      </form>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);

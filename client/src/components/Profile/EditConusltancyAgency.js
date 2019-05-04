import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
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
    marginBottom:50
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
    showPassword: false,
    personal:true
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
     events:this.state.events, 
  }
  
  await axios.put(`https://lirtenben.herokuapp.com/api/consultancyagency/${this.props.agency._id}`,body)
  .then(res=>{ 
    console.log(res.status);
   return res.data
})
.then(json => this.setState({project : json}))
await axios
      .get(`https://lirtenben.herokuapp.com/api/consultancyagency/${this.props.agency._id}`)
      .then(res => {
        return res.data;
      })
      .then(a =>{
        localStorage.setItem('type',"consultancyagency");
        localStorage.setItem('user',JSON.stringify(a.data));
        // window.location.reload();
      }
      );

}
handlePersonal = () =>{
  this.setState({personal:true})
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
      <div>
        <div style={{width:"20%" ,height:"100vh",float:"left"}}>
        
        <List component="nav" >
      <ListItem button onClick={this.handlePersonal}>
        <ListItemText primary="Personal Info" />
      </ListItem>
      <Divider />
      {/* <ListItem button divider>
        <ListItemText primary="Update" onClick={this.onUpdate} />
      </ListItem> */}

<Button style={{backgroundColor:"#283593",float:"left",marginTop:5}} onClick={this.onUpdate}>
       <h style={{color:"#fff",fontWeight:"bold"}}>
        Update
        </h>
      </Button>
      {/* <UpdateButton onUpdate={this.onUpdate} /> */}
      </List>
        </div>
        <div style={{width:"80%",height:"100vh",float:"right",display:"inline-block"}}>
        {(this.state.personal)?
        <div style={{display:"inline-block"}}>
        <div style={{marginButtom:55}}>
        
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
        />  
        <br></br>
        <TextField
          id="about"
          label="About"
          className={classes.textField}
          value={this.state.about}
          onChange={this.handleChange('about')}
          margin="normal"
          variant="outlined"
        /> 
        <br></br>
        <TextField
          id="telephoneNumber"
          label="Telephone Number"
          className={classes.textField}
          value={this.state.telephoneNumber}
          onChange={this.handleChange('telephoneNumber')}
          margin="normal"
          variant="outlined"
        />
        <br></br>
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
        <br></br>

       
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
        <br></br>
      
        <TextField
          id="location"
          label="Location"
          className={classes.textField}
          value={this.state.location}
          onChange={this.handleChange('location')}
          margin="normal"
          variant="outlined"
        />
        <br></br>
        <TextField
          id="years Of Experience"
          label="yearsOfExperience"
          className={classes.textField}
          value={this.state.yearsOfExperience}
          onChange={this.handleChange('yearsOfExperience')}
          margin="normal"
          variant="outlined"
        />
        <br></br>
        <TextField
          id="rating"
          label="Rating"
          className={classes.textField}
          value={this.state.rating}
          onChange={this.handleChange('rating')}
          margin="normal"
          variant="outlined"
        />
        
        
        
        
        
        
        </div>
        
        </div>
        :""}
        </div>









      </div>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);

import React, { Component } from "react";
import {Card} from '@material-ui/core/Card';
import {Button} from '@material-ui/core/Button';
//import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
//import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router , Route , withRouter } from "react-router-dom";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      age: props.age,
      gender: props.gender,
      e_mail: props.e_mail,
      experience_level: props.experience_level,
      phone_number: props.phone_number,
      


    };
  }
  viewProjects  = ()=>{
    let path = `/myProjects`;
    this.props.history.push({
      pathname : path
    });
  }

    viewEvents  = ()=>{
      let path = `/myEvents`;
      this.props.history.push({
        pathname : path
      });
    }
    class SimpleCard(props) {
      const { classes } = props;
  
  render() {

    const { classes } = this.props;
    return (
      
        <Card className="mb-2 text-muted">
      <CardContent>
        <Typography className="mb-2 text-muted" color="textSecondary" gutterBottom>
          Name: {this.state.name}
        </Typography>

        <Typography variant="h5" component="h2">
          Age: {this.state.age} <br />
          Experience level: {this.state.experience_level} <br /> 
          Phone number: {this.state.phone_number} <br /> 
          </Typography>

          </CardContent>
          <CardActions>
          <Button size="small">View Events
          onClick={this.viewEvents}</Button>
          <Button size="small">View Projects
          onClick={this.viewEvents}</Button>
          </CardActions>
          </Card>
            /* <Card.Subtitle className="mb-2 text-muted">e-mail: {this.state.e_mail}</Card.Subtitle>
            
            <Card.Text><div>Age: {this.state.age} <br />
             
             Experience level: {this.state.experience_level} <br /> 
             Phone number: {this.state.phone_number} <br /> 
              </div> </Card.Text>
             <Button variant="contained"
             onClick={this.viewEvents}>View Events</Button>
             <Button variant="contained"
             onClick={this.viewProjects} >View Projects</Button> */
         
        
      
    )}
    }
}
export default withRouter(Profile);
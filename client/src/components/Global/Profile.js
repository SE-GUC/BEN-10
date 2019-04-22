import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import classes from "classnames";
import  { Redirect } from 'react-router-dom'
import background from './background.png'
import styles from './Profile.css'
const server = require("../../config");

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      user:JSON.parse(localStorage.getItem('user')),
      type:localStorage.getItem('type'),
      redirectEvents:false,
      redirectProjects:false,
      loading:false
    }
    this.viewEvents = this.viewEvents.bind(this);
    this.viewProjects = this.viewProjects.bind(this);

  }
  viewProjects = () => {
    this.setState({redirectProjects:true})
  };

  viewEvents = () => {
    this.setState({redirectEvents:true})
  };

  componentDidMount(){
    if(this.props.flag){
      this.setState({
        user:this.props.user,
        type:this.props.type,
        loading:true
      })
    }
  }

 
  render() {
    if(this.state.redirectEvents){
        return <Redirect to = {{pathname :"/Events"}}/>
    }else{
      if(this.state.redirectProjects){
        return <Redirect to = {{pathname :"/Projects"}}/>
      }else{
        if(this.state.loading){
        
        if (
          this.state.type === "partner" ||
          this.state.type === "member" ||
          this.state.type === "admin"
        ) {
          let month = "";
          if (new Date(this.state.user.birthDate).getMonth() + 1 === 12) month = "01";
          else if (new Date(this.state.user.birthDate).getMonth() + 1 < 10)
            month = "0" + (new Date(this.state.user.birthDate).getMonth() + 1);
          else month = new Date(this.state.user.birthDate).getMonth() + 1;
          return (
            <Card class="card">
            <div class='media'/>
              <CardActionArea>
                
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={this.viewEvents}>
                  View Events
                </Button>
                <Button size="small" color="primary" onClick={this.viewProjects}>
                  View Projects
                </Button>
              </CardActions>
            </Card>
          );
        } else if (this.state.type === "consultancyagency") {
          return (
            <Card class="card">
              <CardActionArea>
                <CardMedia class="media" title="Profile" />
                <CardContent>
                  Name: {this.state.user.name} <br />
                  Telephone Number: {this.state.user.telephoneNumber} <br />
                  E-mail: {this.state.user.email} <br />
                  Location: {this.state.user.location} <br />
                  Years Of Experience: {this.state.user.yearsOfExperience} <br />
                  Rating: {this.state.user.rating} <br />
                  Reports: {this.state.user.reports} <br />
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={this.viewEvents}>
                  View Events
                </Button>
                <Button size="small" color="primary" onClick={this.viewProjects}>
                  View Projects
                </Button>
              </CardActions>
            </Card>
          );
        }
      } else {
          return <div />;
        }
      }
      }
    }
   
}
Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Profile;

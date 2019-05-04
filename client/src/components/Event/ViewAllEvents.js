import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router , Route , withRouter } from "react-router-dom";
import classes from'classnames' ;
import axios from "axios";
import AllEventsCard from './AllEventsCard';
import { LinearProgress } from '@material-ui/core';
const server = require("../../config");

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};


class ViewAllEvents extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      events:null,
     
    };
  }
  componentDidMount(){
    axios 
    .get(`${server}/api/events`)
    .then(res => res.data)
    .then(a =>{
      console.log(a)
      this.setState({
       events:a.data
      })
    }
    );
  }
  render(){
    const { classes } = this.props;
    if(this.state.events){
      console.log("yessss")
      console.log(this.state.events)
    return (
      
      this.state.events.map((p,i)=> <AllEventsCard key={i} p={p} /> )
      );
    }else{
      return(
        <LinearProgress/>
      )
    }
    }
  }
  ViewAllEvents.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default (withRouter(ViewAllEvents));
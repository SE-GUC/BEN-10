import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Button } from "react-bootstrap";
import Typography from '@material-ui/core/Typography';
import { Route , withRouter} from 'react-router-dom';
import {Redirect ,Link} from 'react-router-dom'
import { Paper } from '@material-ui/core';
const server = require("../../config");


const styles = {
  block:{
    marginTop:10,
    display:"inline-block",
    marginLeft:20
    

  },
  card: {
    minWidth: 475,
    maxWidth: 800,
    display:"inline-block",
    marginBottom:5,
    marginRight:100
    
  },
  Link:{
    fontFamily:"Arial",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 23,
    paddingLeft:10
 
    }
    ,
    secondTypo:{
      fontFamily:"Montserrat",
      fontStyle: "normal",
      fontSize:20,
      color:"#616161",
      paddingLeft:10
  

  },
  firstTypo:{
    fontFamily:"Arial",
    fontStyle:"normal",
    fontSize:22,
    color:"#000000",
    paddingLeft:10,
    fontWeight:"bolder",
    fontVariant:"small-caps"

  },
};

class MyEventCard extends Component{
    constructor(props){
        super(props)
        this.viewEvent = this.viewEvent.bind(this);
        this.state = {
          redirect:false
      }
    }
    viewEvent() {
      this.setState({redirect:true})
    }

    
render(){    
    const { classes } = this.props;
    if(this.state.redirect){
      const path = `/Events/${this.props.event._id}`
      return <Redirect to={path}/>;
    }else{
return (
    
    <div 
    className={classes.block}
    
    >
    <Link to={`/Events/${this.props.event._id}`}>
        <Paper 
        className={classes.card}
        >
        <div style={{width:600}}>
          
          <a
  href= {""}
  className={classes.Link}
  >
  {this.props.event.eventType}

    </a>
          
          <Typography className={classes.secondTypo} >
          This event implies {this.props.event.description}<br></br> 
          and it will take place in {this.props.event.eventLocation}
          and in {new Date(this.props.event.eventDate).getFullYear()+"-"+((new Date(this.props.event.eventDate).getMonth())+1)+"-"+new Date(this.props.event.eventDate).getDate()}<br></br>
          it covers the following topics {this.props.event.topics}
          
           </Typography>
           </div>

        </Paper>
        </Link>
    </div>
  );
}
}
}

MyEventCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyEventCard);

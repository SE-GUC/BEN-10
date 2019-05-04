import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router'
const server = require("../../config");

const styles = {
  block:{
  },
  card: {
    minWidth: 475,
    maxWidth: 800,
    marginBottom:5,
    paddingBottom:50
    
    
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

class AllEventsCard extends React.Component {
    constructor(props){
        super(props)
        this.state={
            redirect:false
        }
    }

    redirectEvent =()=>{
        this.setState({
            redirect:true
        })
    }
    render(){
  const { classes } = this.props;
  if(this.state.redirect){
    return <Redirect to={`/Events/${this.props.p._id}`}/>;
  }else{
  return (
    <div 
    className={classes.block}
    
    >
        <Paper 
        className={classes.card}
        >
          
          <a
  href= {""}
  onClick={this.redirectEvent}
  className={classes.Link}
  >
  {this.props.p.eventType}

    </a>
    <Typography className={classes.firstTypo}>
    description
          </Typography>
          <Typography className={classes.secondTypo}>
          {this.props.p.description}
          </Typography>

          <Typography className={classes.firstTypo}>
          speaker
          </Typography>
          <Typography className={classes.secondTypo}>
          {this.props.p.speaker} 
          </Typography>

          <Typography className={classes.firstTypo}>
          event location
          </Typography>
          <Typography className={classes.secondTypo}>
          {this.props.p.eventLocation}
          </Typography>

          <Typography className={classes.firstTypo}>
          topics 
          </Typography>
          <Typography className={classes.secondTypo}>
          {this.props.p.topics.map(l=>l+" ")}
          </Typography>

          <Typography className={classes.firstTypo}>
          event date 
          </Typography>
          <Typography className={classes.secondTypo}>
          {new Date(this.props.p.eventDate).getFullYear()+"-"+((new Date(this.props.p.eventDate).getMonth())+1)+"-"+(new Date(this.props.p.eventDate).getDate())}
          </Typography>


          

          
          

        </Paper>
    
    </div>
  );
}
    }
}

AllEventsCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllEventsCard);

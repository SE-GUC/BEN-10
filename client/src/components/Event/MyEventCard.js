import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Route , withRouter} from 'react-router-dom';
import {Redirect} from 'react-router-dom'
import { Paper } from '@material-ui/core';
const server = require("../../config");


const styles = {
  block:{
    // marginLeft:100,
    // maxWidth: 845,
    // display: "inline-block"

  },
  card: {
    marginLeft:10,
    maxWidth: 860,
    marginBottom:5
    // backgroundColor:""
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  Link:{
    fontFamily:"Arial",
    fontStyle: "normal",
    // fontVariant: "small-caps",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "justify",
    paddingLeft:10
    // marginLeft:30
    // display: "inline-block"
    },
  
  
  secondTypo:{
      fontFamily:"Montserrat",
      fontStyle: "normal",
      fontSize:16,
      color:"#616161",
      textAlign: "justify",
      paddingLeft:10
      // marginLeft:30
      // display: "inline-block"

  }
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
    // <Card className={classes.card}>
    //   <CardActionArea onClick = {this.viewEvent}>
    //     <CardContent>
    //       <Typography className={classes.firstTypo} >
    //       topics
    //       </Typography>
    //       <Typography className={classes.secondTypo} >
    //       {this.props.event.topics.toString()} </Typography>
    //       <Typography className={classes.firstTypo} >
    //       event type
    //       </Typography>
    //       <Typography className={classes.secondTypo} >
    //       {this.props.event.eventLocation}
    //        </Typography>
    //        <Typography className={classes.firstTypo} >
    //        description
    //       </Typography>
    //       <Typography className={classes.secondTypo} >
    //       {this.props.event.description}
    //        </Typography>
    //     </CardContent>
    //   </CardActionArea>
    //   <CardActions>
    //   </CardActions>
    // </Card>
    <div 
    className={classes.block}
    
    >
        <Paper 
        className={classes.card}
        >
          
          <a
  href= {`/Events/${this.props.event._id}`}
  className={classes.Link}
  >
  {this.props.event.eventType}

    </a>
          
          <Typography className={classes.secondTypo} >
          This event implies {this.props.event.description}<br></br> 
          and it will take place in {this.props.event.eventLocation}
          and in {this.props.event.eventDate}<br></br>
          it covers the following topics {this.props.event.topics}
          
           </Typography>

        </Paper>
    
    </div>
  );
}
}
}

MyEventCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyEventCard);

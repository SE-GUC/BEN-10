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


const styles = {
  card: {
    width: 300,
    backgroundColor:"#006064",
    marginBottom:10,
    marginLeft:530
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  text:{
    color:"#ffc107"
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
      const path = `/myEvents/${this.props.event._id}`
      return <Redirect to={path}/>;
    }else{
return (
    <Card className={classes.card}>
      <CardActionArea onClick = {this.viewEvent}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          </Typography>
          <Typography className={classes.text} component="p">
          topics: {this.props.event.topics} <br></br>
          eventType:{this.props.event.eventLocation}<br></br>
          description: {this.props.event.description}<br></br>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
  );
}
}
}

MyEventCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyEventCard);

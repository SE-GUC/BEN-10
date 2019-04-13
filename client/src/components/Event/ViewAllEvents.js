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

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};
``

class ViewAllEvents extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      eventType: props.eventType,
      eventLocation: props.eventLocation,
      description: props.description,
      registPrice: props.registPrice,
      remainingPlace: props.remainingPlace,
      topics: props.topics,
      speaker: props.speaker,
      registStartDate: props.registStartDate,
      registExpiryDate: props.registExpiryDate,
      eventDate: props.eventDate,
      bookedMembers: props.bookedMembers,
      formLink: props.formLink
    };
  }

  render(){
  //const { classes } = this.props;
  return (
    this.state.events.map(e=> (<Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            title="Events"
          />
          <CardContent>
          Type: {e.eventType} <br />
          Location: {e.eventLocation} <br />
          Description: {e.description} <br /> 
          Registration Price: {e.registPrice} <br /> 
          Remaining Place: {e.remainingPlace} <br /> 
          Topics: {e.topics} <br /> 
          Speaker: {e.speaker} <br />
          Registration Start Date: {e.registStartDate} <br /> 
          Registration Expiry Date: {e.registExpiryDate} <br /> 
          Event Date: {e.eventDate} <br />
          Booked Members: {e.bookedMembers} <br /> 
          Form Link: {e.formLink} <br />
        
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary"
          onClick={this.viewEvents}>View Events
          </Button>
          <Button size="small" color="primary"
          onClick={this.viewProjects}>View Projects
          </Button>
        </CardActions>
      </Card>)));
    
  }
}
Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withRouter(Profile));
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
import { Redirect } from 'react-router'
const server = require("../../config");

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
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
    <Card className={classes.card}>
      <CardActionArea onClick={this.redirectEvent}>
       
        <CardContent>
         
          <Typography component="p">
          Event Type: {this.props.p.eventType} <br />
          Event Location: {this.props.p.eventLocation} <br />
          Description: {this.props.p.description} <br /> 
          Topics: {this.props.p.topics} <br /> 
          Speaker: {this.props.p.speaker} <br />
          Event Date: {this.props.p.eventDate} <br />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
    }
}

AllEventsCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllEventsCard);

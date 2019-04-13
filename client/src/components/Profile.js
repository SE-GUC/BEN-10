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

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: props.name,
      age: props.age,
      gender: props.gender,
      e_mail: props.e_mail,
      experience_level: props.experience_level,
      phone_number: props.phone_number
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
  render(){
  //const { classes } = this.props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          title="Profile"
        />
        <CardContent>
        Name: {this.state.name} <br />
        e_mail: {this.state.e_mail} <br />
        Experience level: {this.state.experience_level} <br /> 
        Phone number: {this.state.phone_number} <br /> 
          
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
    </Card>
    );
  }
}
Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withRouter(Profile));
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

class ViewAllProjects extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      description: props.description,
      category: props.category,
      wantConsultancy: props.wantConsultancy,
      estimatedEffort: props.estimatedEffort,
      estimatedTime: props.estimatedTime,
      experienceLevelNeeded: props.experienceLevelNeeded,
      requiredSkillsSet: props.requiredSkillsSet
    };
  }

  render(){
  //const { classes } = this.props;
  return (
    this.state.projects.map(p=> (<Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            title="Projects"
          />
          <CardContent>
          Description: {p.description} <br />
          Category: {p.category} <br />
          Want Consultancy: {p.wantConsultancy} <br /> 
          Estimated Effort: {p.estimatedEffort} <br /> 
          Estimated Time: {p.estimatedTime} <br /> 
          Experience Level Required: {p.experienceLevelNeeded} <br /> 
          Skills Required: {p.requiredSkillsSet} <br />
            
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
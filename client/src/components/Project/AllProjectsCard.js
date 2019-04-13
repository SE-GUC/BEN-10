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

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

class AllProjectsCard extends React.Component {
    constructor(props){
        super(props)
        this.state={
            redirect:false
        }
    }

    redirectProject =()=>{
        this.setState({
            redirect:true
        })
    }
    render(){
  const { classes } = this.props;
  if(this.state.redirect){
    return <Redirect to={`/ProjectId/${this.props.p._id}`}/>;
  }else{
  return (
    <Card className={classes.card}>
      <CardActionArea onClick={this.redirectProject}>
       
        <CardContent>
         
          <Typography component="p">
          Description: {this.props.p.description} <br />
          Category: {this.props.p.category} <br />
          Estimated Effort: {this.props.p.estimatedEffort} <br /> 
          Experience Level Required: {this.props.p.experienceLevelNeeded} <br /> 
          Life Cycle: {this.props.p.lifeCycle} <br />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
    }
}

AllProjectsCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllProjectsCard);

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
    marginLeft:500
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  text:{
    color:"#ffc107"
  }
};

class MyProjectCard extends Component{
    constructor(props){
        super(props)
        this.viewProject = this.viewProject.bind(this);
        this.state = {
          redirect:false
      }
    }
    viewProject() {
      this.setState({redirect:true})
    }

    
render(){    
    const { classes } = this.props;
    if(this.state.redirect){
      const path = `/MyProject/${this.props.project._id}`
      return <Redirect to={path}/>;
    }else{
return (
    <Card className={classes.card}>
      <CardActionArea onClick = {this.viewProject}>
        <CardContent>
          <Typography  gutterBottom variant="h5" component="h2">
          </Typography>
          <Typography className={classes.text} component="p">
          Company name:{this.props.project.company}<br></br>
          description: {this.props.project.description}<br></br>
          life_cycle:{this.props.project.life_cycle}<br></br>
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


MyProjectCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyProjectCard);

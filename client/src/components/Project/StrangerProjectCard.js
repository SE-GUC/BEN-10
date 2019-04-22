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
import Link from '@material-ui/core/Link';
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

class StrangerProjectCard extends Component{
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
      const path = `/Projects/${this.props.project._id}`
      return <Redirect to={path}/>;
    }else{
return (
    <div 
    className={classes.block}
    
    >
        <Paper 
        className={classes.card}
        >
          
          <a
  href= {`/Projects/${this.props.project._id}`}
  className={classes.Link}
  >
  {this.props.project.name.toString()}

    </a>
          
          <Typography className={classes.secondTypo} >
          our project implies {this.props.project.description+" "} 
          the project's category is {this.props.project.category+" "}
          the project is currently {this.props.project.lifeCycle+" "}
          the estimated effort for this project is {this.props.project.estimatedEffort+" "} 
           the experience level needed for this project is {this.props.project.experienceLevelNeeded+" "}
          the needed skills for this project are {this.props.project.requiredSkillsSet}
           </Typography>

        </Paper>
    
    </div>
  );
}
}
}

StrangerProjectCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StrangerProjectCard);

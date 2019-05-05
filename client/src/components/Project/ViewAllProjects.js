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
import GridList from "@material-ui/core/GridList";
import GridListTile from '@material-ui/core/GridListTile';
import { BrowserRouter as Router , Route , withRouter } from "react-router-dom";
import classes from'classnames' ;
import axios from "axios";
import AllProjectsCard from './AllProjectsCard'
import MyProjectCard from './MyProjectCard';
import { LinearProgress } from '@material-ui/core';

const server = require("../../config");

const styles = theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // justifyContent: 'space-around',
    // overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
    // margin:"auto"
  },
  gridList: {
    width: "auto",
    height: "auto",
  },
});


class ViewAllProjects extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      projects: null
      
    };
  }
  componentDidMount(){
    axios 
    .get(`https://lirtenben.herokuapp.com/api/projects`,{
      headers: { "Content-Type": "application/json",
      "Authorization": "bearer " + localStorage.getItem('token')
     }
    })
    .then(res => res.data)
    .then(a =>{
      console.log(a)
      this.setState({
       projects:a.data
      })
    }
    );
  }

  render(){
  const { classes } = this.props;
  if(this.state.projects){
  return (
    <div className={classes.root}>
    <br></br>
      
    {/* <GridList cellHeight={"auto"} className={classes.gridList}> */}
        
      {this.state.projects.map((p,i)=> <MyProjectCard key={i} type={this.props.type} project={p} /> )}
      
      {/* </GridList> */}
      
    </div>
  )
  }else{
    return(
      <LinearProgress/>
    )
  }
  }
}
ViewAllProjects.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(ViewAllProjects));
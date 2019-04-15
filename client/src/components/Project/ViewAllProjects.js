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
import axios from "axios";
import AllProjectsCard from './AllProjectsCard'
import MyProjectCard from './MyProjectCard';

const server = require("../../config");

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};


class ViewAllProjects extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      projects: null
      
    };
  }
  componentDidMount(){
    axios 
    .get(`${server}/api/projects`)
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
    console.log("yessss")
  return (
    this.state.projects.map((p,i)=> <MyProjectCard key={i} type={this.props.type} project={p} /> ));
  }else{
    return(
      <div>loooding</div>
    )
  }
  }
}
ViewAllProjects.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withRouter(ViewAllProjects));
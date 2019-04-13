import React, { Component } from "react";
import Project from "../components/Project/project";
import axios from "axios";
import PostProjectButton from "../components/PostProjectButton";
import {Redirect} from 'react-router-dom'
import  PropTypes from 'prop-types'; 
import { BrowserRouter as Router , Route } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import classes from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import color from "@material-ui/core/colors/blueGrey";
import style from './MyProjects.css'
import { blue } from "@material-ui/core/colors";


class MyProjects extends Component {
  constructor(props){
    super(props)
    this.routeChange = this.routeChange.bind(this)
    this.state = {
    projects: null,
    partner_id:props.user,
      redirect: false
  };
}
  async componentDidMount(){
    await axios.get(`http://localhost:5000/api/partners/${this.state.partner_id}/myProjects`)
    .then(res => {
      return res.data; 
    })
  .then(projects=>{
      this.setState({projects:projects.data})
  })
  console.log(this.state.projects)
}
routeChange() {
    this.setState({redirect:true})

  }
 
  render() {
    const { redirect  } = this.state;

    if(redirect){
      return <Redirect to='/postProject'/>;
    }else{
    if (this.state.projects === null) {
      return (
        <div className="App">
          <label>Loading....</label>
        </div>
      );
    } else {
      return (
        <div className={classes(classes.layout, classes.cardGrid)} class="container">
            
        <Grid container spacing={24} style={{padding: 24}}>
            {this.state.projects.map(i => (    
              <Grid item xs={12} sm={6} lg={4} xl={3} style={{backgroundColor:"white"}}>
                <Project type= {this.state.type} user={this.state.user} project={i} key={i._id} />
                </Grid> 
                
                )) }
            </Grid>
          
        <PostProjectButton name={"Request a Project"} routeChange={this.routeChange}/>
        </div>
      );
    }
  }
}
}

export default MyProjects;
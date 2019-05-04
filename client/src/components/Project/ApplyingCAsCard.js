import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ApplyingCAButton from "./ApplyingCAButton";
const server = require("../../config");

const styles = theme => ({
  card: {
    minWidth: 400,
    maxWidth:800,
    display:"inline-block"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});
class ApplyingCAsCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      ID: this.props.ca,
      name: null,
      about : null,
      yearsOfExperience : null,
      location: null
    };
  }

  async componentDidMount(){
    await axios(`https://lirtenben.herokuapp.com/api/consultancyagency/${this.state.ID}/`,{
      headers: { "Content-Type": "application/json",
      "Authorization": "bearer " + localStorage.getItem('token')
     }
    })
    .then(res=>{
      if(res.status===200)
        return res.data
      else
       return null;
    })
    .then(ca=>{  
      if(ca!=null){
        this.setState({
          name:ca.data.name,
          about:ca.data.about,
          yearsOfExperience:ca.data.yearsOfExperience,
          location:ca.data.location
        })
      }
    });
  }

  render() {
    const { classes } = this.props;
    if(this.state.name!==null){
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
          <Typography  style={{fontSize:25,fontWeight:"bold",fontFamily:"Arial",fontVariant:"small-caps",textAlign:"center"}} color="textSecondary" gutterBottom>
             name: 
            </Typography>
            <Typography style={{fontSize:20,fontFamily:"Arial",textAlign:"center"}}>
            {this.state.name}</Typography>
            <Typography  style={{fontSize:25,fontWeight:"bold",fontFamily:"Arial",fontVariant:"small-caps",textAlign:"center"}} color="textSecondary" gutterBottom>
             location: 
            </Typography>
            <Typography style={{fontSize:20,fontFamily:"Arial",textAlign:"center"}}>
            {this.state.location}</Typography>
            <Typography  style={{fontSize:25,fontWeight:"bold",fontFamily:"Arial",fontVariant:"small-caps",textAlign:"center"}} color="textSecondary" gutterBottom>
            years of experience: 
            </Typography>
            <Typography style={{fontSize:20,fontFamily:"Arial",textAlign:"center"}}>
            {this.state.yearsOfExperience}</Typography>
            <Typography  style={{fontSize:25,fontWeight:"bold",fontFamily:"Arial",fontVariant:"small-caps",textAlign:"center"}} color="textSecondary" gutterBottom>
             about: 
            </Typography>
            <Typography style={{fontSize:20,fontFamily:"Arial",textAlign:"center"}}>
            {this.state.about}</Typography>
            {console.log(this.props.project)}
            <ApplyingCAButton project={this.props.project} admin={this.props.admin} ca={this.props.ca} />
        </CardContent>
        
      </Card>
    </div>
    );}
    else{
      return(
      <div className={classes.root}></div>
      )
    }
  }
}


ApplyingCAsCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApplyingCAsCard);

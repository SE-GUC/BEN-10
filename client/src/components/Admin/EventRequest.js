// DOOOOODIE'S WORLD
import { Paper } from '@material-ui/core';
import React,{ Component } from "react";
import Approve from "./ApproveRequest"
import Disapprove from "./DisapproveRequest"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { LinearProgress } from "@material-ui/core";
import { right } from '@material-ui/system/positions';
const server = require("../../config");

const styles = {
  
  block:{

  },
  card: {
    minWidth: 475,
    maxWidth: 800,
    // display:"inline-block",
    marginBottom:5,
    // backgroundColor:"yellow",
    position:"center",
    marginLeft:10,
    marginTop:5
    
  },
  Link:{
    fontFamily:"Arial",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 23,
    paddingLeft:10
 
    }
    ,
    secondTypo:{
      fontFamily:"Montserrat",
      fontStyle: "normal",
      fontSize:20,
      color:"#616161",
      paddingLeft:10
  

  },
  firstTypo:{
    fontFamily:"Arial",
    fontStyle:"normal",
    fontSize:22,
    color:"#000000",
    paddingLeft:10,
    fontWeight:"bolder",
    fontVariant:"small-caps"

  },
  };
class EventRequest extends Component{
    constructor(props){
        super(props);
        this.state={
            body:this.props.body,
            requestorName:""

        }
    }
    componentDidMount(){
        fetch(`${server}/api/consultancyagency/${this.state.body.requestorId}`,{
          headers: { "Content-Type": "application/json",
          "Authorization": "bearer " + localStorage.getItem('token')
         }
        })
    .then(res=>{return res.json()}).then(
       result=>{
         if(result.error!==undefined){
           this.setState({
             requestorName:null
           })

         }
         else{
              this.setState({
            requestorName:result.data.name
        })

         }
       }
    )
    if(this.state.requestorName==null){
    fetch(`${server}/api/partners/${this.state.body.requestorId}`,
    {
      headers: { "Content-Type": "application/json",
      "Authorization": "bearer " + localStorage.getItem('token')
     }
    })
    .then(res=>{return res.json()}).then(
       result=>{
        if(result.msg!==undefined){
          this.setState({
            requestorName:null
          })

        }
        else{
             this.setState({
           requestorName:result.data.firstName+" "+result.data.lastName
       })

        }
         
       }
    )

    }
        

    }
        
    render(){
        const { classes } = this.props;
        let day=""
        let month=""
        if(new Date(this.state.body.eventDate).getDate()<10)
           day="0"+new Date(this.state.body.eventDate).getDate()
        if((new Date(this.state.body.eventDate).getMonth()+1)<10)
           month="0"+(new Date(this.state.body.eventDate).getMonth()+1)
        if(new Date(this.state.body.eventDate).getMonth()===12)
           month="01"
           if(true){
             if(this.state.body.isAccepted!=null){
        return(
          
          <div className={classes.block}>
          <Paper 
        className={classes.card}
        >
          
          {/* <Typography className={classes.Link}>
          {this.state.requestorName} sends you an event request
          </Typography> */}
          <div style={{width:600 , paddingBottom:6}}>
          
          <Typography className={classes.firstTypo}>
          description
          </Typography>
          <Typography className={classes.secondTypo}>
          {this.state.body.description}
          </Typography>

          <Typography className={classes.firstTypo}>
          event type
          </Typography>
          <Typography className={classes.secondTypo}>
          {this.state.body.eventType}
          </Typography>

          <Typography className={classes.firstTypo}>
          event location
          </Typography>
          <Typography className={classes.secondTypo}>
          {this.state.body.eventLocation}
          </Typography>

          <Typography className={classes.firstTypo}>
          event date
          </Typography>
          <Typography className={classes.secondTypo}>
          {day+"-"+month+"-"+new Date(this.state.body.eventDate).getFullYear()}
          </Typography>

           <Approve admin_id={this.props.admin_id} eid={this.state.body._id} requestorId={this.state.body.requestorId}/>
           <Disapprove admin_id={this.props.admin_id} eid={this.state.body._id} requestorId={this.state.body.requestorId}/>

          </div>
        </Paper>

          </div>
        )
           }
           else{
             return(
             <LinearProgress/>
             )
           }
           }
           
        
    }


}
EventRequest.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(EventRequest);
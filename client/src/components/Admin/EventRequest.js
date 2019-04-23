// DOOOOODIE'S WORLD
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
const server = require("../../config");

const styles = {
    card: {
      minWidth: 275,
      marginLeft:500,
      marginRight:600,
      marginTop:20,
      backgroundColor:"#e8eaf6"
      
    },
   
    
    title: {
      fontSize: 10,
      color:"#283593"
    },
    pos: {
      marginBottom: 10,
      color:"#303f9f",
      fontSize:16
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
        fetch(`${server}/api/consultancyagency/${this.state.body.requestorId}`)
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
    fetch(`${server}/api/partners/${this.state.body.requestorId}`)
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
            <div>
                <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title}  gutterBottom>
         <h5> {this.state.requestorName} sends you an event request</h5>
        </Typography>
        
        <Typography className={classes.pos} color="textSecondary">
          Description<br/>
          {this.state.body.description}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Event Type<br/>
          {this.state.body.eventType}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Event Location<br/>
          {this.state.body.eventLocation}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Date<br/>
          {day+"-"+month+"-"+new Date(this.state.body.eventDate).getFullYear()}
        </Typography>
        
      </CardContent>
      <CardActions>
          <Approve admin_id={this.props.admin_id} eid={this.state.body._id} requestorId={this.state.body.requestorId}/>
          {console.log(this.state.body)}
          <Disapprove admin_id={this.props.admin_id} eid={this.state.body._id} requestorId={this.state.body.requestorId}/>
      </CardActions>
    </Card>
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
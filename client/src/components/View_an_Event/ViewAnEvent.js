import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Nav from '../Global/PrimarySearchAppBar'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Event from "./event";
import Requestor from "./requestor";
import Booker from "./booker"
import Axios from "axios";
import Loading from "../Global/loading";

const server = require("../../config");

const styles = {
  
};

class SimpleCard extends React.Component {
  constructor(props){
    super(props);
    this.state={
      showBooker:false,
      showEvent:true,
      showMember:false,
      Event:null,
      eventId:this.props.match.params.id,
      loading:false

    }
  }
  handleBooker = () =>{
    this.setState({showBooker:true})
    this.setState({showEvent:false})
    this.setState({showMember:false})

  }
  handleEvent = () =>{
    this.setState({showBooker:false})
    this.setState({showEvent:true})
    this.setState({showMember:false})

  }
  handleMembers = () =>{
    this.setState({showBooker:false})
    this.setState({showEvent:false})
    this.setState({showMember:true})

  }
  async componentDidMount(){
    // console.log(`${server}/api/events/${}`)
    await Axios.get(`https://lirtenben.herokuapp.com/api/events/${this.props.match.params.id}`,{
      headers: { "Content-Type": "application/json",
      "Authorization": "bearer " + localStorage.getItem('token')
     }
    })
      .then(res => res.data)
      .then(event =>{
        localStorage.setItem('event',JSON.stringify(event.data))
        this.setState({loading:true})
      }
        )
        }
      
      
  

  render(){
    if(this.state.loading){
    return(
        <div> 
        <Nav value={2}/>
        <div style={{width:"20%" ,height:"100vh",float:"left"}}>
        
        <List component="nav" >
      <ListItem button onClick={this.handleEvent}>
        <ListItemText primary="Event" />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="Booker" onClick={this.handleBooker} />
      </ListItem>
      
      <Divider/>  
      <ListItem button divider>
        <ListItemText primary="Booking Members" onClick={this.handleMembers} />
      </ListItem>   
    </List>
        </div>
        <div style={{width:"80%",height:"100vh",float:"right",display:"inline-block"}}>
        {(this.state.showBooker)?
        <div >
                    <Requestor/>

          
        </div>
        :""}
        {(this.state.showEvent)?
        <div >
          <Event />

        </div>
        :""}
         {(this.state.showMember)?
        <div >
                    <Booker/>

        </div>
        :""}
                    
                    
                    </div>
                </div>


    )}
    else{
      return(<Loading />)
    }
  }
  
}


SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);

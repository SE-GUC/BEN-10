import React, { Component } from "react";
import ExpansionPanelER from "../components/Event/ExpansionPanelER";
import ViewAllEvents from '../components/Event/ViewAllEvents'
import PMyEvent from "../components/Event/PartnerMyEvents"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MMyEvent from "../components/Event/MemberMyEvents"
import CAMyEvent from "../components/Event/CAMyEvents"
import ViewAllEventRequests from "../components/Admin/ViewAllEventRequests"
import Nav from '../components/Global/PrimarySearchAppBar'
const server = require("../../src/config");

class Events extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        user:JSON.parse(localStorage.getItem('user')),
        type:localStorage.getItem('type'),
        reload: true,
        eventRequest:false,
        AllEvents:false,
        MyEvents:false
        };
    }
    handleER = () =>{
        this.setState({eventRequest:true})
        this.setState({AllEvents:false})
        this.setState({MyEvents:false})

    }
    handleAllEvents = () =>{
        this.setState({eventRequest:false})
        this.setState({AllEvents:true})
        this.setState({MyEvents:false})

    }
    handleMyEvents = () =>{
        this.setState({eventRequest:false})
        this.setState({AllEvents:false})
        this.setState({MyEvents:true})

    }

        
    render(){
        if(this.state.type==="admin"){
            console.log("hi")
            return(
                <div> 
                    <Nav value={2}/>
                    <div style={{width:"20%" ,height:"100vh",float:"left"}}>
        
        <List component="nav" >
      <ListItem button onClick={this.handleER}>
        <ListItemText primary="Event Requests" />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="All Events" onClick={this.handleAllEvents} />
      </ListItem>
      
      <Divider/>     
    </List>
        </div>
        <div style={{width:"80%",height:"100vh",float:"right",display:"inline-block"}}>
        {(this.state.eventRequest)?
        <div style={{display:"inline-block"}}>
        <ViewAllEventRequests admin_id={this.state.user._id}/>
        </div>
        :""}
        {(this.state.AllEvents)?
        <div style={{columns:2}}>
        <ViewAllEvents />
        </div>
        :""}
                    
                    
                    </div>
                    
                </div>);   
        }
        else if(this.state.type==="partner"){
            return(
            <div> 
                <Nav value={2}/>
                <div style={{width:"20%" ,height:"100vh",float:"left"}}>
        
        <List component="nav" >
      <ListItem button onClick={this.handleER}>
        <ListItemText primary="Submit Event Request" />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="My Events" onClick={this.handleMyEvents} />
      </ListItem>
      <ListItem button>
        <ListItemText primary="All Events" onClick={this.handleAllEvents} />
      </ListItem> 
      <Divider/>     
    </List>
        </div>
        <div style={{width:"80%",height:"100vh",float:"right"}}>
        {(this.state.eventRequest)?<ExpansionPanelER requestorId={this.state.user._id} requestedBy={this.state.user.name} />:""}
        {(this.state.MyEvents)?
        <div style={{columns:1}}>
        <PMyEvent id={this.state.user._id} />
      </div>
        :""}
        {(this.state.AllEvents)?
        <div style={{columns:2}}>
        <ViewAllEvents />
        </div>
        :""}
                
                
                
                </div>
            </div>);            
        }
        else if(this.state.type==="member"){
            return(
                <div> 
                    <Nav value={2}/>
                    <div style={{width:"20%" ,height:"100vh",float:"left"}}>
        
        <List component="nav" >
      <ListItem button onClick={this.handleMyEvents}>
        <ListItemText primary="My Events" />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="All Events" onClick={this.handleAllEvents} />
      </ListItem>
      
      <Divider/>     
    </List>
        </div>
        <div style={{width:"80%",height:"90vh",float:"right"}}>
        {(this.state.MyEvents)?<div ><MMyEvent id={this.state.user._id}/></div>:""}
        {(this.state.AllEvents)?<div style={{columns:2}}><ViewAllEvents /></div>:""}
                    
                    
                    </div>
                   
                   

                </div>);   
        }
        else if(this.state.type==="consultancyagency"){
            return(
            <div>
                <Nav value={2}/>
                <div style={{width:"20%" ,height:"100vh",float:"left"}}>
        
        <List component="nav" >
      <ListItem button onClick={this.handleER}>
        <ListItemText primary="Submit Event Request" />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="My Events" onClick={this.handleMyEvents} />
      </ListItem>
      <ListItem button>
        <ListItemText primary="All Events" onClick={this.handleAllEvents} />
      </ListItem> 
      <Divider/>     
    </List>
        </div>
        <div style={{width:"80%",height:"100vh",float:"right"}}>
        {(this.state.eventRequest)?<ExpansionPanelER requestorId={this.state.user._id} requestedBy={this.state.user.name} />:""}
             {(this.state.MyEvents)?
             <div style={{columns:2}}>
             <CAMyEvent id={this.state.user._id} />
             </div>
             :""}
             {(this.state.AllEvents)?
             <div style={{columns:2}}>
             <ViewAllEvents />
             </div>
             :""}   
                </div>
            </div>
            )
        }
        
    }
}
export default Events;

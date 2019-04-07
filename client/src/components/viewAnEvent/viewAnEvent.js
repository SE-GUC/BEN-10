import React, { Component } from "react";
import axios from "axios" ;
import { BrowserRouter as Router } from "react-router-dom";
import Route  from "react-router-dom/Route";
import {Card} from "react-bootstrap";

class viewAnEvent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        eventId : this.props.id ,
        items : null , 
        isLoaded : false 
    };

    }
    

    componentDidMount() {
        axios
          .get(`http://localhost:5000/api/events/${this.state.eventId}`)
          .then(res => {
            return res.data;
          })
          .then(a => this.setState({ items: a.data , isLoaded : true}));
      }

      render(){
          const event = this.state.items ;
          if(this.state.isLoaded)
         return (
             <div className = "App">
                 <Card  bg= "dark" text ="white" style= {{width :'18rem'}}>
                     <Card.Header >Event Info</Card.Header>
                     <Card.Body>
                         <Card.Title>{event.eventType}</Card.Title>
                         <Card.Text>
                             Requested By : {(event.requestedBy)?event.requestedBy:"None"}
                             <br></br>
                             Event Location : {(event.eventLocation)?event.eventLocation:"None"}
                             <br></br>
                             Description : {(event.description)?event.description:"None"}
                             <br></br>
                             Registeration Price : {(event.registPrice)?event.registPrice:"None"}
                             <br></br>
                             Remaining Places : {(event.remainingPlace)?event.remainingPlace:"None"}
                             <br></br>
                             Event Topics : {(event.topics)?event.topics.toString():"None"}
                             <br></br>
                             Speaker: {(event.speaker)?event.speaker:"None"}
                             <br></br>
                             Feedback : {(event.feedback)?event.feedback.toString():"None"}
                             <br></br>
                             Registeration Start Date : {(event.regist_start_date)?(new Date(event.regist_start_date)).getDate()+"/"+((new Date(event.regist_start_date)).getMonth()+1)+"/"+(new Date(event.regist_start_date)).getFullYear():"None"}
                             <br></br>
                             Registeration End Date: {(event.regist_expiry_date)?(new Date(event.regist_expiry_date)).getDate()+"/"+((new Date(event.regist_expiry_date)).getMonth()+1)+"/"+(new Date(event.regist_start_date)).getFullYear():"None"}
                             <br></br>
                             Event Date : {(event.eventDate)?(new Date(event.eventDate)).getDate()+"/"+((new Date(event.eventDate)).getMonth()+1)+"/"+(new Date(event.regist_start_date)).getFullYear():"None"}
                             <br></br>
                             Form Link: {(event.formLink)?event.formLink:"None"}

                         </Card.Text>
                     </Card.Body>

                 </Card>
             </div>
         )
         else 
         return (
             <label>Loading.. H</label>
         ) 

      }
}
export default viewAnEvent ;
import React, { Component } from "react";
import axios from "axios" ;
import { BrowserRouter as Router } from "react-router-dom";
import Route  from "react-router-dom/Route";
import {Card} from "react-bootstrap";

class viewAnEvent extends Component {
    constructor(props){
        super(props);
        this.state = {
        eventId : this.props.id ,
        items : [] , 
        isLoaded : false,
        RequestorId :[],
        CA :[],
        Admin:[],
        partner: [],
        mems:[],
        members:[]
         
    };

    }
    

    async componentDidMount() {
       
        await fetch('http://localhost:5000/api/events/'+this.state.eventId).then(res=>res.json())
          .then(proj=>this.setState({items: proj.data ,isLoaded : true,mems:proj.data.bookedMembers}))
          
    // await fetch('http://localhost:5000/api/partners/'+this.state.RequestorId).then(res=>res.json())
    //    .then(proj=>this.setState({partner:proj.data}))

    //    if(this.state.partner.length===0){
    //     await  fetch('http://localhost:5000/api/consultancyagency/'+this.state.RequestorId).then(res=>res.json())
    //    .then(proj=>this.setState({CA:proj.data}))}
         
    //   if(this.state.CA.length===0&&this.state.partner.length===0){
       
    //      await fetch('http://localhost:5000/api/admins/'+this.state.RequestorId).then(res=>res.json())
    //    .then(proj=>this.setState({Admin:proj.data}))
    //   }  
    for(var i=0;i<this.state.mems.length;i++){
       await  fetch('http://localhost:5000/api/members/'+this.state.mems[i]).then(res=>res.json())
      .then(proj=>this.setState({members: [...this.state.members,proj.data]}))
      }
      }

      render(){
          const event = this.state.items ;
          const member =this.state.members;
        //  const name =(this.state.CA.length===0)?((this.state.Admin.length===0)?(this.state.partner.firstName):this.state.Admin.firstName):this.state.CA.name
          if(this.state.isLoaded)
         return (
             <div className = "App">
                 <Card  bg= "dark" text ="white" style= {{width :'18rem'}}>
                     <Card.Header >Event Info</Card.Header>
                     <Card.Body>
                         <Card.Title>{event.eventType}</Card.Title>
                         <Card.Text>
                             {/* Requested By : {(event.requestorId)?event.requestorId:"None"} */}
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
                             <br></br>
                             <br></br>
                             bookedMembers : <ul>{this.state.members.map(s=><li key={s._id}>{s}</li>)}</ul>)}

                         </Card.Text>
                     </Card.Body>

                 </Card>
             </div>
         )
         else 
         return (
             <label>Loading...</label>
         ) 

      }
}
export default viewAnEvent ;
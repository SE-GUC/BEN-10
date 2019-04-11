import React, { Component } from "react";
import axios from "axios" ;
import { BrowserRouter as Router } from "react-router-dom";
import Route  from "react-router-dom/Route";
import {Button} from "react-bootstrap";
import SweetAlert from 'react-bootstrap-sweetalert';

class ApproveFinalDraft extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            approvingID : this.props.id ,
            pID : this.props.pid ,
            type : this.props.type ,
            alert : null 
        }
    }
    
    hideAlert() {
        console.log('Hiding alert...');
        this.setState({
          alert: null
        });
    }

    Approve = () => {
        if(this.state.type === "consultancyagency")
        {

            axios
            .put(
            `http://localhost:5000/api/consultancyagency/${this.state.approvingID}/myprojects/${this.state.pID}/finaldraft/approve`
          )
          .then(res => {
            if(res.error)
            {
                const getAlert = () => (
                    <SweetAlert 
                      danger 
                      title="Something went wrong!" 
                      onConfirm={() => this.hideAlert()}
                    >
                    {res.error}
                    </SweetAlert>
                  );
                  this.setState({
                    alert: getAlert()
                  });
            }
            else
            {
                const getAlert = () => (
                    <SweetAlert 
                      success 
                      title="Approved!" 
                      onConfirm={() => this.hideAlert()}
                    >
                    </SweetAlert>
                  );
                  this.setState({
                    alert: getAlert()
                  });
            }
          })
          
        
        
          
        }
        else {
            if(this.state.type === "partner")
            {
                
                 axios
                 .put(`http://localhost:5000/api/partners/${this.state.approvingID}/myprojects/${this.state.pID}/finaldraft/approve`)
                .then(res => {
                    console.log(res);
                 return res.data;
                })
                .then(res => {
                    if(res.error)
                    {
                        const getAlert = () => (
                            <SweetAlert 
                              danger 
                              title="Something went wrong!" 
                              onConfirm={() => this.hideAlert()}
                            >
                            {res.error}
                            </SweetAlert>
                          );
                          this.setState({
                            alert: getAlert()
                          });
                    }
                    else
                    {
                        const getAlert = () => (
                            <SweetAlert 
                              success 
                              title="Approved!" 
                              onConfirm={() => this.hideAlert()}
                            >
                            </SweetAlert>
                          );
                          this.setState({
                            alert: getAlert()
                          });
                    }
                  })

            }
        }

        
    
    }

    Disapprove = () => {
        if(this.state.type === "consultancyagency")
        {
            
         axios
          .put(
            `http://localhost:5000/api/consultancyagency/${this.state.approvingID}/myprojects/${this.state.pID}/finaldraft/disapprove`
          )
          .then(res => {
            if(res.error)
            {
                const getAlert = () => (
                    <SweetAlert 
                      danger 
                      title="Something went wrong!" 
                      onConfirm={() => this.hideAlert()}
                    >
                    {res.error}
                    </SweetAlert>
                  );
                  this.setState({
                    alert: getAlert()
                  });
            }
            else
            {
                const getAlert = () => (
                    <SweetAlert 
                      success 
                      title="Disapproved!" 
                      onConfirm={() => this.hideAlert()}
                    >
                    </SweetAlert>
                  );
                  this.setState({
                    alert: getAlert()
                  });
            }
          })
        }
        else {
            if(this.state.type === "partner")
            {
                
                 axios
                 .put(`http://localhost:5000/api/partners/${this.state.approvingID}/myprojects/${this.state.pID}/finaldraft/disapprove`)
                .then(res => {
                  if(res.error)
                  {
                      const getAlert = () => (
                          <SweetAlert 
                            danger 
                            title="Something went wrong!" 
                            onConfirm={() => this.hideAlert()}
                          >
                          {res.error}
                          </SweetAlert>
                        );
                        this.setState({
                          alert: getAlert()
                        });
                  }
                  else
                  {
                      const getAlert = () => (
                          <SweetAlert 
                            success 
                            title="Disapproved!" 
                            onConfirm={() => this.hideAlert()}
                          >
                          </SweetAlert>
                        );
                        this.setState({
                          alert: getAlert()
                        });
                  }
                })

            }
        }

        
    
    }

    render(){
        
            return (
                <div>
                    <Button onClick = {this.Approve.bind(this)} variant="dark">Approve</Button>{" "}
                    <Button onClick = {this.Disapprove.bind(this)} variant="dark" >Disapprove</Button>
                    {this.state.alert}
                </div>
            )
        
    }

      
}



export default ApproveFinalDraft ;  
import React, { Component } from 'react'
import ListSubheader from "@material-ui/core/ListSubheader";
import axios from "axios";
import { Button } from 'react-bootstrap';
import PartnerCanEditInProject from '../components/PartnerCanEditInProject';
import EditableView from '../components/Project/ProjectEditableViewProjectSection';
import CircularProgress from '../components/Global/CircularIndeterminate';
import ReactDOM from 'react-dom';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ProjectEditableViewCASection from '../components/Project/ProjectEditableProjectCASection';
import ProjectEditableCandidateSection from '../components/Project/ProjectEditableCandidateSection';
import Nav from '../components/Global/PrimarySearchAppBar'
import LinearProgress from '../components/Global/loading'
const server = require("../../src/config");

export default class EditProject extends Component {
  constructor(props){
    super(props); 
  this.state={
        user:JSON.parse(localStorage.getItem('user')),
        type:localStorage.getItem('type'),
        projectID : this.props.match.params.id,
        userID:JSON.parse(localStorage.getItem('user'))._id,
        project : null,

    }  
    console.log(this.state.projectID) 
  }
  async  componentDidMount(){
    await  axios
      .get(`https://lirtenben.herokuapp.com/api/projects/${this.state.projectID}`)
      .then(res => {
        
        return  res.data;
        
      })
      .then(a => {
           this.setState({ project: a.data  })
        });
        console.log(
          "from edit project = "+this.state.project._id)
      } 


 handleChange = name => event => {
     event.preventDefault();
    this.setState({
      [name]: event.target.value
    });
  };

  cancelProject= async()=>{
    if(this.state.type === "admin"){
      console.log("delete method")
    const requestOptions = {
      method: 'DELETE'
    };
    await fetch(`https://lirtenben.herokuapp.com/api/projects/${this.state.projectID}` , requestOptions).then((response) => {
      return response.json();
    }).then((result) => {
      console.log(result)
      if(result.status===404)
      alert(result.error)
      if(result.status===200){
      alert(result.msg);
      }
      if(result.status===400)
      alert(result)
      else
      alert(result.msg)
    });
    }else{
      console.log("delete method")
    const requestOptions = {
      method: 'DELETE'
    };
    await fetch(`https://lirtenben.herokuapp.com/api/partners/${this.state.userID}/cancelproject/${this.state.projectID}` , requestOptions).then((response) => {
      return response.json();
    }).then((result) => {
      console.log(result)
      if(result.status===404)
      alert(result.error)
      if(result.status===200){
      alert(result.msg);
      }
      if(result.status===400)
      alert(result)
      else
      alert(result.msg)
    });
    }
  }
  viewSection1= (e)=>{
    ReactDOM.render(<div><EditableView project={this.state.project}/> 
</div>,document.getElementById('container'));
   }

  viewSection2= (e)=>{
   ReactDOM.render(<div><ProjectEditableViewCASection user={this.state.user} type= {this.state.type} project={this.state.project}
    ></ProjectEditableViewCASection> </div>,document.getElementById('container'));
  }
  viewSection3=(e)=>{
    ReactDOM.render(<div><ProjectEditableCandidateSection user={this.state.user} type= {this.state.type} project={this.state.project}
      /></div>,document.getElementById('container'));
    }
  

  render() {
    if(this.state.project!== null){  
      console.log(this.state.projectID +" "+this.state.userID)
    return (
      <div >
        <Nav value={1}/>
        <div class = "leftCol">
            <div class="col-3 float-left pr-4" style={{height:'1100px'}}>
              <nav class="menu" aria-label="Project settings" style={{height:'1100px'}}>
                <h3 class="menu-heading">
                </h3>

                <Paper style={{height:'1100px'}}>

                    <MenuList>
                      <MenuItem  onClick={this.viewSection1}>Project attributes</MenuItem>
                      <MenuItem  onClick={this.viewSection2}>Consultancy Agency</MenuItem>
                      <MenuItem  onClick={this.viewSection3}>Candidate</MenuItem>
                      <MenuItem class="js-selected-navigation-item selected menu-item" onClick={this.cancelProject}>Delete project</MenuItem>
                    </MenuList>
                </Paper>

              </nav>
            </div>
        </div>
        <div id="container">
          <EditableView project={this.state.project}></EditableView>
       </div>  
      </div>
    )
    }
    else{
        return(
            <div>
            <LinearProgress/>
            </div>
        )
    }
  }
}

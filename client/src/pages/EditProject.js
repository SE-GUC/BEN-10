import React, { Component } from 'react'
import ListSubheader from "@material-ui/core/ListSubheader";
import axios from "axios";
import { Button } from 'react-bootstrap';
import PartnerCanEditInProject from '../components/PartnerCanEditInProject';
import EditableView from '../components/Project/ProjectEditableViewProjectSection';
import CircularProgress from '../components/Global/CircularIndeterminate';
import ReactDOM from 'react-dom';
import ProjectEditableViewCASection from '../components/Project/ProjectEditableProjectCASection';
import ProjectEditableCandidateSection from '../components/Project/ProjectEditableCandidateSection';

export default class EditProject extends Component {
  constructor(props){
    super(props); 
  this.state={
        projectID : this.props.match.params.id,
        userID:props.user._id,
        project : null,
        user : props.user,

    }  
    console.log(this.state.projectID) 
  }
  async  componentDidMount(){
    await  axios
      .get(`http://localhost:5000/api/projects/${this.state.projectID}`)
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
    if(this.props.type === "admin"){
      console.log("delete method")
    const requestOptions = {
      method: 'DELETE'
    };
    await fetch(`http://localhost:5000/api/projects/${this.state.projectID}` , requestOptions).then((response) => {
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
    await fetch(`http://localhost:5000/api/partners/${this.state.userID}/cancelproject/${this.state.projectID}` , requestOptions).then((response) => {
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
    ReactDOM.render(<div><EditableView project={this.state.project}/> <Button variant="primary" onClick={this.cancelProject}>Cancel project</Button>
</div>,document.getElementById('container'));
   }

  viewSection2= (e)=>{
   ReactDOM.render(<div><ProjectEditableViewCASection user={this.state.user} type= {this.props.type} project={this.state.project}
    ></ProjectEditableViewCASection> <Button variant="primary" onClick={this.cancelProject}>Cancel project</Button></div>,document.getElementById('container'));
  }
  viewSection3=(e)=>{
    ReactDOM.render(<div><ProjectEditableCandidateSection user={this.state.user} type= {this.props.type} project={this.state.project}
      /><Button variant="primary" onClick={this.cancelProject}>Cancel project</Button></div>,document.getElementById('container'));
    }
  

  render() {
    if(this.state.project!== null){  
      console.log(this.state.projectID +" "+this.state.userID)
    return (
      <div >
        <div class = "leftCol">
            <div class="col-3 float-left pr-4">
              <nav class="menu" aria-label="Project settings" data-pjax="">
                <h3 class="menu-heading"><ListSubheader component="div">
              project attributes
    </ListSubheader>
                </h3>

                <Button class="js-selected-navigation-item selected menu-item" onClick={this.viewSection1}>
                Project attributes</Button><br/>
                <Button class="js-selected-navigation-item menu-item"  onClick={this.viewSection2}>
                Consultancy Agency</Button><br/>
                <Button class="js-selected-navigation-item menu-item" onClick={this.viewSection3}>
                Candidate</Button><br/>
                

              </nav>
            </div>
        </div>
        <div id="container">
          <EditableView project={this.state.project}></EditableView>
          <Button variant="primary" onClick={this.cancelProject}>Delete project</Button>
       </div>  
      </div>
    )
    }
    else{
        return(
            <div>
            <CircularProgress></CircularProgress>
            </div>
        )
    }
  }
}

import React, { Component } from 'react'
import ListSubheader from "@material-ui/core/ListSubheader";
import axios from "axios";
import { Button } from 'react-bootstrap';
import PartnerCanEditInProject from '../components/PartnerCanEditInProject';
import EditableView from '../components/Project/ProjectEditableViewProjectSection';
import CircularProgress from '../components/Global/CircularIndeterminate';
import ReactDOM from 'react-dom';
import NonProjectEditableViewCASection from '../components/Project/NonProjectEditableProjectCASection';
import NonProjectEditableCandidateSection from '../components/Project/NonProjectEditableCandidateSection';
import NonEditableView from '../components/Project/ProjectViewProjectSection';
import ApplyButton from '../components/Member/ApplyProject/ApplyButton'
import FormDialog from '../components/Member/SubmitWork/FormDialogue';

export default class ViewProject extends Component {
  constructor(props){
    super(props); 
  this.state={
        projectID : this.props.match.params.id,
        userID : this.props.user._id,
        user : this.props.user,
        project:null,

    }   
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
      } 


 handleChange = name => event => {
     event.preventDefault();
    this.setState({
      [name]: event.target.value
    });
  };


  viewSection1= (e)=>{
    ReactDOM.render(<NonEditableView project={this.state.project}/>
,document.getElementById('container'));
   }

  viewSection2= (e)=>{
   ReactDOM.render(<NonProjectEditableViewCASection project={this.state.project}
    user={this.state.user}
    ></NonProjectEditableViewCASection>,document.getElementById('container'));
  }
  viewSection3=(e)=>{
    ReactDOM.render(<NonProjectEditableCandidateSection project={this.state.project}
      user={this.state.user}
      ></NonProjectEditableCandidateSection>,document.getElementById('container'));
    }
  

  render() {
    if(this.state.project){  
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
                {(this.state.project.lifeCycle==="Posted")?<ApplyButton member_id={this.props.user._id} project_id={this.state.projectID} />:""}
                {(this.state.project.lifeCycle==="In Progress")?<FormDialog member_id={this.props.user._id} project_id={this.state.projectID} />:""}

                

              </nav>
            </div>
        </div>
        <div id="container">
          <NonEditableView project={this.state.project} projectID={this.state.projectID} ></NonEditableView>
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
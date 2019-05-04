import React, { Component } from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import axios from "axios";
import { Button } from "react-bootstrap";
import PartnerCanEditInProject from "../components/PartnerCanEditInProject";
import EditableView from "../components/Project/ProjectEditableViewProjectSection";
import CircularProgress from "../components/Global/CircularIndeterminate";
import ReactDOM from "react-dom";
import NonProjectEditableViewCASection from "../components/Project/NonProjectEditableProjectCASection";
import NonProjectEditableCandidateSection from "../components/Project/NonProjectEditableCandidateSection";
import NonEditableView from "../components/Project/ProjectViewProjectSection";
import ApplyButton from "../components/Member/ApplyProject/ApplyButton";
import FormDialog from "../components/Member/SubmitWork/FormDialogue";
import ApproveFinalDraft from "../components/ApproveFinalDraft";
import ApproveFinalWork from "../components/ApproveFinalWork";
import SendFinalDraft from "../components/SendFinalDraft";
import NotifyMember from "../components/NotifyMember";
import Nav from '../components/Global/PrimarySearchAppBar'
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Typography from '@material-ui/core/Typography';
import { LinearProgress } from "@material-ui/core";
const server = require("../../src/config");



export default class ViewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:JSON.parse(localStorage.getItem('user')),
      type:localStorage.getItem('type'),
      projectID: this.props.match.params.id,
      userID: null,
      project: null
    };
    this.setState({userID:this.state.user._id})
  }
  async componentDidMount() {
    await axios
      .get(`${server}/api/projects/${this.state.projectID}`,{
        headers: { "Content-Type": "application/json",
        "Authorization": "bearer " + localStorage.getItem('token')
       }
      })
      .then(res => {
        return res.data;
      })
      .then(a => {
        this.setState({ project: a.data });
      });
  }

  caapply = async() =>{
    await axios.put(`${server}/api/consultancyagency/${this.state.user._id}/caApplyProject/${this.state.projectID}`,{
      headers: { "Content-Type": "application/json",
      "Authorization": "bearer " + localStorage.getItem('token')
     }
    })
    .then(res=>console.log(res))
  }

  handleChange = name => event => {
    event.preventDefault();
    this.setState({
      [name]: event.target.value
    });
  };

  viewSection1 = e => {
    ReactDOM.render(
      <NonEditableView project={this.state.project} />,
      document.getElementById("container")
    );
  };

  viewSection2 = e => {
    ReactDOM.render(
      <NonProjectEditableViewCASection
        project={this.state.project}
        user={this.state.user}
      />,
      document.getElementById("container")
    );
  };
  viewSection3 = e => {
    ReactDOM.render(
      <NonProjectEditableCandidateSection
        project={this.state.project}
        user={this.state.user}
      />,
      document.getElementById("container")
    );
  };

  render() {
    if (this.state.project) {
      return (
        <div>
          <Nav value={1}/>
          <div class="leftCol" >
            <div class="col-3 float-left " style={{height:"100%"}}>
              <nav class="menu" aria-label="Project settings" data-pjax="">
                <h3 class="menu-heading">
                <br></br>

                </h3>
                <Paper>

                    <MenuList>
                      <MenuItem onClick={this.viewSection1}>Project attributes</MenuItem>
                      <MenuItem onClick={this.viewSection2}>Consultancy Agency</MenuItem>
                      <MenuItem onClick={this.viewSection3}>Candidate</MenuItem>
                      
                {(this.state.project.lifeCycle === "Posted"&&this.state.type==="member") ? (
                  <ApplyButton
                  class="js-selected-navigation-item selected menu-item"
                    member_id={this.state.user._id}
                    project_id={this.state.projectID}
                  />
                ) : (
                  ""
                )}
                {(this.state.project.lifeCycle === "In Progress"&&this.state.type==="member") ? (
                  <FormDialog
                  class="js-selected-navigation-item selected menu-item"
                    member_id={this.state.user._id}
                    project_id={this.state.projectID}
                  />
                ) : (
                  ""
                )}
                {
                  ((this.state.type === "partner"&&this.state.project.lifeCycle==="Final Review"&&this.state.project.companyId==this.state.user._id) ||
                (this.state.type === "consultancyagency"&&this.state.project.lifeCycle==="Final Review"&&this.state.project.companyId==this.state.user._id)) ? 
                    <ApproveFinalWork
                    class="js-selected-navigation-item selected menu-item"
                      type={this.state.type}
                      pid={this.state.projectID}
                      id={this.state.user._id}
                    />
                    
                : 
                  ""
                }
                {((this.state.type === "partner"&&this.state.project.lifeCycle==="Final Draft"&&this.state.project.companyId==this.state.user._id) ||
                (this.state.type === "consultancyagency"&&this.state.project.lifeCycle==="Final Draft"&&this.state.project.companyId==this.state.user._id)) ? 
                    
                    <ApproveFinalDraft
                    class="js-selected-navigation-item selected menu-item"
                      type={this.state.type}
                      pid={this.state.projectID}
                      id={this.state.user._id}
                    />
                : 
                  ""
                }
                {
                  (this.state.type==="consultancyagency"&&this.state.project.lifeCycle==="Waiting for consultancy Agency")?
                  <Button onClick={this.caapply}>Apply</Button>:""

                }
                {(this.state.type==="admin"&&this.state.project.lifeCycle==="Negotiation")?
                <SendFinalDraft
                class="js-selected-navigation-item selected menu-item"
                pid={this.state.projectID}
                aid={this.state.user._id}
              />
            :""}
            {(this.state.type==="admin"&&this.state.project.lifeCycle==="Posted")?
                <NotifyMember
                class="js-selected-navigation-item selected menu-item"
                aid={this.state.user._id}
                memid={this.state.project.memberID}
                pid={this.state.projectID}
              />
            :""}
                    </MenuList>
                </Paper>

                
                <br />
            
              </nav>
            </div>
          </div>
          <div id="container">
            <NonEditableView
              project={this.state.project}
              projectID={this.state.projectID}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <LinearProgress />
        </div>
      );
    }
  }
}

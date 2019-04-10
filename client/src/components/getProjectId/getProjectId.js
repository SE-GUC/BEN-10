
import React,{ Component } from 'react';
import './getProjectId.css';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ToggleDisplay from 'react-toggle-display';
// const axios = require('axios');

class GetProjectId extends Component {
  

  constructor(props){
    super(props);
    this.state = {
      projectID:this.props.id,
      show:false,
      projects: [],
      CAID:[],
      CAFound:false,
      CA:[],
      memID:[],
      memFound:false,
      mem:[],
      skills:[],
      is_loading:false,
      consultId:[],
      conFound:false,
      consult:[]
    }
  }
   async componentDidMount(){
    await fetch('http://localhost:5000/api/projects/'+this.state.projectID).then(res=>res.json())
    .then(proj=>this.setState({projects:proj.data,CAID:proj.data.applyingCA,is_loading:true,memID:proj.data.memberID,
      skills:proj.data.required_skills_set,consultId:proj.data.consultancyID}))

    if(this.state.CAID!==null){
      this.setState({CAFound:true})
    for(var i=0;i<this.state.CAID.length;i++){
      await fetch('http://localhost:5000/api/consultancyagency/'+this.state.CAID[i]).then(res=>res.json())
    .then(proj=>this.setState({CA: [...this.state.CA,proj.data]}))
    }}
    if(this.state.memID!==null){
      
      this.setState({memFound:true})
      await fetch('http://localhost:5000/api/members/'+this.state.memID).then(res=>res.json())
       .then(proj=>this.setState({mem:proj.data}))
       
    }
    if(this.state.consultId!==null){
      
      this.setState({conFound:true})
      await fetch('http://localhost:5000/api/consultancyagency/'+this.state.consultId).then(res=>res.json())
       .then(proj=>this.setState({consult:proj.data}))
       
    }
  }

  handleClick() {
    this.setState({
      show: !this.state.show
    });
  }


  render() {
    const projects=this.state.projects;
    const sk=this.state.skills;
    

    if(this.state.is_loading){
    return (
      <div className="App ">
      
      <Jumbotron>
        <h1>Project Info</h1>
        <br></br>
          <h5>
              Description :{projects.description}
              <br></br>
              company : {projects.company}
          </h5>

            <ToggleDisplay if={this.state.show}>
            <dl>
            <dt className="co">>Category:</dt>  <dd>{projects.category}</dd>
            <dt className="co">> Posted date:</dt>  <dd>{(new Date(projects.posted_date)).getDate()+"-"+((new Date(projects.posted_date)).getMonth()+1)
            +"-"+(new Date(projects.posted_date)).getFullYear()}</dd>
            <dt className="co">> Lifecycle:</dt>  <dd>{projects.life_cycle}</dd>
            <dt className="co">> Required skills set:</dt>  <ul>{sk.map(s=><dd key={s._id}>{s}</dd>)}</ul>
            </dl>
            </ToggleDisplay>
            
            <ToggleDisplay if={this.state.memFound&&this.state.show} >
            <dt className="co">> Member Assigned:</dt>
                                  <dd>Name: {this.state.mem.fname} {this.state.mem.mname} {this.state.mem.lname}  </dd>
                                  <dd>Email :{this.state.mem.email} </dd>
                                  <dd>Mobile : {this.state.mem.Mobile_number}</dd>
            </ToggleDisplay>
            <ToggleDisplay if={this.state.conFound&&this.state.show} >
            <dt className="co">> Assigned Consultancy</dt>
                                   <dd>Name: {this.state.consult.name} </dd>
                                   <dd>Mobile: {this.state.consult.telephoneNumber} </dd>
                                   <dd>Email: {this.state.consult.email} </dd>
            </ToggleDisplay>

            <ToggleDisplay if={this.state.CAFound&&this.state.show} >
            <dt className="co">> Applying Consultancy agency:</dt><ul>{ this.state.CA.map(c=><dd key={c._id}>{c.name}</dd>)}</ul>
            </ToggleDisplay>

           
     <p>
     <Button  onClick={ () => this.handleClick() }  className="primary">Show {this.state.show?"less":"more" }</Button>
     </p>

  
  </Jumbotron>

</div>
      
    );}
    else{
      return (
        <div className="App ">
        <Jumbotron>
        <h1>Project Info</h1>
        <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
        <p>
        <Button  onClick={ () => this.handleClick() }  className="primary">Show {this.state.show?"less":"more" }</Button>
         </p>
        </Jumbotron>
        </div>
      );
    }
  }

}


export default GetProjectId;

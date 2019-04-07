import React, { Component } from 'react'
import Project from '../components/Project';
import axios from "axios";
import { Button } from 'react-bootstrap';
import PartnerCanEditInProject from '../components/PartnerCanEditInProject';

export default class EditMyProject extends Component {
    state={
        id : this.props.match.params.id,
        project:null,
        description : null,
        category : null,
        life_cycle : null,
        estimated_effort : null,
        estimated_time : null,
        experience_level_needed : null,
        required_skill_set : null,
    }
    componentDidMount = async()=> {
        var r=null;
       await  axios
          .get(`http://localhost:5000/api/projects/${this.state.id}`)
          .then(res => {
            
            return  res.data;
            
          })
          .then(a => {
            r=a;
               this.setState({ project: a.data,
            
                description : a.data.description,
                category : a.data.category,
                life_cycle : a.data.life_cycle,
                estimated_effort : a.data.estimated_effort,
                estimated_time : a.data.estimated_time,
                experience_level_needed : a.data.experience_level_needed,
                required_skill_set : a.data.required_skill_set,
            
            
            })
            
            });
        
          
      }
 SubmitEdit = async()=>{
  await axios({url : `http://localhost:5000/api/projects/${this.state.id}`, method:'put',
    data:{
        description : this.state.description,
        category : this.state.category,
        life_cycle : this.state.life_cycle,
        estimated_effort : this.state.estimated_effort,
        estimated_time : this.state.estimated_time,
        experience_level_needed : this.state.experience_level_needed,
        required_skill_set : this.state.required_skill_set,

    }
      
    }).then(res=>{ 
        console.log(res.status);
       return res.data
    })
    .then(json => this.setState({project : json}))
    window.location.reload();
 }     
 handleChange = name => event => {
     event.preventDefault();
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    if(this.state.project !== null){  
    return (
      <div >
     
      <h1>Hiii</h1>
      <PartnerCanEditInProject project={this.state.project}></PartnerCanEditInProject>

      <div>
      description : <input  onChange={this.handleChange("description")}></input>
      Category : <input onChange={this.handleChange("category")}></input>
      life_cycle : <input onChange={this.handleChange("life_cycle")}></input>
      estimated_effort : <input onChange={this.handleChange("estimated_effor")}></input>
      estimated_time : <input onChange={this.handleChange("estimated_time")}></input>
      experience_level_needed : <input onChange={this.handleChange("experience_level_needed")}></input>
      required_skill_set : <input onChange={this.handleChange("required_skill_set")}></input>  
      </div>
      <Button onClick={this.SubmitEdit}>Submit
      </Button>






      </div>
    )
    }
    else{
        return(
            <div>
     
            <h1>loading ..</h1>
        
              
            </div>
        )
    }
  }
}
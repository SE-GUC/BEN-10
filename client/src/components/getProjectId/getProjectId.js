import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ToggleDisplay from 'react-toggle-display';
// const axios = require('axios');

class App extends Component {
  

  constructor(props){
    super(props);
    this.state = {
      show:false,
      projects: [],
      CAID:[],
      CAFound:false,
      CA:[]
    }
  }
   async componentDidMount(){
    await fetch('http://localhost:5000/api/projects/5c9cd72e3c242d1d38b87320').then(res=>res.json())
    .then(proj=>this.setState({projects:proj.data,CAID:proj.data.applyingCA,is_loading:false}))

    if(this.state.CAID!=null){
      this.setState({CAFound:true})
    for(var i=0;i<this.state.CAID.length;i++){
      console.log(this.state.CAID[i])
      await fetch('http://localhost:5000/api/consultancyagency/'+this.state.CAID[i]).then(res=>res.json())
    .then(proj=>this.setState({CA: [...this.state.CA,proj.data]}))
    }
  console.log(this.state.CA)}
  }
  handleClick() {
    this.setState({
      show: !this.state.show
    });
  }


  render() {
    const projects=this.state.projects;
    
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
            <dt>Category:</dt>  <dd>{projects.category}</dd>
            <dt> Posted date:</dt>  <dd>{projects.posted_date}</dd>
            <dt> Lifecycle:</dt>  <dd>{projects.life_cycle}</dd>
            <dt> Required skills set:</dt>  <dd>{projects.required_skills_set}</dd>
            </dl>
            </ToggleDisplay>

            <ToggleDisplay if={this.state.CAFound&&this.state.show} >
            
            <dt> Applying Consultancy agency:</dt>  <ul>{ this.state.CA.map(c=><dd key={c._id}>{c.name}</dd>)}</ul>
            </ToggleDisplay>

     <p>
     <Button  onClick={ () => this.handleClick() }  className="primary">Show {this.state.show?"less":"more" }</Button>
     </p>

  
  </Jumbotron>

</div>
      
    );
  }

}




export default App;

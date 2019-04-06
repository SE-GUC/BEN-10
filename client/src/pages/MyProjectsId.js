import React,{ Component } from "react";
import { Button,Jumbotron } from "react-bootstrap";
import Member from './Member.js'
import ReactDOM from 'react-dom';
import ConsultancyAgency from './ConsultancyAgency'
export default class MyProjectsId extends Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.id,
            partner_id:this.props.partner_id,
            applying_CA:[],
            Assigned_CA_ID:"",
            Member_assigned_ID:"",
            // project parts
            required_skill_set:[],
            description:"",
            company_name:"",
            category:"",
            wants_consultancy:"",
            posted_date:"",
            life_cycle:"",
            experience_level:"",
            cosultnacy_assigned:{
              name:"none",
              telephoneNumber:"none",
              email:"none@example.com",
              location:"none",
              yearsOfExperience:"00",
            },
            Member_assigned:{
              fname:"nobody",
              mname:"nobody",
              lname:"nobody",
              email:"nobody@yahoo.com",
              Mobile_number:"0101010101"
  
            }

        }
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
        let CAID=null;
    let MID=null;
    fetch('http://localhost:5000/api/projects/'+this.state.id)
    .then(res=>{
      if(res.status===200)
      return res.json()
      else
      return null;
      } )
      .then(project=>{
        if(project!=null){
        this.setState({
        required_skill_set:project.data.required_skills_set,
         description:project.data.description,
         company_name:project.data.company,
         category:project.data.category,
         wants_consultancy:project.data.wants_consultancy,
         posted_date:project.data.posted_date,
         life_cycle:project.data.life_cycle,
         experience_level:project.data.experience_level_needed,
         Assigned_CA_ID:project.data.consultancyID,
         applying_CA_ID:project.data.applyingCA,
         Member_assigned_ID:project.data.memberID,
      })
    
      
      CAID=project.data.consultancyID;
      MID=project.data.memberID;
      
     if(CAID!=null){
    fetch('http://localhost:5000/api/consultancyagency/'+CAID)
    .then(res=>{
      if(res.status===200)
      return res.json()
      else
      return null
    })
    .then(CA=>{
      if(CA!=null){
      this.setState({
      cosultnacy_assigned:{
        name:CA.data.name,
        telephoneNumber:CA.data.telephoneNumber,
        email:CA.data.email,
        location:CA.data.location,
        yearsOfExperience:CA.data.yearsOfExperience
      }
    })
  }
  }
  
    )
  }
  if(MID!=null){
  
    fetch('http://localhost:5000/api/member/'+MID)
    .then(res=>{
      if(res.status===200)
      return res.json()
      else
      return null
    })
    .then(member=>{
      if(member!=null){
      this.setState({
      Member_assigned:{
        fname:member.data.fname,
        mname:member.data.mname,
        lname:member.data.lname,
        email:member.data.email,
        Mobile_number:member.data.Mobile_number
      }

    })
  }
  }
  
    )
  }

    for(var i=0;project.data.applyingCA.length>i;i++){
      var id=project.data.applyingCA[i];
      fetch('http://localhost:5000/api/consultancyagency/'+id)
      .then(res=>{
          if(res.status===200)
          return res.json()
          else
          return null
        }
          )
      .then(CA=>{
          if(CA!=null){
        this.setState({ applying_CA: [...this.state.applying_CA, 
        {
        name:CA.data.name,
        telephoneNumber:CA.data.telephoneNumber,
        email:CA.data.email,
        location:CA.data.location,
        yearsOfExperience:CA.data.yearsOfExperience
        }
      ]})

    }
   
      
       
      }
      
      )
    }

  }
  else{
    
  }
    
   

      
    }
      ) 

    }
    handleClick1(e){
        ReactDOM.render(<ConsultancyAgency />,document.getElementById("root"))
    }
    handleClick2(e){
        ReactDOM.render(<Member/>,document.getElementById("root"))
    }

  
  handleClick(e){
     const requestOptions = {
        method: 'DELETE'
      };
      fetch(`http://localhost:5000/api/partners/${this.state.partner_id}/deleteProject/${this.state.id}` , requestOptions).then((response) => {
        return response.json();
      }).then((result) => {
        if(result.status===404)
        alert(result.error)
        if(result.status===200){
        alert(result.msg)
        }
        if(result.status===400)
        alert(result)
        else
        alert(result.msg)
        
      });

  }
  



    render(){
        return (
            <div>
                {/* project info */}
            <Jumbotron>
           <h1>Project Informations</h1>
           <p>
               <h4>Description</h4>
                {this.state.description} 
                <h4>Required Skills</h4>
               {this.state.required_skill_set.map(a=><li key={1}>{a}</li>)}
               <h4>Company name</h4>
                {this.state.company_name }
                <h4>Project category</h4>
               {this.state.category} 
               <h4>Post Date</h4> 
               {this.state.posted_date}
               <h4>Experience Level</h4>
               {this.state.experience_level}
               <h4>Project stage</h4>
               {this.state.life_cycle}
          </p>
   <p>
    <Button variant="danger" onClick={this.handleClick}>Delete</Button>
    <Button variant="info">Edit</Button>
  </p>
</Jumbotron>
{/* consultancy agency assigned */}
<Jumbotron>
  <h1>{this.state.cosultnacy_assigned.name}</h1>
  <p>     <h4>Email</h4>
            {
              this.state.cosultnacy_assigned.email
            }
            <h4>
              Location
            </h4>
            {
              this.state.cosultnacy_assigned.location
            }
            <h4>Years Of Experience</h4>
            {
              this.state.cosultnacy_assigned.yearsOfExperience
            }
    
  </p>
  <p>
    <Button variant="primary" onClick={this.handleClick1}>Learn more</Button>
  </p>
</Jumbotron>;
{/* member assigned to this project */}
<Jumbotron>
  <h1>Developper Info</h1>
  <p>
    My name is {this.state.Member_assigned.fname+" "+this.state.Member_assigned.mname+" "+this.state.Member_assigned.lname}
     and u can contact me on my email:{this.state.Member_assigned.email} or my number :
    {this.state.Member_assigned.Mobile_number} whichever suits you
  </p>
  <p>
    <Button variant="primary" onClick={this.handleClick2}>Learn more</Button>
  </p>
</Jumbotron>;
{
    this.state.applying_CA.map(a=><Jumbotron>
        <h1>{a.name}</h1>
        <p>
            our company has a filled experience which corresponds to {a.yearsOfExperience} and if 
            you ever interested you can contact us on our email :{a.email} or through phone :{a.telephoneNumber}
             or we would be ownered if you visit our company at the following address {a.location}
        </p>
        <p>
            For more Info
            <Button variant="primary" onClick={this.handleClick2}>Learn more</Button>

        </p>
    </Jumbotron>

    )
}


        
</div> 

        );
    }
}
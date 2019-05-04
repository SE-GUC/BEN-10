import React,{Component} from "react"
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from "axios";
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from "@material-ui/icons/People"
import EventIcon from "@material-ui/icons/EventNote"
import ProjectIcon from "@material-ui/icons/CardTravel"
import GlobalIcon from "@material-ui/icons/Public"
import Typography from '@material-ui/core/Typography';
import StrangerCard from "./StrangerProfileCard"
import EventCard from "../Event/MyEventCard"
import ProjectCard from "../Project/StrangerProjectCard"
import Nav from "./PrimarySearchAppBar";
const server = require("../../config");
const styles = {
  root: {
    flexGrow: 1,
    width:"100%"
  },
  block:{
    // width:"60%",
    width:"100%",

    border:"2px solid white",
    float:"left",
    
    // backgroundColor:"#e0e0e0",
    // position:"center"
  }
  ,
  b:{
    width:"60%",
    border:"2px solid white",
    float:"left",
    // position:"absolute"

  }
  ,
  side1:{
    width:"20%",
    border:"2px solid white",
    float:"left"

  },
  side2:{
    width:"20%",
    border:"2px solid white",
    float:"right"

  }
  
 
};


function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };
class SearchPage extends Component{
    constructor(props){
        super(props);
        this.state={
            searchWord:localStorage.getItem('search'),
            type:localStorage.getItem('type'),
            value: 0,
            partner:null,
            member:null,
            admin:null,
            consultancy:null,
            event:null,
            projects:null
        }
    }
    componentDidMount(){
       
             //admins
            const body={
                text:this.state.searchWord
            }
            if(this.state.type=="admin"){
            axios.post(`https://lirtenben.herokuapp.com/searchAdmins`,body,{
              headers: { "Content-Type": "application/json",
              "Authorization": "bearer " + localStorage.getItem('token')
             }
            })
            .then(res=>{ 
             return res.data
          })
          .then(json => this.setState({admin:json.data}))
        }
          //partners
          axios.post(`https://lirtenben.herokuapp.com/searchPartners`,body,{
            headers: { "Content-Type": "application/json",
            "Authorization": "bearer " + localStorage.getItem('token')
           }})
            .then(res=>{ 
             return res.data
          })
          .then(json => this.setState({partner:json.data}))
          // member
          axios.post(`https://lirtenben.herokuapp.com/searchMembers`,body,{
            headers: { "Content-Type": "application/json",
            "Authorization": "bearer " + localStorage.getItem('token')
           }
          })
            .then(res=>{ 
             return res.data
          })
          .then(json => this.setState({member:json.data}))
          // agencies
          axios.post(`https://lirtenben.herokuapp.com/searchCAs`,body,{
            headers: { "Content-Type": "application/json",
            "Authorization": "bearer " + localStorage.getItem('token')
           }
          })
            .then(res=>{ 
             return res.data
          })
          .then(json => this.setState({consultancy:json.data}))
          // projects
          axios.post(`https://lirtenben.herokuapp.com/searchProjects`,body,{
            headers: { "Content-Type": "application/json",
            "Authorization": "bearer " + localStorage.getItem('token')
           }
          })
            .then(res=>{ 
             return res.data
          })
          .then(json => {
              if(this.state.type==="member")
              this.setState({projects:json.data.filter(p=>(p.lifeCycle=="Posted")||(p.lifeCycle=="In Progress")||(p.lifeCycle=="Final Review")||(p.lifeCycle=="Finished"))})
              else
              this.setState({projects:json.data})
            })
          // Events
          axios.post(`https://lirtenben.herokuapp.com/searchEvents`,body,{
            headers: { "Content-Type": "application/json",
            "Authorization": "bearer " + localStorage.getItem('token')
           }
          })
            .then(res=>{ 
             return res.data
          })
          .then(json => this.setState({event:json.data}))
  
        
        

    }
    handleChange = (event, value) => {
        this.setState({ value });
      };
    render(){
        const { classes } = this.props;
        console.log(this.state.searchWord)

            return (
              <div>
                <Nav value={0}/>
                <Paper square className={classes.root}>
                  <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary"
                  >
                    {/* <Tab icon={<GlobalIcon className={classes.icon}/>} label="All" /> */}
                    <Tab icon={<PersonIcon />} label="Admins" />
                    <Tab icon={<PersonIcon />} label="Partners" />
                    <Tab icon={<GroupIcon />} label="Consultancy Agencies" />
                    <Tab icon={<PersonIcon />} label="Members" />
                    <Tab icon={<EventIcon />} label="Events" />
                    <Tab icon={<ProjectIcon />} color="inherit" label="Projects" />
                  </Tabs>
                  
                  
                </Paper>
                <div className={classes.block}>
                <div className={classes.side1}>
                </div>
                
                
                  <div className={classes.b}>
                  {(this.state.value===0)?<TabContainer>{(this.state.admin!=null)?(this.state.admin.map((a,i)=><StrangerCard key={i} type="admin" user={a}/>)):""}</TabContainer>:"" }
                  {(this.state.value===1)?<TabContainer>{(this.state.partner!=null)?(this.state.partner.map((p,i)=><StrangerCard key={i} type="partner" user={p}/>)):""}</TabContainer>:"" }
                  {(this.state.value===2)?<TabContainer>{(this.state.consultancy!=null)?(this.state.consultancy.map((ca,i)=><StrangerCard key={i} type="consultancy" user={ca}/>)):""}</TabContainer>:"" }
                  {(this.state.value===3)?<TabContainer>{(this.state.member!=null)?(this.state.member.map((m,i)=><StrangerCard key={i} type="member" user={m}/>)):""}</TabContainer>:"" }
                  {(this.state.value===4)?<TabContainer>{(this.state.event!=null)?(this.state.event.map((e,i)=><EventCard key={i} event={e}/>)):""}</TabContainer>:"" }
                  {(this.state.value===5)?<TabContainer>{(this.state.projects!=null)?(this.state.projects.map((p,i)=><ProjectCard key={i} project={p}/>)):""}</TabContainer>:"" }
                  </div>
                  <div className={classes.side2}>
                
                  
                  </div>
                  </div>
               
                </div>
                
              );
          

    }
    

}
SearchPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(SearchPage);
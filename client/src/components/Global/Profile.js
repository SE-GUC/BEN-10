import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import {Button} from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import classes from "classnames";
import Rating from 'material-ui-rating'
import { Redirect } from "react-router-dom";
import background from "./background.png";
import styles from "./Profile.css";
import img from "./background.png";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Person';
import FavoriteIcon from '@material-ui/icons/Place';
import PersonPinIcon from '@material-ui/icons/FolderShared';
import ReportIcon from '@material-ui/icons/FileCopy'
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import { LinearProgress, TextField } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import axios from "axios"
const server = require("../../config");
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




class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      type: localStorage.getItem("type"),
      redirectEvents: false,
      redirectProjects: false,
      value:0,
      loading:false,
      StringReport:'',
      ReportTitle:'',
      snackBarRepoAdded:false,
      snackmsg:''
    };
    this.viewEvents = this.viewEvents.bind(this);
    this.viewProjects = this.viewProjects.bind(this);
  }
  viewProjects = () => {
    this.setState({ redirectProjects: true });
  };

  viewEvents = () => {
    this.setState({ redirectEvents: true });
  };
   handleChange = (event, value) => {
    this.setState({value})
  };

  componentDidMount(){
    if(this.props.flag){
      this.setState({
        user:this.props.user,
        type:this.props.type,
        
      })

    }
    this.setState({
      loading:true
    })
  }
  handleReportTitle = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  handleReport = name => event => {
    const s = this.state.ReportTitle;
    const s2 = s+"   "+event.target.value;
    this.setState({
      [name]: s2
    });
  };

  addReport=async()=>{
    // step 1 : get the consultancy
    var reports =[];
    await axios.get(`https://lirtenben.herokuapp.com/api/consultancyagency/${this.state.user._id}`)
     .then(res=>res.data)
     .then(c=>{
       console.log(c.data.reports)
       reports=c.data.reports
     })
     reports.push(this.state.StringReport);
     console.log(reports)
     const body={reports}
     var msg = ''
    await axios.put(`https://lirtenben.herokuapp.com/api/consultancyagency/${this.state.user._id}`,body)
     .then(res=>res.data)
     .then(c=>{
     msg=c.msg

     }) 
     this.setState({snackBarRepoAdded:true,snackmsg:msg});
     var usern=null;
     await axios.get(`https://lirtenben.herokuapp.com/api/consultancyagency/${this.state.user._id}`)
     .then(res=>res.data)
     .then(c=>{
       usern=c.data
     })
     this.setState({user:usern})
     console.log(this.state.user)
     localStorage.setItem('user',JSON.stringify(usern))
     console.log(localStorage.getItem("user"))
    }
  CloseSnack1 = () =>{
    this.setState({snackBarRepoAdded:false})
  }

  render() {
    console.log(this.state.ReportTitle)
    console.log(this.state.StringReport)

   const {classes}=this.props
    if (this.state.redirectEvents) {
      return <Redirect to={{ pathname: "/Events" }} />;
    } else {
      if (this.state.redirectProjects) {
        return <Redirect to={{ pathname: "/Projects" }} />;
      } else {
        if(this.state.loading){
          
        if (
          this.state.type === "partner" ||
          this.state.type === "member" ||
          this.state.type === "admin"
        ) {
          let month = "";
          if (new Date(this.state.user.birthDate).getMonth() + 1 === 12)
            month = "01";
          else if (new Date(this.state.user.birthDate).getMonth() + 1 < 10)
            month = "0" + (new Date(this.state.user.birthDate).getMonth() + 1);
          else month = new Date(this.state.user.birthDate).getMonth() + 1;
          return (
            <div class="all">
              <div class ="mainCard"  >
              <AppBar position="static" color="default">
                <Paper  elevation={1} /*style={{border:"2px solid black"}}*/>
                {this.state.user.firstName + " "+this.state.user.lastName}
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="secondary"
                    textColor="secondary"
                  >
                    <Tab label="Personal Information"   icon={<PhoneIcon />} />
                    <Tab label="Location Information" icon={<FavoriteIcon />} />
                    <Tab label="Account Information" icon={<PersonPinIcon />} />
                    
                  </Tabs>
                </Paper>
                </AppBar>
                </div>
                <div class="content">

                
      {this.state.value === 0 && <TabContainer>
        <div class="paper">
        <Paper  >
        
        <Typography class="text1" variant="h6" style={{fontSize:20}}> SSN </Typography> 
         <Typography class="text2" component="p" style={{fontSize:18}}>{this.state.user.SSN}</Typography>
        </Paper>
        </div>
        <div class="paper">
        <Paper >
        <Typography class="text1" variant="h6" style={{fontSize:20}}> Birth Date </Typography> 
         <Typography class="text2" component="p" style={{fontSize:18}}>{new Date(this.state.user.birthDate).getFullYear()+"-"+new Date(this.state.user.birthDate).getMonth()+"-"+new Date(this.state.user.birthDate).getDate()}</Typography>
        </Paper>
        </div>
        <div class="paper">
        <Paper >
        <Typography class="text1" variant="h6" style={{fontSize:20}}> Gender </Typography> 
         <Typography class="text2" component="p" style={{fontSize:18}}>{(this.state.user.gender)?"Female":"Male"}</Typography>
        </Paper>
        </div>
        <div class="paper">
        <Paper >
        <Typography class="text1" variant="h6" style={{fontSize:20}}> Nationality </Typography> 
         <Typography class="text2" component="p" style={{fontSize:18}}>{this.state.user.nationality}</Typography>
        </Paper>
        </div>
        <div class="paper">
        <Paper >
        <Typography class="text1" variant="h6" style={{fontSize:20}}> Marital Status </Typography> 
         <Typography class="text2" component="p" style={{fontSize:18}}>{this.state.user.maritalStatus}</Typography>
        </Paper>
        </div>
        <div class="paper">
        <Paper >
        <Typography class="text1" variant="h6" style={{fontSize:20}}> Driving License </Typography> 
         <Typography class="text2" component="p" style={{fontSize:18}}>{(this.state.user.drivingLicense)?"user have a driving license":"user can not drive"}<br></br></Typography>
        </Paper>
     </div>
      </TabContainer>}
      {this.state.value === 1 && <TabContainer>
        <div class="paper">
        <Paper  >
        
        <Typography class="text1" variant="h6" style={{fontSize:20}}> Country </Typography> 
         <Typography class="text2" component="p" style={{fontSize:18}}>{this.state.user.country}</Typography>
        </Paper>
        </div>
        
        <div class="paper">
        <Paper >
        <Typography class="text1" variant="h6" style={{fontSize:20}}> City </Typography> 
         <Typography class="text2" component="p" style={{fontSize:18}}>{(this.state.user.city)?"Female":"Male"}</Typography>
        </Paper>
        </div>
        <div class="paper">
        <Paper >
        <Typography class="text1" variant="h6" style={{fontSize:20}}> Area </Typography> 
         <Typography class="text2" component="p" style={{fontSize:18}}>{this.state.user.area}</Typography>
        </Paper>
        </div>
        <div class="paper">
        <Paper >
        <Typography class="text1" variant="h6" style={{fontSize:20}}> Postal Code </Typography> 
         <Typography class="text2" component="p" style={{fontSize:18}}>{this.state.user.postalCode}</Typography>
        </Paper>
        </div>
        



      </TabContainer>}
      {this.state.value === 2 && <TabContainer>
        <div class="paper">
        <Paper >
        <Typography class="text1" variant="h6" style={{fontSize:20}}> Email </Typography> 
         <Typography class="text2" component="p" style={{fontSize:18}}>{this.state.user.email}</Typography>
        </Paper>
        </div>
        <div class="paper">
        <Paper >
        <Typography class="text1" variant="h6" style={{fontSize:20}}> Mobile Number </Typography> 
         <Typography class="text2" component="p" style={{fontSize:18}}>{this.state.user.mobileNumber}</Typography>
        </Paper>
        </div>
        <div class="paper">
        <Paper >
        <Typography class="text1" variant="h6" style={{fontSize:20}}> Alternative Mobile Number </Typography> 
         <Typography class="text2" component="p" style={{fontSize:18}}>{this.state.user.alternativeMobileNumber}</Typography>
        </Paper>
        </div>
        {(this.state.type=="member")? <div class="paper">
        <Paper >
        <Typography class="text1" variant="h6" style={{fontSize:20}}> Skills Set </Typography> 
         <Typography class="text2" component="p" style={{fontSize:18}}>{(this.state.user.skillSet.length>0)?this.state.user.skillSet.map(s=> s+" "):"None"}</Typography>
        </Paper>
        </div> :""}
        
      </TabContainer>}

      
              </div>  

             
              <div>

              

              </div>

            </div>
          );
        } else if (this.state.type === "consultancyagency") {
          return (
            <div class="all">
              <div class ="mainCard"  >
              <AppBar position="static" color="default">
                <Paper  elevation={1} /*style={{border:"2px solid black"}}*/>
                {this.state.user.name}
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="secondary"
                    textColor="secondary"
                  >
                    <Tab label="Contact Information"   icon={<PhoneIcon />} />
                    <Tab label="Reports" icon={<ReportIcon />} />
                    
                  </Tabs>
                </Paper>
                </AppBar>
                </div>
                <div class="content">

                
      {this.state.value === 0 && <TabContainer>
        <div class="paper">
        <Paper  >
        
        <Typography class="text1" variant="h6" style={{fontSize:20}}> About </Typography> 
         <Typography class="text2" component="p" style={{fontSize:18}}>{this.state.user.about}</Typography>
        </Paper>
        </div>
        
        <div class="paper">
        <Paper >
        <Typography class="text1" variant="h6" style={{fontSize:20}}> Phone Number </Typography> 
         <Typography class="text2" component="p" style={{fontSize:18}}>{(this.state.user.telephoneNumber)}</Typography>
        </Paper>
        </div>
        <div class="paper">
        <Paper >
        <Typography class="text1" variant="h6" style={{fontSize:20}}> Email </Typography> 
         <Typography class="text2" component="p" style={{fontSize:18}}>{this.state.user.email}</Typography>
        </Paper>
        </div>
        <div class="paper">
        <Paper >
        <Typography class="text1" variant="h6" style={{fontSize:20}}> Agency Location </Typography> 
         <Typography class="text2" component="p" style={{fontSize:18}}>{this.state.user.location}</Typography>
        </Paper>
        </div>
        <div class="paper">
        <Paper >
        <Typography class="text1" variant="h6" style={{fontSize:20}}> Experience Years </Typography> 
         <Typography class="text2" component="p" style={{fontSize:18}}>{(this.state.user.yearsOfExperience)?"user have a driving license":"user can not drive"}<br></br></Typography>
        </Paper>
     </div>
     <div class="paper">
        <Paper  >
        
        <Typography class="text1" variant="h6" style={{fontSize:20}}>  Rating </Typography> 
        <Rating
          onRate={() => console.log('onRate')}
          value={3}
          max={5}
          onChange={() => console.log('onChange')}
          readOnly
        />
        </Paper>
        </div>
      </TabContainer>}
      {this.state.value === 1 && <TabContainer>
        {(this.state.user.reports.length>0?
        <div>
        {this.state.user.reports.map(r=>
          <div class="paper">
          <Paper>
          <Typography class="text2" component="p" >
            <Typography class="text1" component="p">
            {r}
            </Typography>
            </Typography>
          </Paper>          
          </div>
        )}
        <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography >Add report</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <div style={{height:"550px"}}>
       
        <TextField
        type="String"
        label="Title"
        onChange={this.handleReportTitle('ReportTitle')}  
        id="mui-theme-provider-standard-input"
        style={{width:"250px",marginLeft:"15px"}}
        />
        <br></br>
        <br/>
        <TextField
        id="standard-multiline-flexible"
        multiline
        rows="20"
        label="report"
        onChange={this.handleReport('StringReport')}
        style={{width:"40rem",marginLeft:"15px"}}
        />
        <br></br>
        <br></br>
        <button type="button" class="btn btn-success" onClick={this.addReport} style={{width:"150px",marginLeft:"15px"}}>Add report</button>

      </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={this.state.snackBarRepoAdded}
      autoHideDuration={2500}
      onClose={this.CloseSnack1}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{"report added successfally"}</span>}
      
    />
        </div>:
        <div class="paper">
          <Paper>
          <Typography class="text2" component="p" >
            <Typography class="text1" component="p" style={{fontSize:20}}>
            This Profile didn't upload any reports :(
            </Typography>
            </Typography>
          </Paper>
          <Paper style={{height:"550px"}}>
       
            <TextField
            type="String"
            label="Title"
            onChange={this.handleReportTitle('ReportTitle')}  
            id="mui-theme-provider-standard-input"
            style={{width:"250px",marginLeft:"20px"}}
            />
            <br></br>
            <br/>
            <TextField
            id="standard-multiline-flexible"
            multiline
            rows="20"
            label="report"
            onChange={this.handleReport('StringReport')}
            style={{width:"45rem",marginLeft:"20px"}}
            />
            <br></br>
            <br></br>
            <button type="button" class="btn btn-success" onClick={this.addReport} style={{width:"150px",marginLeft:"15px"}}>Add report</button>

          </Paper>
          <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={this.state.snackBarRepoAdded}
              autoHideDuration={2500}
              onClose={this.CloseSnack1}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">{"report added successfally"}</span>}
              
            />
        </div>
        )}
        
        
       
       
        



      </TabContainer>}

              </div>  

             
              <div>

              

              </div>

            </div>
          );
        }
      
      } else {
          return <LinearProgress/>;
        }
      }
    }
  }
}
Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Profile;

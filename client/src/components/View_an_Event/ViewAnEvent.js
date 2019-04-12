import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/purple';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {Redirect} from 'react-router-dom'
import { unstable_Box as Box } from '@material-ui/core/Box';

const styles = {
  card: {
    minWidth: 300,
    width: 50,
    background:blue,
    align:'center',
    margin:blue,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 25,
    primary :purple,

  },
  pos: {
    marginBottom: 12,
  },
  gridList: {
    width: 300,
    height: 100,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },

};


class SimpleCard  extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    eventId : this.props.id ,
    event : [] , 
    isLoaded : false,
    bookedmemID:[],
    members:[],
    ID:[],
    CA:null,
    partner:null,
    admin:null,
    type:[],
    show:false,
    display:'none',
    mem:'none'
    };
  }
  async componentDidMount(){
    await fetch('http://localhost:5000/api/events/5c93e86e61fb9b030dc88b9e').then(res=>res.json())
    .then(proj=>this.setState({event:proj.data,bookedmemID:proj.data.bookedMembers,ID:proj.data.requestorId}))
    
    if(this.state.bookedmemID.length!==0){
    for(var i=0;i<this.state.bookedmemID.length;i++){
      await fetch('http://localhost:5000/api/members/'+this.state.bookedmemID[i]).then(res=>res.json())
    .then(proj=>this.setState({members: [...this.state.members,proj.data]}))
    }}

    await fetch('http://localhost:5000/api/consultancyagency/'+this.state.ID).then(res=>res.json())
    .then(proj=>this.setState({CA:proj.data})).catch(this.setState({CA:null}))
   
      await fetch('http://localhost:5000/api/partners/'+this.state.ID).then(res=>res.json())
    .then(proj=>this.setState({partner:proj.data}))
  
      await fetch('http://localhost:5000/api/admins/'+this.state.ID).then(res=>res.json())
    .then(proj=>this.setState({admin:proj.data}))
    
    if(this.state.admin){
      this.setState({type:'admin'})}    
   if(this.state.partner){
    this.setState({type:'partner'})}
   if(this.state.CA){
    this.setState({type:'CA'}) }

    }
    handleClicksz (x){
    //   let path = `/MyProjects/`;
    // this.props.history.push({
    //   pathname : path,
    // });
    return <Redirect to='/HI'/>;
     
    }
    show(){
      if(this.state.display==='none'){
        this.setState({display:'block'})
      }
      else{this.setState({display:'none'})}
    }
    show2(){
      if(this.state.mem==='none'){
        this.setState({mem:'block'})
      }
      else{this.setState({mem:'none'})}
    }

  render(){
    const { classes } = this.props;
    var name =null
    if(this.state.admin){
      name=this.state.admin.firstName}    
   if(this.state.partner){
    name=this.state.partner.firstName}
   if(this.state.CA){
    name=this.state.CA.name }
    const event=this.state.event;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title}   gutterBottom>
         Event Info
        </Typography>
        <Typography className={classes.pos}  >
        Requested By : {name}
        <br></br>
        Description : {(event.description)?event.description:"None"}
        <br></br>
        <Box  display={this.state.display} color="text.primary" clone>
        <div >
        Event Location : {(event.eventLocation)?event.eventLocation:"None"}
        <br></br>
        Registeration Price : {(event.registPrice)?event.registPrice:"None"}
        < br></br>
        Remaining Places : {(event.remainingPlace)?event.remainingPlace:"None"}
        <br></br>
        Event Topics : {(event.topics)?event.topics.toString():"None"}
        < br></br>
        Speaker: {(event.speaker)?event.speaker:"None"}
        <br></br>
        Feedback : {(event.feedback)?event.feedback.toString():"None"}
        <br></br>
        Registeration Start Date : {(event.regist_start_date)?(new Date(event.regist_start_date)).getDate()+"/"+((new Date(event.regist_start_date)).getMonth()+1)+"/"+(new Date(event.regist_start_date)).getFullYear():"None"}
        <br></br>
        Registeration End Date: {(event.regist_expiry_date)?(new Date(event.regist_expiry_date)).getDate()+"/"+((new Date(event.regist_expiry_date)).getMonth()+1)+"/"+(new Date(event.regist_start_date)).getFullYear():"None"}
        <br></br>
        Event Date : {(event.eventDate)?(new Date(event.eventDate)).getDate()+"/"+((new Date(event.eventDate)).getMonth()+1)+"/"+(new Date(event.regist_start_date)).getFullYear():"None"}
        <br></br>
        Form Link: {(event.formLink)?event.formLink:"None"}
        <br></br>
        <br></br>
        <Box display={this.state.mem}>
        bookedMembers :
        <div className={classes.root}>
        <GridList cellHeight={50} className={classes.gridList} cols={2}>
        {this.state.members.map(mem => (
          <GridListTile key={mem._id} className={classes.griditem}>
            <Button onClick={()=>{this.handleClicksz(mem._id)}} text="10px"> {mem.fname}  {mem.mname} </Button>
          </GridListTile>
          ))}
         </GridList>
         </div>
         </Box>
         <Button onClick={()=>{this.show2()}}  className={classes.root} size="small">{(this.state.mem==='none')?"Show ":"Hide "}Coming members</Button>
         </div>
         </Box>
         
        </Typography>
        
      </CardContent>
      <CardActions>
        <Button onClick={()=>{this.show()}}  className={classes.root} size="small">Show {(this.state.display==='none')?"more":"less"}</Button>
      </CardActions>
    </Card>
  );}
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
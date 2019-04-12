import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

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
    background :blue,

  },
  pos: {
    marginBottom: 12,
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
    type:[]
    };
  }
  async componentDidMount(){
    await fetch('http://localhost:5000/api/events/'+'5c93e86e61fb9b030dc88b9e').then(res=>res.json())
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

  render(){
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    var name =null
    if(this.state.admin){
      name=this.state.admin.firstName}    
   if(this.state.partner){
    name=this.state.partner.firstName}
   if(this.state.CA){
    name=this.state.CA.name }

  return (
    <Card className={classes.card} bg= "dark" >
      <CardContent>
        <Typography className={classes.title}   gutterBottom>
         Event Info
        </Typography>
        <Typography variant="h5" component="h2">Requested By :</Typography>{name}
        Requested By : <Typography className={classes.pos} color="textSecondary" >{name}</Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Show More</Button>
      </CardActions>
    </Card>
  );}
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
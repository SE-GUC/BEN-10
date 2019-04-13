import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CAApplyingMemberButton from "./CAApplyingMemberButton";
const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});
class CAApplyingMemberCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      ID: this.props.mem,
      name: null,
      email : null,
      skillSet : null,
      country: null
    };
  }

  async componentDidMount(){
    await axios(`http://localhost:5000/api/members/${this.state.ID}/`)
    .then(res=>{
      if(res.status===200)
        return res.data
      else
       return null;
    })
    .then(mem=>{  
      if(mem!=null){
        this.setState({
          name:mem.data.firstName+ ' '+mem.data.lastName,
          email:mem.data.email,
          skillSet:mem.data.skillSet,
          country:mem.data.country
        })
      }
    });
  }

  render() {
    const { classes } = this.props;
    if(this.state.name!==null){
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
             name: {this.state.name}
            </Typography>
            <Typography variant="h5" component="h2">
            email: {this.state.email}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            country: {this.state.country}
            </Typography>
            <Typography component="p">
            set of skills: {this.state.skillSet}
            </Typography>
            <CAApplyingMemberButton project={this.props.project} ca={this.props.ca} mem={this.props.mem} />
        </CardContent>
        
      </Card>
    </div>
    );}
    else{
      return(
      <div className={classes.root}></div>
      )
    }
  }
}


CAApplyingMemberCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CAApplyingMemberCard);

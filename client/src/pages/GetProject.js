import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PostProjectButton from "../components/PostProjectButton";
import Nav from '../components/Global/PrimarySearchAppBar'
const server = require("../../src/config");

const styles = {
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
};
class GetProject extends Component {
  constructor(props){
    super(props)
    this.state = {
      partnerID: null,
      partner: null,
      description : null,
      category : null,
      wantConsultancy: null,
      postedDate : null,
      lifeCycle : null,
      estimatedEffort : null,
      estimatedTime : null,
      experienceLevel : null,
      requiredSkillsSet : null,
      applyingCA: null,
      redirect: false
    };
  }

  async componentDidMount(){
    await axios(`https://lirtenben.herokuapp.com/api/projects/${this.props.project_id}/`)
    .then(res=>{
      if(res.status===200)
        return res.json()
      else
       return null;
    })
    .then(project=>{  
      if(project!=null){
        this.setState({
          partnerID: project.data.companyId,
          description:project.data.description,
          category:project.data.category,
          wantConsultancy:project.data.wantConsultancy,
          postedDate:project.data.postedDate,
          lifeCycle:project.data.lifeCycle,
          estimatedEffort:project.data.estimatedEffort,
          estimatedTime:project.data.estimatedTime,
          experienceLevel:project.data.experienceLevelNeeded,
          requiredSkillsSet:project.data.requiredSkillsSet,
          applyingCA:project.data.applyingCA
        })
      }
    });
    await axios(`https://lirtenben.herokuapp.com/api/partners/${this.state.partnerID}/`)
    .then(res=>{
      if(res.status===200)
        return res.json()
      else
        return null;
    })
    .then(partner=>{  
      if(partner!=null){
        this.setState({
          partner: partner.data.firstName + ' ' + partner.data.lasttName 
        })
      }
    });
  }
  
  routeChange() {
    this.setState({redirect:true})
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;

    if(redirect)
      return <Redirect to='/applyingCAs'/>;
    else{
      return (
        <div>
          <Nav value={1}/>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Project
              </Typography>
              <Typography variant="h5" component="h2">
                {this.state.category}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {this.state.partner}
              </Typography>
              <Typography component="p">
                {this.state.lifeCycle}
              </Typography>
            </CardContent>
            <CardActions>
              <PostProjectButton name={"Assign a Consultancy Agency"} routeChange={this.routeBackChange} aid = {this.props.ID} ws={this.state.wantConsultancy} pid={this.props.project_id} CAsID={this.state.applyingCA}/>
              <PostProjectButton name={"Assign a member"} routeChange={this.routeBackChange} aid = {this.props.ID} ws={this.state.wantConsultancy} pid={this.props.project_id} CAsID={this.state.applyingCA}/>
            </CardActions>
          </Card>
        </div>
      );
    }
  }
}

GetProject.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GetProject);

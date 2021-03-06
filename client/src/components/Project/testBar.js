import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import MyProjectCard from './MyProjectCard'
const server = require("../../config");

function TabContainer(props) {
  return (
    <Typography component="div" style={{ width:"auto",  }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  }
  
  ,
  Tab:{
      width:"auto",
      backgroundColor:"#000000"
  },
  label:{
    color:"#9e9e9e"
  }
});

class SimpleTabs extends React.Component {
    constructor(props){
        super(props);
        this.state={
            value: 0,
            projects:this.props.projects

        }
    }
  

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar className={classes.Tab} position="center">
          <Tabs value={value}  onChange={this.handleChange}>
            <Tab className={classes.label} label="All" />
            <Tab className={classes.label}  label="Waiting For Consultancy Agency" />
            <Tab className={classes.label}  label="Negotiation" />
            <Tab className={classes.label}  label="Final Draft" />
            <Tab  className={classes.label}  label="Approved" />
            <Tab  className={classes.label}  label="Canceled" />
            <Tab className={classes.label}  label="Posted" />
            <Tab  className={classes.label} label="In Progress" />
            <Tab className={classes.label}  label="Final Review" />
            <Tab className={classes.label}  label="Finished" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>{this.state.projects.map(((Project,i)=><MyProjectCard key={i} project={Project} edit={this.props.edit} />))}</TabContainer>}
        {value === 1 && <TabContainer>{(this.state.projects.filter(m => m.lifeCycle === "Waiting for consultancy Agency")).map(((Project,i)=><MyProjectCard key={i} project={Project}  edit={this.props.edit}/>))}</TabContainer>}
        {value === 2 && <TabContainer>{(this.state.projects.filter(m => m.lifeCycle === "Negotiation")).map(((Project,i)=><MyProjectCard key={i} project={Project} edit={this.props.edit}/>))}</TabContainer>}
        {value === 3 && <TabContainer>{(this.state.projects.filter(m => m.lifeCycle === "Final Draft")).map(((Project,i)=><MyProjectCard key={i} project={Project} edit={this.props.edit}/>))}</TabContainer>}
        {value === 4 && <TabContainer>{(this.state.projects.filter(m => m.lifeCycle === "Approved")).map(((Project,i)=><MyProjectCard key={i} project={Project} edit={this.props.edit}/>))}</TabContainer>}
        {value === 5 && <TabContainer>{(this.state.projects.filter(m => m.lifeCycle === "Canceled")).map(((Project,i)=><MyProjectCard key={i} project={Project} edit={this.props.edit}/>))}</TabContainer>}
        {value === 6 && <TabContainer>{(this.state.projects.filter(m => m.lifeCycle === "Posted")).map(((Project,i)=><MyProjectCard key={i} project={Project} edit={this.props.edit}/>))}</TabContainer>}
        {value === 7 && <TabContainer>{(this.state.projects.filter(m => m.lifeCycle === "In Progress")).map(((Project,i)=><MyProjectCard key={i} project={Project} edit={this.props.edit}/>))}</TabContainer>}
        {value === 8 && <TabContainer>{(this.state.projects.filter(m => m.lifeCycle === "Final Review")).map(((Project,i)=><MyProjectCard key={i} project={Project} edit={this.props.edit}/>))}</TabContainer>}
        {value === 9 && <TabContainer>{(this.state.projects.filter(m => m.lifeCycle === "Finished")).map(((Project,i)=><MyProjectCard key={i} project={Project} edit={this.props.edit}/>))}</TabContainer>}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
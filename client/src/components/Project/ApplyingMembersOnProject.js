import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import ApplyingMemberCard from "./ApplyingMemberCard";
import axios from "axios";
// import tileData from './tileData';
const server = require("../../config");

const styles = theme => ({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  margin: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});
class ApplyingMembersOnProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cid: null,
      wantConsultancy: this.props.project.wantConsultancy,
      applyingMembers: null
    };
  }

  async componentDidMount(){
    await axios(`https://lirtenben.herokuapp.com/api/admins/${this.props.admin._id}/myProjects/${this.props.project._id}/applyingMembers`,{
      headers: { "Content-Type": "application/json",
      "Authorization": "bearer " + localStorage.getItem('token')
     }
    })
    .then(res=>{
      if(res.status===200)
        return res.data
      else
       return null;
    })
    .then(mem=>{  
      if(mem!=null){
        this.setState({
          applyingMembers:mem.data
        })
      }
    });
  }
  
  render() {
    
    const { classes } = this.props;

    if( this.state.applyingMembers !== null){
    return (
      <div className={classes.root}>
        
          
          {this.state.applyingMembers.map(i => (
              <ApplyingMemberCard project={this.props.project} admin={this.props.admin} mem={i._id} />
          ))}
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
      <ListSubheader component="div">
      No applying Members On this Project
    </ListSubheader>
        </div>
    );
  }
  }
}

ApplyingMembersOnProject.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ApplyingMembersOnProject);
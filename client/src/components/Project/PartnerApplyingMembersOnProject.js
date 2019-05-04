import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import PartnerApplyingMemberCard from "./PartnerApplyingMemberCard";
import axios from "axios";
import SendTaskOrientation from './SendTaskOrientation'
const server = require("../../config");

// import tileData from './tileData';

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
class PartnerApplyingMembersOnProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cid: null,
      wantConsultancy: this.props.project.wantConsultancy,
      applyingMembers: null
    };
  }

  async componentDidMount(){
    await axios(`/api/partners/${this.props.partner._id}/myProjects/${this.props.project._id}/applyingMembers`)
    .then(res=>{
      if(res.status===200)
        return res.data
      else
       return null;
    })
    .then(mem=>{  
      if(mem!==null){
        this.setState({
          applyingMembers:mem.data
        })
      }
    });
  }
  
  render() {
    
    const { classes } = this.props;

    if( this.state.applyingMembers ){
    return (
      <div className={classes.root}>
          {this.state.applyingMembers.map(i => (
              <PartnerApplyingMemberCard project={this.props.project} partner={this.props.partner} mem={i._id} />
          ))}
        <SendTaskOrientation Id={this.props.partner._id} projectId={this.props.project._id}/>

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

PartnerApplyingMembersOnProject.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PartnerApplyingMembersOnProject);
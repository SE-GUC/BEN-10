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
    await axios(`${server}/api/partners/${this.props.partner._id}/myProjects/${this.props.project._id}/applyingMembers`,{
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
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={1} style={{ height: "auto" }}>
            <ListSubheader component="div">Applying Members On this Project
            </ListSubheader>
          </GridListTile>
          
          {this.state.applyingMembers.map(i => (
            <GridListTile key={i}>
              <PartnerApplyingMemberCard project={this.props.project} partner={this.props.partner} mem={i._id} />
            </GridListTile>
          ))}
        </GridList>
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
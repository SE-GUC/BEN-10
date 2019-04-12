import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import ApplyingMemberCard from "../components/ApplyingMemberCard";
import axios from "axios";
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
    await axios(`http://localhost:5000/api/admins/${this.props.admin._id}/myProjects/${this.props.project._id}/applyingMembers`)
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
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">
              Applying Members On this Project
            </ListSubheader>
          </GridListTile>
          
          {this.state.applyingMembers.map(i => (
            <GridListTile key={i}>
              <ApplyingMemberCard project={this.props.project} admin={this.props.admin} mem={i._id} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
          <label>no Applying Members on this project</label>
        </div>
    );
  }
  }
}

ApplyingMembersOnProject.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ApplyingMembersOnProject);
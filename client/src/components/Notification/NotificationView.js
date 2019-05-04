import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import axios from "axios"
import fetch from "node-fetch"
import { hostname } from 'os';

const styles = theme => ({
  root: {
    width: '100%',
  },
  menu: {
      width:300,
  },
  
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    fontcolor:'#000000'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  seenAv:{
    backgroundColor:"#616161"

  },
  unseenAv:{
    backgroundColor:"#e91e63"

  }



});

class ControlledExpansionPanels extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        expanded: null,
        notifications:this.props.notifications,
        types:[],
        from:[]

      };
  }
  async componentDidMount(){
    await this.fetchAllData();
    console.log(this.state.types)
  }
  async fetchAllData(){
      var i =0;
      for(i;i<this.state.notifications.length;i++){
          var flag = true;
          await axios
      .get(
        `/api/admins/${this.state.notifications[i].sentById}`
      )
      .then(res => {
        console.log(res.data.data)
        return res.data;
      })
      .then(json =>{
          console.log(Object.keys(json)[0])
          if(Object.keys(json)[0]!=="error"){
        var j = this.state.types;
        j.push("A")
        var b = this.state.from;
        b.push(json.data.firstName + " " +json.data.lastName)
        this.setState({
          types :j,
          from: b
        })
        flag = false;
    }
    }
      );
      if(flag){
        await axios
        .get(
          `/api/partners/${this.state.notifications[i].notifiedPerson}`
        )
        .then(res => {
            
          return res.data;
        })
        .then(json =>
          {if(Object.keys(json)[0]!=="error"){
              var j = this.state.types;
              j.push("P")
              var b = this.state.from;
              b.push(json.data.firstName + " " +json.data.lastName)
              this.setState({
                types :j,
                from: b
              })
              flag = false;
          }}
        );
      }
      if(flag){
        await axios
        .get(
          `/api/consultancyagency/${this.state.notifications[i].notifiedPerson}`
        )
        .then(res => {
            console.log(res.data)
          return res.data;
        })
        .then(json =>
          {if(Object.keys(json)[0]!=="error"){
              var j = this.state.types;
              j.push("CA")
              var b = this.state.from;
              b.push(json.data.firstName+ " " +json.data.lastName)
              this.setState({
                types :j,
                from: b
              })
              flag = false;
          }}
        );
      }
      
    }
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
console.log(panel)
    const n = parseInt(panel.substring(5))
    console.log(n)
    const body = {
        seen:true
    }
    fetch(`/api/notifications/${this.state.notifications[n]._id}`, {
        method: "put",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
      }).then(res => {
      
      if (res.status === 200) {
      }
      return res.json();
      })
      .then(json => {
       console.log(json)
      })
      .catch(err => console.log("Error", err));
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    var i =0;

    return (
      <div className={classes.menu}>
        {this.state.notifications.map(n =>(
            <ExpansionPanel expanded={expanded === 'panel'+(i)} onChange={this.handleChange('panel'+(i))} background = { n.seen? '#FAF061':'#C85252'}>
            <ExpansionPanelSummary>
              <Typography className={classes.heading}>
              {n.seen?<Avatar children={this.state.types[i]} className={classes.seenAv}/>:<Avatar children={this.state.types[i]} className={classes.unseenAv}/>}
              
              </Typography>
              <Typography className={classes.secondaryHeading}>{this.state.from[i++]}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails >
              <Typography>
                {n.description}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);
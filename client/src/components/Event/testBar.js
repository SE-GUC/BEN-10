import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import MyEventCard from './MyEventCard'
const server = require("../../config");

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
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
      width:1680,
      backgroundColor:"#006064"
  },
  label:{
    color:"#ffc107"
  }
});

class SimpleTabs extends React.Component {
    constructor(props){
        super(props);
        this.state={
            value: 0,
            events:this.props.events

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
        {/* <AppBar className={classes.Tab} position="static"> */}
          {/* <Tabs value={value}  onChange={this.handleChange}>
            <Tab className={classes.label} label="All" /> */}
            {/* <Tab label="Waiting For Consultancy Agency" />
            <Tab label="Negotiation" />
            <Tab label="Final Draft" />
            <Tab  label="Approved" />
            <Tab  label="Canceled" />
            <Tab label="Posted" />
            <Tab  label="In Progress" />
            <Tab label="Final Review" />
            <Tab label="Finished" /> */}
          {/* </Tabs> */}
        {/* </AppBar> */}
        {value === 0 && <TabContainer>{this.state.events.map(((Event,i)=><MyEventCard key={i} event={Event} />))}</TabContainer>}
        {/* {value === 1 && <TabContainer>{(this.state.events.filter(m => m.life_cycle === "Waiting For Consultancy Agency")).map(((Event,i)=><MyEventCard key={i} event={Event} />))}</TabContainer>}
        {value === 2 && <TabContainer>{(this.state.events.filter(m => m.life_cycle === "Negotiation")).map(((Event,i)=><MyEventCard key={i} event={Event} />))}</TabContainer>}
        {value === 3 && <TabContainer>{(this.state.events.filter(m => m.life_cycle === "Final Draft")).map(((Event,i)=><MyEventCard key={i} event={Event} />))}</TabContainer>}
        {value === 4 && <TabContainer>{(this.state.events.filter(m => m.life_cycle === "Approved")).map(((Event,i)=><MyEventCard key={i} event={Event} />))}</TabContainer>}
        {value === 5 && <TabContainer>{(this.state.events.filter(m => m.life_cycle === "Canceled")).map(((Event,i)=><MyEventCard key={i} event={Event} />))}</TabContainer>}
        {value === 6 && <TabContainer>{(this.state.events.filter(m => m.life_cycle === "Posted")).map(((Event,i)=><MyEventCard key={i} event={Event} />))}</TabContainer>}
        {value === 7 && <TabContainer>{(this.state.events.filter(m => m.life_cycle === "In Progress")).map(((Event,i)=><MyEventCard key={i} event={Event} />))}</TabContainer>}
        {value === 8 && <TabContainer>{(this.state.events.filter(m => m.life_cycle === "Final Review")).map(((Event,i)=><MyEventCard key={i} event={Event} />))}</TabContainer>}
        {value === 9 && <TabContainer>{(this.state.events.filter(m => m.life_cycle === "Finished")).map(((Event,i)=><MyEventCard key={i} event={Event} />))}</TabContainer>} */}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
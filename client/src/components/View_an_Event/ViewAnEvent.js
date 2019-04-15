import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors/blue";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { Redirect } from "react-router-dom";
import { unstable_Box as Box } from "@material-ui/core/Box";
import CircularProgress from '@material-ui/core/CircularProgress';
import Feedback from'./Feed_Back';
import BookEvent from './BookEvent';
import { typography } from '@material-ui/system';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';




const theme = createMuiTheme({
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
  },
  typography: { useNextVariants: true },
});



const styles = {
  button:{
    marginLeft:60,
  },
  button1:{
    marginRight:20,
  },
  card: {
    minWidth: 400,
    width: 100,
    backgroundColor:"#eeeeee",
    marginLeft:450,
    
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize:40,
  },
  sub:{
    fontSize:25,
    // fontFamily:"Monospace",
    fontWeight:500,
  },
  text:{
    fontSize:20,
    //fontFamily:"Monospace",
    fontWeight:300,
  },
  pos: {
    marginBottom: 12
  },
  gridList: {
    width: 300,
    height: 150
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
  }
};

class SimpleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: this.props.match.params.id,
      types:this.props.type,
      ownerId:null,
      event: [],
      isLoaded: false,
      bookedmemID: [],
      members: [],
      ID: [],
      CA: null,
      partner: null,
      admin: null,
      type: [],
      show: false,
      display: "none",
      mem: "none",
      noMems: "none",
      isLoaded: false
    };
  }
  async componentDidMount() {
    console.log(this.state.type)
    await fetch(`http://localhost:5000/api/events/${this.state.eventId}`)
      .then(res => res.json())
      .then(proj =>
        this.setState({
          event: proj.data,
          bookedmemID: proj.data.bookedMembers,
          ID: proj.data.requestorId,
          isLoaded:true,
          ownerId:proj.data.requestorId
        })
      );

    if (this.state.bookedmemID.length !== 0) {
      for (var i = 0; i < this.state.bookedmemID.length; i++) {
        await fetch(
          "http://localhost:5000/api/members/" + this.state.bookedmemID[i]
        )
          .then(res => res.json())
          .then(proj =>
            this.setState({ members: [...this.state.members, proj.data] })
          );
      }
    }

  }

  returnClicked  = ()=>{
    let path = `/Events`;
    this.props.history.push({
      pathname : path
    });
  }

  handleClicksz(x) {
    return <Redirect to="/HI" />;
  }
  show() {
    if (this.state.display === "none") {
      this.setState({ display: "block" });
    } else {
      this.setState({ display: "none" });
    }
  }
  show2() {
    if (this.state.members.length === 0) {
      this.setState({ noMems: "block" });
      
    } else {
      if (this.state.members.length!== 0) {
        this.setState({ noMems: "none" });}
       
         if (this.state.mem === "none") {
          this.setState({ mem: "block" });
        } else {
          this.setState({ mem: "none" });
        }
      
    }
  }

  render() {
    const { classes } = this.props;
    var name = null;
    if (this.state.admin) {
      name = this.state.admin.firstName;
    }
    if (this.state.partner) {
      name = this.state.partner.firstName;
    }
    if (this.state.CA) {
      name = this.state.CA.name;
    }
    const event = this.state.event;
    if (this.state.isLoaded) {
    return (
      <Card align="center"  className={classes.card}>
        <CardContent>
          <Typography  color="secondary" variant="h6" className={classes.title} gutterBottom>
            Event Info
          </Typography>
          <br />
          <Typography className={classes.sub}> Requested By :</Typography>
           <Typography   className={classes.text} color="primary"> {name}
            <br />
            <br />
           <Typography  className={classes.sub}> Description : </Typography> 
            <Typography  className={classes.text} color="primary">{event.description ? event.description : "None"}</Typography> 
            <br />
            <Box display={this.state.display} color="text.primary" clone>
              <div>
            <Typography   className={classes.sub}> Event Location :{" "}</Typography> 
            <Typography  className={classes.text} color="primary"> {event.eventLocation ? event.eventLocation : "None"}</Typography> 
                <br />
                <Typography   className={classes.sub}>  Registeration Price :{" "}</Typography>
                <Typography   className={classes.text} color="primary" >  {event.registPrice ? event.registPrice : "None"}</Typography>
                <br />
                <Typography   className={classes.sub}> Remaining Places :{" "}</Typography>
                <Typography  className={classes.text} color="primary"  >  {event.remainingPlace ? event.remainingPlace : "None"}</Typography>
                <br />
                <Typography  className={classes.sub} >  Event Type:{" "}</Typography>
                <Typography  className={classes.text} color="primary" > {event.eventType? event.eventType:"None"}</Typography>
                <br/>
                <Typography  className={classes.sub} > Event Topics :</Typography>
                <Typography  className={classes.text} color="primary" > {event.topics ? event.topics.toString() : "None"}</Typography>
                <br />
                <Typography  className={classes.sub} >  Speaker: </Typography>
                <Typography  className={classes.text} color="primary"  > {event.speaker ? event.speaker : "None"}</Typography>
                <br />
                <Typography  className={classes.sub} >  Feedback :</Typography>
                <Typography  className={classes.text} color="primary"  >  {event.feedback ? event.feedback.toString() : "None"}</Typography>
                <br />
                <Typography   className={classes.sub}> Registeration Start Date :{" "}</Typography>
                <Typography className={classes.text} color="primary"  > {event.regist_start_date
                  ? new Date(event.regist_start_date).getDate() +
                    "/" +
                    (new Date(event.regist_start_date).getMonth() + 1) +
                    "/" +
                    new Date(event.regist_start_date).getFullYear()
                  : "None"}</Typography>
                <br />
                <Typography className={classes.sub}  > Registeration End Date:{" "}</Typography>
                <Typography  className={classes.text} color="primary"  > {event.regist_expiry_date
                  ? new Date(event.regist_expiry_date).getDate() +
                    "/" +
                    (new Date(event.regist_expiry_date).getMonth() + 1) +
                    "/" +
                    new Date(event.regist_start_date).getFullYear()
                  : "None"}</Typography>
                <br />
                <Typography  className={classes.sub} >  Event Date :{" "}</Typography>
                <Typography  className={classes.text} color="primary" > {event.eventDate
                  ? new Date(event.eventDate).getDate() +
                    "/" +
                    (new Date(event.eventDate).getMonth() + 1) +
                    "/" +
                    new Date(event.regist_start_date).getFullYear()
                  : "None"}</Typography>
                <br />
                <Typography   className={classes.sub}>  Form Link: </Typography>
                <Typography className={classes.text} color="primary" >{event.formLink ? event.formLink : "None"}</Typography>
                <br />
                <br />
                <Box
                  display={this.state.noMems}
                  onClick={() => {
                    this.show2();
                  }}
                >
                  No members yet
                </Box>
                <Box
                  if={this.state.members.length !== 0}
                  display={this.state.mem}
                >
                  <div className={classes.root}>
                    <GridList
                      cellHeight={50}
                      className={classes.gridList}
                      cols={2}
                    >
                      bookedMembers :
                      {this.state.members.map(mem => (
                        <GridListTile
                          key={mem._id}
                          className={classes.griditem}
                        >
                          <Button
                            onClick={() => {
                              this.handleClicksz(mem._id);
                            }}
                          >
                            {" "}
                            {mem.fname} {mem.mname}{" "}
                          </Button>
                        </GridListTile>
                      ))}
                    </GridList>
                  </div>
                </Box>
                <Button
                  onClick={() => {
                    this.show2();
                  }}
                  className={classes.root}
                  size="small"
                >
                  {this.state.mem === "none" ? "Show " : "Hide "}Coming members
                </Button>
              </div>
            </Box>
          </Typography>
        </CardContent>
        <CardActions>
        <MuiThemeProvider theme={theme}> <Button
            onClick={() => {
              this.show();
            }}
            className={classes.root}
            size="small"
          >
            Show {this.state.display === "none" ? "more" : "less"}
          </Button></MuiThemeProvider>
  
          {console.log(this.state.eventId)}
          {console.log(this.state.ownerId)}
          {console.log(this.state.types)}
          {console.log(this.state.ID)}
          {console.log(this.state.show)}
          {this.props.user._id.toString()===this.state.ownerId.toString()? <Feedback eventId={this.state.eventId} ownerId={this.state.ownerId} type={this.state.types} reqId={this.state.ID}></Feedback>:""}
          <BookEvent eventId={this.state.eventId }type={this.props.type}  member={this.props.user._id} theme={theme} > </BookEvent>
          <MuiThemeProvider theme={theme}> <Button className={classes.button} onClick={this.returnClicked} >
                Back
              </Button></MuiThemeProvider>
              
      
    
  );
        </CardActions>
      </Card>
    );}
    else{
      return (<CircularProgress color='primary' thickness='5'/>);
  }
}
}
SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);

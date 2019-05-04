import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import BookEvent from "./BookEvent"
import FeedBack from "./Feed_Back"
const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width:500
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
    title:{
        color:"#283593",
        marginLeft:10
    },
    topic:{
        color:"#212121",
        fontFamily:"Arial",
        fontWeight:"bold",
        fontSize:13
        

    }
  });
class event extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Event:JSON.parse(localStorage.getItem('event')),
            eventId:JSON.parse(localStorage.getItem('event'))._id,
            ownerId:JSON.parse(localStorage.getItem('event')).requestorId

        }
    }
    render(){
        const { classes } = this.props;
        console.log(this.state.Event)
        return(
        <div>
            <TextField
          id="outlined-read-only-input"
          label="Event Type"
          defaultValue={this.state.Event.eventType}
          className={classes.textField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <br/>

         <TextField
          id="outlined-read-only-input"
          label="Event Location"
          defaultValue={this.state.Event.eventLocation}
          className={classes.textField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
         <br/>
        
        <TextField
          id="outlined-read-only-input"
          label="Description"
          multiline
          rowsMax="5"
          defaultValue={this.state.Event.description}
          className={classes.textField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
         <br/>

        <TextField
          id="outlined-read-only-input"
          label="Registration Price"
          defaultValue={this.state.Event.registPrice+" $"}
          className={classes.textField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
         <br/>

        <TextField
          id="outlined-read-only-input"
          label="Remaining Places"
          defaultValue={this.state.Event.remainingPlace}
          className={classes.textField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
         <br/>

        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
              Topics:
            </Typography>
            <div className={classes.demo}>
              <List >
              {this.state.Event.topics.map(e=> <ListItem>       
                    <ListItemText
                      primary={<Typography className={classes.topic}>{e}</Typography>}
                    />
                  </ListItem>)}
                 
                
              </List>
            </div>
          </Grid>
          </Grid>
          <br/>

          <TextField
          id="outlined-read-only-input"
          label="Speaker"
          defaultValue={this.state.Event.speaker}
          className={classes.textField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
         <br/>

        <TextField
          id="outlined-read-only-input"
          label="Registration Start Date"
          defaultValue={new Date(this.state.Event.registStartDate).getFullYear()+"-"+((new Date(this.state.Event.registStartDate).getMonth()+1)<10?"0"+(new Date(this.state.Event.registStartDate).getMonth()+1):(new Date(this.state.Event.registStartDate).getMonth()+1))+"-"+new Date(this.state.Event.registStartDate).getDate()}
          className={classes.textField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
         <br/>

     <TextField
          id="outlined-read-only-input"
          label="Registration Expiry Date"
          defaultValue={new Date(this.state.Event.registExpiryDate).getFullYear()+"-"+((new Date(this.state.Event.registExpiryDate).getMonth()+1)<10?"0"+(new Date(this.state.Event.registExpiryDate).getMonth()+1):(new Date(this.state.Event.registExpiryDate).getMonth()+1))+"-"+new Date(this.state.Event.registExpiryDate).getDate()}
          className={classes.textField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
         <br/>

     <TextField
          id="outlined-read-only-input"
          label="Event Date"
          defaultValue={new Date(this.state.Event.eventDate).getFullYear()+"-"+((new Date(this.state.Event.eventDate).getMonth()+1)<10?"0"+(new Date(this.state.Event.eventDate).getMonth()+1):(new Date(this.state.Event.eventDate).getMonth()+1))+"-"+new Date(this.state.Event.eventDate).getDate()}
          className={classes.textField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
         <br/>

    <TextField
          id="outlined-read-only-input"
          label="Form Link"
          defaultValue={this.state.Event.formLink}
          className={classes.textField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
         {(JSON.parse(localStorage.getItem("user")))._id.toString()===this.state.ownerId.toString()? <FeedBack eventId={this.state.eventId} ownerId={this.state.ownerId} type={localStorage.getItem("type")} reqId={(JSON.parse(localStorage.getItem("user")))._id}></FeedBack>:""}

          <BookEvent eventId={this.state.eventId }type={localStorage.getItem("type")}  member={JSON.parse(localStorage.getItem("user"))}  > </BookEvent>




        



        </div>
        );
    }
}


event.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(event);
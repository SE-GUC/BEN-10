import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import PositionedSnackbar from "./PositionedSnackbar"


const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 50
  }
});

const locations = [
  {
    value: "Lirten Office",
    label: "Lirten Office"
  },
  {
    value: "GUC",
    label: "GUC"
  },
  {
    value: "AUC",
    label: "AUC"
  },
  {
    value: "New Cairo",
    label: "New Cairo"
  }
];

class EventRequest extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      description:"",
      location: "Lirten Office",
      date:"2019-01-01",
      type:"",
      response:null
    };
  }
  
  view(classes){
    return (
    <div>
        <div>
          <label>
            Request an event
          </label>
          </div>
        <div>
          <TextField
            id="description"
            label="Description"
            className={classes.textField}
            onChange={this.handleChange("description")}
            margin="normal"
            variant="outlined"
            multiline
            rows="4"
          />
          {/* <br /> */}
        </div>
        <div>
          <TextField
            id="eventType"
            label="Event Type"
            className={classes.textField}
            onChange={this.handleChange("type")}
            margin="normal"
            variant="outlined"
          />
          <br />
        </div>
        <div>
          <TextField
            id="eventLocation"
            select
            label="Select Location"
            className={classes.textField}
            value={this.state.location}
            onChange={this.handleChange("location")}
            // SelectProps={{
            //   MenuProps: {
            //     className: classes.menu
            //   }
            // }}
            margin="normal"
            variant="outlined"
          >
            {locations.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <br />
        </div>

        <div>
          <TextField
            id="eventDate"
            label="Event Date"
            type="date"
            className={classes.textField}
            onChange={this.handleChange("date")}
            margin="normal"
            variant="outlined"
            defaultValue={this.state.date}
            InputLabelProps={{
              shrink: true
            }}
          />
          <br />
        </div>
        <div>
          <Button onClick={this.submitRequest} variant="contained" className={classes.button}>
            Submit Request
          </Button>
        </div>
        <div>
          <PositionedSnackbar className={classes.button} description={this.state.description} date={this.state.date}
          type={this.state.type} location={this.state.location} requestorId={this.props.requestorId} requestedBy={this.props.requestedBy}/>
        </div>
      </div>
    )
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  

  render() {
    const { classes } = this.props;
    if(!this.state.response){
    return (
      this.view(classes)
    );
    }else{
      return(
        this.view(classes)
      )
    }
  }

  submitRequest = () => {
    const body ={
        requestedBy: this.props.requestedBy,
        description: this.state.description,
        eventType: this.state.type,
        eventLocation: this.state.location,
        eventDate: this.state.date,
        isAccepted: "false",
        requestorId: this.props.requestorId
    }

    axios.post(`http://localhost:5000/api/partners/${this.props.requestorId}/eventrequests/`, body)
    .then(function (response) {
      return response.data;
    })
    .then(res => {
      console.log(res)
      this.setState({response:res})
    })
    .catch(function (error) {
      console.log(error);
    });

  };
  
}


EventRequest.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventRequest);

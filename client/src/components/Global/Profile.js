import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import classes from "classnames";
const server = require("../../config");

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      user:JSON.parse(localStorage.getItem('user')),
      type:localStorage.getItem('type')
    }
    this.viewEvents = this.viewEvents.bind(this);
    this.viewProjects = this.viewProjects.bind(this);

  }
  viewProjects = () => {
    let path = `/Projects`;
    this.props.history.push({
      pathname: path
    });
  };

  viewEvents = () => {
    let path = `/Events`;
    this.props.history.push({
      pathname: path
    });
  };

  render() {
    //   const { classes } = this.props;

    if (
      this.state.type === "partner" ||
      this.state.type === "member" ||
      this.state.type === "admin"
    ) {
      let month = "";
      if (new Date(this.state.user.birthDate).getMonth() + 1 === 12) month = "01";
      else if (new Date(this.state.user.birthDate).getMonth() + 1 < 10)
        month = "0" + (new Date(this.state.user.birthDate).getMonth() + 1);
      else month = new Date(this.state.user.birthDate).getMonth() + 1;
      return (
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia className={classes.media} title="Profile" />
            <CardContent>
              First Name: {this.state.user.firstName} <br />
              Last Name: {this.state.user.lastName} <br />
              SSN: {this.state.user.SSN} <br />
              Birth-date:{" "}
              {new Date(this.state.user.birthDate).getFullYear() +
                "-" +
                month +
                "-" +
                new Date(this.state.user.birthDate).getDate()}{" "}
              <br />
              Gender: {this.state.user.gender ? "Female" : "Male"} <br />
              Nationality: {this.state.user.nationality} <br />
              Marital Status: {this.state.user.maritalStatus} <br />
              Driving License: {this.state.user.drivingLicense
                ? "YES"
                : "NO"}{" "}
              <br />
              Country: {this.state.user.country} <br />
              City: {this.state.user.city} <br />
              Area: {this.state.user.area} <br />
              E-mail: {this.state.user.email} <br />
              Mobile Number: {this.state.user.mobileNumber} <br />
              Alternative Mobile Number:{" "}
              {this.state.user.alternativeMobileNumber} <br />
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={this.viewEvents}>
              View Events
            </Button>
            <Button size="small" color="primary" onClick={this.viewProjects}>
              View Projects
            </Button>
          </CardActions>
        </Card>
      );
    } else if (this.state.type === "consultancyagency") {
      return (
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia className={classes.media} title="Profile" />
            <CardContent>
              Name: {this.state.user.name} <br />
              Telephone Number: {this.state.user.telephoneNumber} <br />
              E-mail: {this.state.user.email} <br />
              Location: {this.state.user.location} <br />
              Years Of Experience: {this.state.user.yearsOfExperience} <br />
              Rating: {this.state.user.rating} <br />
              Reports: {this.state.user.reports} <br />
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={this.viewEvents}>
              View Events
            </Button>
            <Button size="small" color="primary" onClick={this.viewProjects}>
              View Projects
            </Button>
          </CardActions>
        </Card>
      );
    } else {
      return <div />;
    }
  }
}
Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(Profile);

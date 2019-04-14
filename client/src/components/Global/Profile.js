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
      this.props.type === "partner" ||
      this.props.type === "member" ||
      this.props.type === "admin"
    ) {
      let month = "";
      if (new Date(this.props.user.birthDate).getMonth() + 1 === 12) month = "01";
      else if (new Date(this.props.user.birthDate).getMonth() + 1 < 10)
        month = "0" + (new Date(this.props.user.birthDate).getMonth() + 1);
      else month = new Date(this.props.user.birthDate).getMonth() + 1;
      return (
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia className={classes.media} title="Profile" />
            <CardContent>
              First Name: {this.props.user.firstName} <br />
              Last Name: {this.props.user.lastName} <br />
              SSN: {this.props.user.SSN} <br />
              Birth-date:{" "}
              {new Date(this.props.user.birthDate).getFullYear() +
                "-" +
                month +
                "-" +
                new Date(this.props.user.birthDate).getDate()}{" "}
              <br />
              Gender: {this.props.user.gender ? "Female" : "Male"} <br />
              Nationality: {this.props.user.nationality} <br />
              Marital Status: {this.props.user.maritalStatus} <br />
              Driving License: {this.props.user.drivingLicense
                ? "YES"
                : "NO"}{" "}
              <br />
              Country: {this.props.user.country} <br />
              City: {this.props.user.city} <br />
              Area: {this.props.user.area} <br />
              E-mail: {this.props.user.email} <br />
              Mobile Number: {this.props.user.mobileNumber} <br />
              Alternative Mobile Number:{" "}
              {this.props.user.alternativeMobileNumber} <br />
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
    } else if (this.props.type === "consultancyagency") {
      return (
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia className={classes.media} title="Profile" />
            <CardContent>
              Name: {this.props.user.name} <br />
              Telephone Number: {this.props.user.telephoneNumber} <br />
              E-mail: {this.props.user.email} <br />
              Location: {this.props.user.location} <br />
              Years Of Experience: {this.props.user.yearsOfExperience} <br />
              Rating: {this.props.user.rating} <br />
              Reports: {this.props.user.reports} <br />
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
